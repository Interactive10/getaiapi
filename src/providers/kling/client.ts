import type {
  KlingConfig, KlingApiResponse, PollOptions,
  AccountCostsInput, AccountCostsResult,
  ElementListInput, ElementListResult, DeleteElementInput, ElementResult,
  KlingListParams, KlingVoiceListResult, KlingTaskListResult,
  KlingVoiceResult,
  MultiElementsInitInput, MultiElementsInitResult,
  MultiElementsAddSelectionInput, MultiElementsSelectionResult,
  MultiElementsDeleteSelectionInput, MultiElementsClearSelectionInput,
  MultiElementsPreviewInput, MultiElementsPreviewResult,
} from './types.js'
import { KlingAuthError, KlingRateLimitError, KlingApiError, KlingTimeoutError, KlingTaskFailedError } from './errors.js'
import { buildAuthHeaders } from './auth.js'
import type { Extractor } from './extract.js'
import { extractVoices, extractElement } from './extract.js'

const API_BASE = 'https://api-singapore.klingai.com'
const DEFAULT_FETCH_TIMEOUT_MS = 30_000
const DEFAULT_POLL_TIMEOUT_MS = 300_000
const DEFAULT_POLL_INTERVAL_MS = 2_000
const POLL_BACKOFF_MULTIPLIER = 1.5
const MAX_POLL_INTERVAL_MS = 10_000

const SYNC_ENDPOINTS = new Set(['v1/audio/tts', 'v1/videos/image-recognize', 'v1/videos/identify-face'])

/** Strips data URI prefix from base64 strings. Kling requires raw base64. */
function cleanBase64(value: unknown): unknown {
  if (typeof value === 'string' && value.startsWith('data:')) {
    return value.split(',')[1] ?? value
  }
  if (Array.isArray(value)) {
    return value.map(cleanBase64)
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      result[k] = cleanBase64(v)
    }
    return result
  }
  return value
}

/** Kling API client. Holds auth state and HTTP configuration. */
export class KlingClient {
  private accessKey: string | null = null
  private secretKey: string | null = null
  private fetchTimeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS

  /** Update credentials and settings. */
  configure(config: KlingConfig): void {
    this.accessKey = config.accessKey
    this.secretKey = config.secretKey
    if (config.fetchTimeoutMs !== undefined) {
      this.fetchTimeoutMs = config.fetchTimeoutMs
    }
  }

  private resolveAuth(): { accessKey: string; secretKey: string } {
    if (this.accessKey && this.secretKey) {
      return { accessKey: this.accessKey, secretKey: this.secretKey }
    }

    const ak = process.env.KLING_ACCESS_KEY?.trim()
    const sk = process.env.KLING_SECRET_KEY?.trim()
    if (ak && sk) return { accessKey: ak, secretKey: sk }

    throw new KlingAuthError()
  }

  // ── HTTP ─────────────────────────────────────────────────────────────────

  private async handleErrors(response: Response, endpoint: string): Promise<void> {
    if (response.ok) return

    let raw: unknown
    try { raw = await response.json() } catch { raw = await response.text().catch(() => null) }

    console.error(`[kling] ${response.status} on ${endpoint}:`, JSON.stringify(raw))

    if (response.status === 401) throw new KlingAuthError('Kling returned 401 Unauthorized.')
    if (response.status === 429) {
      const body = raw as Record<string, unknown> | null
      const code = body?.code as number | undefined
      const message = (body?.message as string) ?? 'Rate limited'
      const retryAfter = response.headers.get('retry-after')
      throw new KlingRateLimitError(
        retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000,
        code,
        message,
      )
    }

    throw new KlingApiError(endpoint, response.status, raw)
  }

  private handleBodyErrors(json: KlingApiResponse, endpoint: string): void {
    if (json.code === 0) return
    console.error(`[kling] body error on ${endpoint}: code=${json.code} message=${json.message}`)
    if (json.code >= 1000 && json.code <= 1004) {
      throw new KlingAuthError(`Kling auth error code ${json.code}: ${json.message}`)
    }
    if ((json.code >= 1100 && json.code <= 1102) || (json.code >= 1302 && json.code <= 1304)) {
      throw new KlingRateLimitError(5000, json.code, json.message)
    }
    throw new KlingApiError(endpoint, json.code, json)
  }

  private async httpSubmit(endpoint: string, body: Record<string, unknown>): Promise<KlingApiResponse> {
    const auth = this.resolveAuth()
    const url = `${API_BASE}/${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: buildAuthHeaders(auth.accessKey, auth.secretKey),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.fetchTimeoutMs),
    })
    await this.handleErrors(response, endpoint)
    const json = await response.json() as KlingApiResponse
    this.handleBodyErrors(json, endpoint)
    return json
  }

  private async httpGet(endpoint: string, params: Record<string, string>): Promise<KlingApiResponse> {
    const auth = this.resolveAuth()
    const qs = new URLSearchParams(params).toString()
    const url = `${API_BASE}/${endpoint}?${qs}`
    const response = await fetch(url, {
      headers: buildAuthHeaders(auth.accessKey, auth.secretKey),
      signal: AbortSignal.timeout(this.fetchTimeoutMs),
    })
    await this.handleErrors(response, endpoint)
    const json = await response.json() as KlingApiResponse
    this.handleBodyErrors(json, endpoint)
    return json
  }

  private async httpPoll(endpoint: string, taskId: string): Promise<KlingApiResponse> {
    const auth = this.resolveAuth()
    const url = `${API_BASE}/${endpoint}/${taskId}`
    const response = await fetch(url, {
      headers: buildAuthHeaders(auth.accessKey, auth.secretKey),
      signal: AbortSignal.timeout(this.fetchTimeoutMs),
    })
    await this.handleErrors(response, endpoint)
    const json = await response.json() as KlingApiResponse
    this.handleBodyErrors(json, endpoint)
    return json
  }

  // ── Account ──────────────────────────────────────────────────────────────

  async accountCosts(input: AccountCostsInput): Promise<AccountCostsResult> {
    const params: Record<string, string> = {
      start_time: String(input.start_time),
      end_time: String(input.end_time),
    }
    if (input.resource_pack_name !== undefined) {
      params.resource_pack_name = input.resource_pack_name
    }
    const json = await this.httpGet('account/costs', params)
    const data = json.data as Record<string, unknown>
    return {
      resource_pack_subscribe_infos: (data.resource_pack_subscribe_infos ?? []) as AccountCostsResult['resource_pack_subscribe_infos'],
    }
  }

  async elementList(input: ElementListInput): Promise<ElementListResult> {
    const params: Record<string, string> = {}
    if (input.pageNum !== undefined) params.pageNum = String(input.pageNum)
    if (input.pageSize !== undefined) params.pageSize = String(input.pageSize)
    const json = await this.httpGet('v1/general/advanced-custom-elements', params)
    const data = json.data as Record<string, unknown>
    // Assumption: list response uses data.elements — verify key name against live API
    return { elements: (data.elements ?? []) as ElementListResult['elements'] }
  }

  async presetElementList(): Promise<ElementListResult> {
    const json = await this.httpGet('v1/general/advanced-presets-elements', {})
    const data = json.data as Record<string, unknown>
    // Assumption: list response uses data.elements — verify key name against live API
    return { elements: (data.elements ?? []) as ElementListResult['elements'] }
  }

  async deleteElement(input: DeleteElementInput): Promise<void> {
    await this.httpSubmit('v1/general/delete-elements', { element_id: input.element_id })
  }

  // ── Task list / single-task query helpers ─────────────────────────────────

  /** GET a paginated task list from any endpoint. */
  async taskList(endpoint: string, params: KlingListParams = {}): Promise<KlingTaskListResult> {
    const p: Record<string, string> = {}
    if (params.pageNum !== undefined) p.pageNum = String(params.pageNum)
    if (params.pageSize !== undefined) p.pageSize = String(params.pageSize)
    const json = await this.httpGet(endpoint, p)
    const data = json.data as Record<string, unknown>
    return { tasks: (data.tasks ?? []) as KlingTaskListResult['tasks'] }
  }

  /** GET a single task by ID from any endpoint and run it through an extractor. */
  async taskGet<T>(endpoint: string, taskId: string, extractor: Extractor<T>): Promise<T> {
    const json = await this.httpPoll(endpoint, taskId)
    return extractor(json.data)
  }

  // ── Voice management ──────────────────────────────────────────────────────

  async listVoices(params: KlingListParams = {}): Promise<KlingVoiceListResult> {
    const p: Record<string, string> = {}
    if (params.pageNum !== undefined) p.pageNum = String(params.pageNum)
    if (params.pageSize !== undefined) p.pageSize = String(params.pageSize)
    const json = await this.httpGet('v1/general/custom-voices', p)
    const data = json.data as Record<string, unknown>
    return { voices: (data.voices ?? []) as KlingVoiceListResult['voices'] }
  }

  async listPresetVoices(params: KlingListParams = {}): Promise<KlingVoiceListResult> {
    const p: Record<string, string> = {}
    if (params.pageNum !== undefined) p.pageNum = String(params.pageNum)
    if (params.pageSize !== undefined) p.pageSize = String(params.pageSize)
    const json = await this.httpGet('v1/general/presets-voices', p)
    const data = json.data as Record<string, unknown>
    return { voices: (data.voices ?? []) as KlingVoiceListResult['voices'] }
  }

  async queryVoice(taskId: string): Promise<KlingVoiceResult> {
    const json = await this.httpPoll('v1/general/custom-voices', taskId)
    return extractVoices(json.data)
  }

  async deleteVoice(voiceId: string): Promise<void> {
    await this.httpSubmit('v1/general/delete-voices', { voice_id: voiceId })
  }

  // ── Element single-task query ─────────────────────────────────────────────

  async getElement(taskId: string): Promise<ElementResult> {
    const json = await this.httpPoll('v1/general/advanced-custom-elements', taskId)
    return extractElement(json.data)
  }

  // ── Multi-elements video workflow ─────────────────────────────────────────

  async initMultiElementsSelection(input: MultiElementsInitInput): Promise<MultiElementsInitResult> {
    const body: Record<string, unknown> = {}
    if (input.video_id !== undefined) body.video_id = input.video_id
    if (input.video_url !== undefined) body.video_url = input.video_url
    const json = await this.httpSubmit('v1/videos/multi-elements/init-selection', body)
    return json.data as unknown as MultiElementsInitResult
  }

  async addSelectionArea(input: MultiElementsAddSelectionInput): Promise<MultiElementsSelectionResult> {
    const json = await this.httpSubmit('v1/videos/multi-elements/add-selection', input as unknown as Record<string, unknown>)
    return json.data as unknown as MultiElementsSelectionResult
  }

  async deleteSelectionArea(input: MultiElementsDeleteSelectionInput): Promise<MultiElementsSelectionResult> {
    const json = await this.httpSubmit('v1/videos/multi-elements/delete-selection', input as unknown as Record<string, unknown>)
    return json.data as unknown as MultiElementsSelectionResult
  }

  async clearSelectionArea(input: MultiElementsClearSelectionInput): Promise<void> {
    await this.httpSubmit('v1/videos/multi-elements/clear-selection', { session_id: input.session_id })
  }

  async previewSelection(input: MultiElementsPreviewInput): Promise<MultiElementsPreviewResult> {
    const json = await this.httpSubmit('v1/videos/multi-elements/preview-selection', { session_id: input.session_id })
    return json.data as unknown as MultiElementsPreviewResult
  }

  async queryMultiElementsTask(taskId: string): Promise<KlingTaskListResult['tasks'][0]> {
    const json = await this.httpPoll('v1/videos/multi-elements', taskId)
    return json.data
  }

  async listMultiElementsTasks(params: KlingListParams = {}): Promise<KlingTaskListResult> {
    return this.taskList('v1/videos/multi-elements', params)
  }

  // ── Execute ──────────────────────────────────────────────────────────────

  async execute<T, I extends PollOptions & { options?: Record<string, unknown> }>(
    endpoint: string,
    defaults: Record<string, unknown>,
    input: I,
    extractor: Extractor<T>,
    sync?: boolean,
  ): Promise<T> {
    const { timeout, pollInterval, options, ...params } = input as PollOptions & { options?: Record<string, unknown> } & Record<string, unknown>
    const timeoutMs = timeout ?? DEFAULT_POLL_TIMEOUT_MS
    const initialIntervalMs = pollInterval ?? DEFAULT_POLL_INTERVAL_MS

    // Merge: user params > options passthrough > defaults
    const body: Record<string, unknown> = { ...params }
    if (options && typeof options === 'object') {
      for (const [key, val] of Object.entries(options as Record<string, unknown>)) {
        if (!(key in body)) body[key] = val
      }
    }
    for (const [key, val] of Object.entries(defaults)) {
      if (!(key in body)) body[key] = val
    }

    const cleanedBody = cleanBase64(body) as Record<string, unknown>

    // Submit
    const submitResult = await this.httpSubmit(endpoint, cleanedBody)
    const isSyncEndpoint = sync ?? SYNC_ENDPOINTS.has(endpoint)

    if (isSyncEndpoint) {
      return extractor(submitResult.data)
    }

    // Poll with exponential backoff
    const taskId = submitResult.data.task_id as string
    const deadline = Date.now() + timeoutMs
    let intervalMs = initialIntervalMs

    while (Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, intervalMs))
      intervalMs = Math.min(intervalMs * POLL_BACKOFF_MULTIPLIER, MAX_POLL_INTERVAL_MS)

      const pollResult = await this.httpPoll(endpoint, taskId)
      const status = pollResult.data.task_status as string

      if (status === 'failed') {
        throw new KlingTaskFailedError(taskId, (pollResult.data.task_status_msg as string) ?? 'Unknown error')
      }

      if (status === 'succeed') {
        return extractor(pollResult.data)
      }
    }

    throw new KlingTimeoutError(timeoutMs)
  }
}
