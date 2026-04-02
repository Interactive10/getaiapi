import { createHmac } from 'crypto'
import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from './base.js'
import { AuthError, RateLimitError, ProviderError } from '../errors.js'

const API_BASE = 'https://api-singapore.klingai.com'

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

export const klingAdapter: ProviderAdapter = {
  name: 'kling',

  async submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${API_BASE}/${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(auth),
      body: JSON.stringify(cleanParams(params)),
    })

    await handleHttpErrors(response, endpoint)

    const json = await response.json() as KlingSubmitResponse
    handleBodyErrors(json, endpoint)

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
    const response = await fetch(url, {
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
    const taskResult = data.task_result as Record<string, unknown> | undefined
    if (!taskResult) return []

    const path = outputMapping.extract_path

    if (path === 'task_result.videos[].url') {
      const videos = taskResult.videos as Array<{ url: string }> | undefined
      if (!Array.isArray(videos)) return []
      return videos
        .filter(v => v.url)
        .map(v => ({
          type: outputMapping.type,
          url: v.url,
          content_type: outputMapping.content_type ?? 'video/mp4',
        }))
    }

    if (path === 'task_result.images[].url') {
      const images = taskResult.images as Array<{ url: string }> | undefined
      if (!Array.isArray(images)) return []
      return images
        .filter(img => img.url)
        .map(img => ({
          type: outputMapping.type,
          url: img.url,
          content_type: outputMapping.content_type ?? 'image/png',
        }))
    }

    if (path === 'task_result.audios[].url') {
      const audios = taskResult.audios as Array<{ url: string }> | undefined
      if (!Array.isArray(audios)) return []
      return audios
        .filter(a => a.url)
        .map(a => ({
          type: outputMapping.type,
          url: a.url,
          content_type: outputMapping.content_type ?? 'audio/mpeg',
        }))
    }

    return []
  },
}
