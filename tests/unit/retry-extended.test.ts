import { describe, it, expect, vi, afterEach } from 'vitest'
import { withRetry } from '../../src/retry.js'
import {
  ProviderError,
  ModelNotFoundError,
  TimeoutError,
} from '../../src/errors.js'

describe('withRetry - extended branch coverage', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('retries on TypeError and succeeds on second attempt', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValue('recovered')

    const result = await withRetry(fn, {
      maxRetries: 3,
      initialDelayMs: 10,
      maxDelayMs: 50,
      timeoutMs: 60000,
    })

    expect(result).toBe('recovered')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('does NOT retry on plain Error (unknown error type)', async () => {
    const err = new Error('some random error')
    const fn = vi.fn().mockRejectedValue(err)

    await expect(
      withRetry(fn, {
        maxRetries: 3,
        initialDelayMs: 10,
        maxDelayMs: 50,
        timeoutMs: 60000,
      }),
    ).rejects.toThrow('some random error')

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does NOT retry on ModelNotFoundError', async () => {
    const err = new ModelNotFoundError('nonexistent-model', ['similar-model'])
    const fn = vi.fn().mockRejectedValue(err)

    await expect(
      withRetry(fn, {
        maxRetries: 3,
        initialDelayMs: 10,
        maxDelayMs: 50,
        timeoutMs: 60000,
      }),
    ).rejects.toThrow(ModelNotFoundError)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('throws TimeoutError when elapsed >= timeoutMs before attempt starts (line 84-86)', async () => {
    // To hit line 84-86: after the sleep, when attempt > 0, elapsed >= timeoutMs.
    // Strategy: mock Date.now to control elapsed time precisely.
    // - At start (attempt=0): Date.now = 1000 (startTime = 1000)
    // - fn() throws retryable error
    // - getDelayMs returns small delay, elapsed(0) + delay(10) < timeoutMs(100): passes line 108
    // - sleep happens
    // - At attempt=1: Date.now = 1200 → elapsed = 200 >= timeoutMs(100) → line 84 triggers

    let dateNowCallCount = 0
    const originalDateNow = Date.now
    vi.spyOn(Date, 'now').mockImplementation(() => {
      dateNowCallCount++
      // Call 1: startTime capture (line 77) → 1000
      // Call 2: elapsed check before delay calc (line 107) → 1000 (elapsed=0)
      // Call 3: elapsed check at attempt 1 (line 83) → 1200 (elapsed=200)
      if (dateNowCallCount <= 2) return 1000
      return 1200 // elapsed = 200, exceeds timeoutMs of 100
    })

    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ProviderError('fal-ai', 'model', 500, 'err'))
      .mockResolvedValue('ok')

    await expect(
      withRetry(fn, {
        maxRetries: 10,
        initialDelayMs: 10,
        maxDelayMs: 50,
        timeoutMs: 100,
      }),
    ).rejects.toThrow(TimeoutError)

    // Only first attempt should have been made
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('throws TimeoutError when delay would exceed remaining timeout', async () => {
    // The function fails with a retryable error, but the calculated delay
    // plus elapsed time would exceed timeoutMs
    let callCount = 0
    const fn = vi.fn(async () => {
      callCount++
      // Burn some time on first call to get close to timeout
      if (callCount <= 2) {
        throw new ProviderError('fal-ai', 'model', 502, 'bad gateway')
      }
      return 'ok'
    })

    await expect(
      withRetry(fn, {
        maxRetries: 10,
        initialDelayMs: 100,
        maxDelayMs: 5000,
        timeoutMs: 50, // Very short - delay will exceed this
      }),
    ).rejects.toThrow(TimeoutError)
  })
})
