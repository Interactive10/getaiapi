import type { FetchOptions, FetchLogEntry } from './types.js'

const DEFAULT_TIMEOUT_MS = 30_000
const SENSITIVE_HEADER = /auth|key|token|secret|bearer/i

interface FetchConfig {
  timeoutMs: number
  logging: boolean
  logger: (entry: FetchLogEntry) => void
}

let config: FetchConfig = {
  timeoutMs: DEFAULT_TIMEOUT_MS,
  logging: false,
  logger: (entry) => console.debug(JSON.stringify(entry)),
}

export function configureFetch(options: FetchOptions): void {
  if (options.timeoutMs !== undefined) config.timeoutMs = options.timeoutMs
  if (options.logging !== undefined) config.logging = options.logging
  if (options.logger) config.logger = options.logger
}

export function resetFetch(): void {
  config = {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    logging: false,
    logger: (entry) => console.debug(JSON.stringify(entry)),
  }
}

function redactHeaders(headers: HeadersInit | undefined): Record<string, string> | undefined {
  if (!headers) return undefined
  const entries = headers instanceof Headers
    ? Array.from(headers.entries())
    : Array.isArray(headers)
      ? headers
      : Object.entries(headers)
  const result: Record<string, string> = {}
  for (const [key, value] of entries) {
    result[key] = SENSITIVE_HEADER.test(key) ? '[REDACTED]' : value
  }
  return result
}

function bodySize(body: RequestInit['body']): number | undefined {
  if (typeof body === 'string') return body.length
  if (body instanceof ArrayBuffer) return body.byteLength
  if (body instanceof Uint8Array) return body.byteLength
  return undefined
}

export async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const finalInit = { ...init }

  if (!finalInit.signal) {
    finalInit.signal = AbortSignal.timeout(config.timeoutMs)
  }

  const method = (finalInit.method ?? 'GET').toUpperCase()
  const start = Date.now()

  if (config.logging) {
    config.logger({
      kind: 'request',
      method,
      url,
      bodyBytes: bodySize(finalInit.body),
      headers: redactHeaders(finalInit.headers),
    })
  }

  try {
    const response = await fetch(url, finalInit)

    if (config.logging) {
      const contentLength = response.headers.get('content-length')
      config.logger({
        kind: 'response',
        method,
        url,
        status: response.status,
        durationMs: Date.now() - start,
        responseBytes: contentLength ? parseInt(contentLength, 10) : undefined,
      })
    }

    return response
  } catch (err) {
    if (config.logging) {
      config.logger({
        kind: 'error',
        method,
        url,
        durationMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      })
    }
    throw err
  }
}
