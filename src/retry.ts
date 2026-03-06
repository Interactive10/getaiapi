import {
  AuthError,
  ValidationError,
  ModelNotFoundError,
  ProviderError,
  RateLimitError,
  TimeoutError,
} from './errors.js'

export interface RetryOptions {
  maxRetries: number
  initialDelayMs: number
  maxDelayMs: number
  timeoutMs: number
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  timeoutMs: 300_000,
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryable(error: unknown): boolean {
  // Never retry auth, validation, or model-not-found errors
  if (
    error instanceof AuthError ||
    error instanceof ValidationError ||
    error instanceof ModelNotFoundError
  ) {
    return false
  }

  // Retry rate limit errors (429)
  if (error instanceof RateLimitError) {
    return true
  }

  // ProviderError: only retry 5xx, not 4xx
  if (error instanceof ProviderError) {
    return error.statusCode >= 500
  }

  // Network errors (TypeError from fetch, etc.) are retryable
  if (error instanceof TypeError) {
    return true
  }

  return false
}

function getDelayMs(
  error: unknown,
  attempt: number,
  options: RetryOptions,
): number {
  // RateLimitError has its own retry-after
  if (error instanceof RateLimitError) {
    return error.retryAfterMs
  }

  // Exponential backoff with jitter
  const jitter = Math.random() * options.initialDelayMs * 0.5
  const delay = options.initialDelayMs * Math.pow(2, attempt) + jitter
  return Math.min(delay, options.maxDelayMs)
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryOptions>,
): Promise<T> {
  const opts: RetryOptions = { ...DEFAULT_OPTIONS, ...options }
  const startTime = Date.now()
  let lastError: unknown

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    // Check total timeout before attempting
    if (attempt > 0) {
      const elapsed = Date.now() - startTime
      if (elapsed >= opts.timeoutMs) {
        throw new TimeoutError('unknown', 'unknown', opts.timeoutMs)
      }
    }

    try {
      return await fn()
    } catch (error) {
      lastError = error

      // If not retryable, throw immediately
      if (!isRetryable(error)) {
        throw error
      }

      // If we've exhausted retries, throw
      if (attempt >= opts.maxRetries) {
        throw error
      }

      const delay = getDelayMs(error, attempt, opts)

      // Check if waiting would exceed timeout
      const elapsed = Date.now() - startTime
      if (elapsed + delay >= opts.timeoutMs) {
        throw new TimeoutError('unknown', 'unknown', opts.timeoutMs)
      }

      await sleep(delay)
    }
  }

  /* v8 ignore next 3 */
  // Unreachable: the for loop always returns or throws
  throw lastError as Error
}
