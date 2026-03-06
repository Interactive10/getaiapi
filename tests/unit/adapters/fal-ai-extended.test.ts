import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { falAiAdapter, submitAndPoll } from '../../../src/adapters/fal-ai.js'
import { ProviderError, TimeoutError } from '../../../src/errors.js'
import type { OutputMapping } from '../../../src/types.js'

const ENDPOINT = 'fal-ai/flux/schnell'
const AUTH = 'test-api-key'

function mockFetch(
  responses: Array<{
    status: number
    body: unknown
    headers?: Record<string, string>
    jsonThrows?: boolean
    textThrows?: boolean
  }>,
) {
  let callIndex = 0
  return vi.fn(async () => {
    const resp = responses[callIndex++] ?? responses[responses.length - 1]
    return {
      ok: resp.status >= 200 && resp.status < 300,
      status: resp.status,
      headers: new Headers(resp.headers ?? {}),
      json: async () => {
        if (resp.jsonThrows) throw new Error('not JSON')
        return resp.body
      },
      text: async () => {
        if (resp.textThrows) throw new Error('text() failed')
        return typeof resp.body === 'string' ? resp.body : JSON.stringify(resp.body)
      },
    } as unknown as Response
  })
}

describe('falAiAdapter - extended coverage', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  describe('poll', () => {
    it('throws ProviderError when endpoint is not provided', async () => {
      await expect(
        falAiAdapter.poll('req-123', AUTH),
      ).rejects.toThrow(ProviderError)
    })

    it('returns "Unknown error" when FAILED status has no error message', async () => {
      globalThis.fetch = mockFetch([
        { status: 200, body: { status: 'FAILED' } },
      ])

      const result = await falAiAdapter.poll('req-456', AUTH, ENDPOINT)

      expect(result).toEqual({
        id: 'req-456',
        status: 'failed',
        error: 'Unknown error',
      })
    })
  })

  describe('handleHttpErrors', () => {
    it('falls back to text() when response.json() throws on error response', async () => {
      globalThis.fetch = mockFetch([
        { status: 500, body: 'Internal Server Error', jsonThrows: true },
      ])

      await expect(
        falAiAdapter.submit(ENDPOINT, { prompt: 'test' }, AUTH),
      ).rejects.toThrow(ProviderError)

      try {
        globalThis.fetch = mockFetch([
          { status: 500, body: 'Internal Server Error', jsonThrows: true },
        ])
        await falAiAdapter.submit(ENDPOINT, { prompt: 'test' }, AUTH)
      } catch (err) {
        expect(err).toBeInstanceOf(ProviderError)
        expect((err as ProviderError).raw).toBe('Internal Server Error')
      }
    })

    it('returns null when both json() and text() throw on error response', async () => {
      globalThis.fetch = mockFetch([
        { status: 500, body: null, jsonThrows: true, textThrows: true },
      ])

      try {
        await falAiAdapter.submit(ENDPOINT, { prompt: 'test' }, AUTH)
      } catch (err) {
        expect(err).toBeInstanceOf(ProviderError)
        expect((err as ProviderError).raw).toBeNull()
      }
    })
  })

  describe('parseOutput', () => {
    it('returns empty array when images is not an array', () => {
      const mapping: OutputMapping = {
        type: 'image',
        extract_path: 'images[].url',
      }

      const result = falAiAdapter.parseOutput({ images: null }, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array when images is missing', () => {
      const mapping: OutputMapping = {
        type: 'image',
        extract_path: 'images[].url',
      }

      const result = falAiAdapter.parseOutput({}, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array when video is missing', () => {
      const mapping: OutputMapping = {
        type: 'video',
        extract_path: 'video.url',
      }

      const result = falAiAdapter.parseOutput({}, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array when video has no url', () => {
      const mapping: OutputMapping = {
        type: 'video',
        extract_path: 'video.url',
      }

      const result = falAiAdapter.parseOutput({ video: {} }, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array when audio is missing', () => {
      const mapping: OutputMapping = {
        type: 'audio',
        extract_path: 'audio.url',
      }

      const result = falAiAdapter.parseOutput({}, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array when audio has no url', () => {
      const mapping: OutputMapping = {
        type: 'audio',
        extract_path: 'audio.url',
      }

      const result = falAiAdapter.parseOutput({ audio: {} }, mapping)
      expect(result).toEqual([])
    })

    it('returns empty array for unknown extract path', () => {
      const mapping: OutputMapping = {
        type: 'image',
        extract_path: 'unknown.path.here',
      }

      const result = falAiAdapter.parseOutput({ some: 'data' }, mapping)
      expect(result).toEqual([])
    })

    it('uses content_type from outputMapping when image has no content_type', () => {
      const mapping: OutputMapping = {
        type: 'image',
        extract_path: 'images[].url',
        content_type: 'image/webp',
      }

      const raw = {
        images: [{ url: 'https://example.com/img.webp' }],
      }

      const items = falAiAdapter.parseOutput(raw, mapping)
      expect(items[0].content_type).toBe('image/webp')
    })

    it('uses content_type from outputMapping for video when video has no content_type', () => {
      const mapping: OutputMapping = {
        type: 'video',
        extract_path: 'video.url',
        content_type: 'video/webm',
      }

      const raw = {
        video: { url: 'https://example.com/vid.webm' },
      }

      const items = falAiAdapter.parseOutput(raw, mapping)
      expect(items[0].content_type).toBe('video/webm')
    })
  })

  describe('submitAndPoll', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('submits then polls until completed', async () => {
      const fetchMock = mockFetch([
        // submit
        { status: 200, body: { request_id: 'req-sp-1' } },
        // poll 1 -> processing
        { status: 200, body: { status: 'IN_PROGRESS' } },
        // poll 2 -> completed status
        { status: 200, body: { status: 'COMPLETED' } },
        // poll 2 -> result fetch
        { status: 200, body: { images: [{ url: 'https://example.com/out.png' }] } },
      ])
      globalThis.fetch = fetchMock

      const promise = submitAndPoll(ENDPOINT, { prompt: 'test' }, AUTH, {
        timeoutMs: 30000,
        intervalMs: 1000,
        maxIntervalMs: 5000,
      })

      // Advance timers to let the poll intervals run
      // First poll after 1000ms
      await vi.advanceTimersByTimeAsync(1000)
      // Second poll after 1500ms (interval increases by 500)
      await vi.advanceTimersByTimeAsync(1500)

      const result = await promise

      expect(result.status).toBe('completed')
      expect(result.id).toBe('req-sp-1')
      expect(result.output).toEqual({ images: [{ url: 'https://example.com/out.png' }] })
    })

    it('throws TimeoutError when polling exceeds timeoutMs', async () => {
      const fetchMock = mockFetch([
        // submit
        { status: 200, body: { request_id: 'req-sp-2' } },
        // All polls -> processing (never completes)
        { status: 200, body: { status: 'IN_PROGRESS' } },
      ])
      globalThis.fetch = fetchMock

      const promise = submitAndPoll(ENDPOINT, { prompt: 'test' }, AUTH, {
        timeoutMs: 3000,
        intervalMs: 1000,
        maxIntervalMs: 2000,
      })

      // Catch unhandled rejection while advancing timers
      const caught = promise.catch((e) => e)

      // Advance past timeout
      for (let i = 0; i < 10; i++) {
        await vi.advanceTimersByTimeAsync(1000)
      }

      const err = await caught
      expect(err).toBeInstanceOf(TimeoutError)
    })

    it('returns failed result when poll returns failed status', async () => {
      const fetchMock = mockFetch([
        // submit
        { status: 200, body: { request_id: 'req-sp-3' } },
        // poll -> FAILED
        { status: 200, body: { status: 'FAILED', error: 'Generation failed' } },
      ])
      globalThis.fetch = fetchMock

      const promise = submitAndPoll(ENDPOINT, { prompt: 'test' }, AUTH, {
        timeoutMs: 30000,
        intervalMs: 500,
      })

      // Advance to first poll
      await vi.advanceTimersByTimeAsync(500)

      const result = await promise

      expect(result.status).toBe('failed')
      expect(result.error).toBe('Generation failed')
      expect(result.id).toBe('req-sp-3')
    })
  })
})
