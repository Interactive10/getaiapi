import { createHmac } from 'crypto'
import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from './base.js'
import { AuthError, RateLimitError, ProviderError } from '../errors.js'
import { fetchWithTimeout } from '../fetch.js'

const API_BASE = 'https://api-singapore.klingai.com'

const SYNC_ENDPOINTS = new Set([
  'v1/audio/tts',
  'v1/videos/image-recognize',
])

function generateJwt(accessKey: string, secretKey: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(JSON.stringify({
    iss: accessKey,
    exp: now + 1800,
    nbf: now - 5,
  })).toString('base64url')
  const signature = createHmac('sha256', secretKey)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${signature}`
}

function getAuthHeaders(auth: string): Record<string, string> {
  const [ak, sk] = auth.split(':', 2)
  return {
    Authorization: `Bearer ${generateJwt(ak, sk)}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Strips data URI prefix from base64 strings.
 * Kling requires raw base64 without the `data:image/...;base64,` prefix.
 */
function cleanBase64(value: string): string {
  if (value.startsWith('data:')) {
    return value.split(',')[1] ?? value
  }
  return value
}

/**
 * Recursively cleans base64 values in params that look like data URIs.
 */
function cleanParams(params: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.startsWith('data:')) {
      result[key] = cleanBase64(value)
    } else {
      result[key] = value
    }
  }
  return result
}

async function handleHttpErrors(response: Response, endpoint: string): Promise<void> {
  if (response.ok) return

  const status = response.status

  if (status === 401) {
    throw new AuthError('kling', 'KLING_ACCESS_KEY')
  }

  if (status === 429) {
    const retryAfter = response.headers.get('retry-after')
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000
    throw new RateLimitError('kling', retryMs)
  }

  let raw: unknown
  try {
    raw = await response.json()
  } catch {
    raw = await response.text().catch(() => null)
  }

  throw new ProviderError('kling', endpoint, status, raw)
}

function handleBodyErrors(json: { code: number; message: string }, endpoint: string): void {
  if (json.code === 0) return

  if (json.code >= 1000 && json.code <= 1004) {
    throw new AuthError('kling', 'KLING_ACCESS_KEY')
  }
  if ((json.code >= 1100 && json.code <= 1102) || (json.code >= 1302 && json.code <= 1304)) {
    throw new RateLimitError('kling', 5000)
  }

  throw new ProviderError('kling', endpoint, json.code, json)
}

interface KlingSubmitResponse {
  code: number
  message: string
  request_id: string
  data: {
    task_id: string
    task_status: string
    task_result?: Record<string, unknown>
    task_info?: Record<string, unknown>
    created_at: number
    updated_at: number
  }
}

interface KlingPollResponse {
  code: number
  message: string
  request_id: string
  data: {
    task_id: string
    task_status: 'submitted' | 'processing' | 'succeed' | 'failed'
    task_status_msg?: string
    task_result?: {
      videos?: Array<{ id: string; url: string; duration: string }>
      images?: Array<{ index: number; url: string }>
      audios?: Array<{ id: string; url: string; duration?: string }>
    }
    created_at: number
    updated_at: number
  }
}

/** Infers a default content type from the output mapping type. */
function inferContentType(type: string): string {
  if (type === 'video') return 'video/mp4'
  if (type === 'audio') return 'audio/mpeg'
  return 'image/png'
}

export const klingAdapter: ProviderAdapter = {
  name: 'kling',

  async submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${API_BASE}/${endpoint}`
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: getAuthHeaders(auth),
      body: JSON.stringify(cleanParams(params)),
    })

    await handleHttpErrors(response, endpoint)

    const json = await response.json() as KlingSubmitResponse
    handleBodyErrors(json, endpoint)

    if (SYNC_ENDPOINTS.has(endpoint)) {
      return {
        id: json.data.task_id,
        status: 'completed',
        output: json.data,
      }
    }

    return {
      id: json.data.task_id,
      status: 'pending',
    }
  },

  async poll(
    taskId: string,
    auth: string,
    endpoint?: string,
  ): Promise<ProviderResponse> {
    if (!endpoint) {
      throw new ProviderError('kling', 'unknown', 400, 'endpoint is required for polling')
    }

    const url = `${API_BASE}/${endpoint}/${taskId}`
    const response = await fetchWithTimeout(url, {
      headers: getAuthHeaders(auth),
    })

    await handleHttpErrors(response, endpoint)

    const json = await response.json() as KlingPollResponse
    handleBodyErrors(json, endpoint)

    const { data } = json

    if (data.task_status === 'failed') {
      return {
        id: taskId,
        status: 'failed',
        error: data.task_status_msg ?? 'Unknown error',
      }
    }

    if (data.task_status === 'succeed') {
      return {
        id: taskId,
        status: 'completed',
        output: data,
      }
    }

    // submitted or processing
    return {
      id: taskId,
      status: 'processing',
    }
  },

  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
    const data = raw as Record<string, unknown>
    const path = outputMapping.extract_path

    // Parse the extract_path to navigate dynamically.
    // Paths look like "task_result.videos[].url" or "images[].url_1"
    const segments = path.split('.')
    const arrayIndex = segments.findIndex(s => s.endsWith('[]'))

    if (arrayIndex === -1) return []

    // Navigate to the parent of the array segment
    let current: unknown = data
    for (let i = 0; i < arrayIndex; i++) {
      if (current == null || typeof current !== 'object') return []
      current = (current as Record<string, unknown>)[segments[i]]
    }

    // Get the array
    const arrayKey = segments[arrayIndex].slice(0, -2)
    if (current == null || typeof current !== 'object') return []
    const items = (current as Record<string, unknown>)[arrayKey]
    if (!Array.isArray(items)) return []

    // The remaining segments after the array are the field(s) to extract
    const fieldSegments = segments.slice(arrayIndex + 1)

    const results: OutputItem[] = []
    for (const item of items) {
      // Navigate nested fields within each array item
      let value: unknown = item
      for (const field of fieldSegments) {
        if (value == null || typeof value !== 'object') { value = null; break }
        value = (value as Record<string, unknown>)[field]
      }
      if (typeof value !== 'string' || !value) continue
      results.push({
        type: outputMapping.type,
        url: value,
        content_type: outputMapping.content_type ?? inferContentType(outputMapping.type),
      })
    }
    return results
  },
}
