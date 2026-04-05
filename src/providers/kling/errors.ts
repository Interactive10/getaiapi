export class KlingError extends Error {
  readonly code: string
  constructor(code: string, message: string) {
    super(message)
    this.name = 'KlingError'
    this.code = code
  }
}

export class KlingAuthError extends KlingError {
  constructor(message = 'Missing Kling credentials. Call kling.configure() or set KLING_ACCESS_KEY + KLING_SECRET_KEY.') {
    super('AUTH_ERROR', message)
    this.name = 'KlingAuthError'
  }
}

export class KlingRateLimitError extends KlingError {
  readonly retryAfterMs: number
  constructor(retryAfterMs: number) {
    super('RATE_LIMIT', `Rate limited by Kling. Retry after ${retryAfterMs}ms.`)
    this.name = 'KlingRateLimitError'
    this.retryAfterMs = retryAfterMs
  }
}

export class KlingApiError extends KlingError {
  readonly statusCode: number
  readonly raw: unknown
  constructor(endpoint: string, statusCode: number, raw: unknown) {
    super('API_ERROR', `Kling API error ${statusCode} on ${endpoint}.`)
    this.name = 'KlingApiError'
    this.statusCode = statusCode
    this.raw = raw
  }
}

export class KlingTimeoutError extends KlingError {
  readonly timeoutMs: number
  constructor(timeoutMs: number) {
    super('TIMEOUT', `Kling task timed out after ${timeoutMs}ms.`)
    this.name = 'KlingTimeoutError'
    this.timeoutMs = timeoutMs
  }
}

export class KlingTaskFailedError extends KlingError {
  readonly taskId: string
  constructor(taskId: string, message: string) {
    super('TASK_FAILED', `Kling task ${taskId} failed: ${message}`)
    this.name = 'KlingTaskFailedError'
    this.taskId = taskId
  }
}
