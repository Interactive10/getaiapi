import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withRetry } from '../../src/retry.js'
import {
  ProviderError,
  ValidationError,
  AuthError,
  RateLimitError,
  TimeoutError,
} from '../../src/errors.js'

describe('withRetry', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  /** Helper to advance pending timers so sleep() resolves. */
  function runRetry<T>(promise: Promise<T>): Promise<T> {
    // Continuously flush timers until the promise settles
    const flush = async () => {
      for (let i = 0; i < 20; i++) {
        await vi.advanceTimersByTimeAsync(15000)
      }
    }
    return Promise.race([promise, flush().then(() => promise)])
  }

  it('succeeds on first try (no retry needed)', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const result = await withRetry(fn)
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries on 5xx ProviderError and succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ProviderError('fal-ai', 'model', 500, 'server error'))
      .mockResolvedValue('ok')

    const promise = withRetry(fn, { maxRetries: 3, initialDelayMs: 100, maxDelayMs: 1000, timeoutMs: 60000 })
    const result = await runRetry(promise)

    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('does NOT retry on 4xx ProviderError (throws immediately)', async () => {
    const err = new ProviderError('fal-ai', 'model', 400, 'bad request')
    const fn = vi.fn().mockRejectedValue(err)

    const promise = withRetry(fn, { maxRetries: 3, initialDelayMs: 100, maxDelayMs: 1000, timeoutMs: 60000 })
    await expect(promise).rejects.toThrow(ProviderError)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does NOT retry on ValidationError', async () => {
    const err = new ValidationError('field', 'invalid')
    const fn = vi.fn().mockRejectedValue(err)

    const promise = withRetry(fn, { maxRetries: 3 })
    await expect(promise).rejects.toThrow(ValidationError)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does NOT retry on AuthError', async () => {
    const err = new AuthError('fal-ai', 'FAL_KEY')
    const fn = vi.fn().mockRejectedValue(err)

    const promise = withRetry(fn, { maxRetries: 3 })
    await expect(promise).rejects.toThrow(AuthError)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries on RateLimitError, waits for retryAfterMs', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new RateLimitError('fal-ai', 2000))
      .mockResolvedValue('ok')

    const promise = withRetry(fn, { maxRetries: 3, initialDelayMs: 100, maxDelayMs: 10000, timeoutMs: 60000 })
    const result = await runRetry(promise)

    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('gives up after maxRetries', async () => {
    const err = new ProviderError('fal-ai', 'model', 500, 'server error')
    const fn = vi.fn().mockRejectedValue(err)

    const promise = withRetry(fn, { maxRetries: 2, initialDelayMs: 100, maxDelayMs: 1000, timeoutMs: 60000 })
    await expect(runRetry(promise)).rejects.toThrow(ProviderError)
    expect(fn).toHaveBeenCalledTimes(3) // initial + 2 retries
  })

  it('exponential backoff increases delay between retries', async () => {
    const err = new ProviderError('fal-ai', 'model', 502, 'bad gateway')
    const fn = vi.fn().mockRejectedValue(err)

    // Use real timers for this test to capture timing
    vi.useRealTimers()

    const start = Date.now()
    const promise = withRetry(fn, {
      maxRetries: 2,
      initialDelayMs: 50,
      maxDelayMs: 5000,
      timeoutMs: 60000,
    })

    await expect(promise).rejects.toThrow(ProviderError)
    const elapsed = Date.now() - start

    // With initialDelay=50: attempt 0 delay ~50*2^0+jitter, attempt 1 delay ~50*2^1+jitter
    // Minimum total ~50+100=150ms (without jitter)
    expect(elapsed).toBeGreaterThanOrEqual(100)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('total timeout throws TimeoutError', async () => {
    const err = new ProviderError('fal-ai', 'model', 500, 'server error')
    const fn = vi.fn().mockRejectedValue(err)

    const promise = withRetry(fn, {
      maxRetries: 100,
      initialDelayMs: 100,
      maxDelayMs: 10000,
      timeoutMs: 50, // Very short timeout
    })

    // Use real timers so the time actually elapses
    vi.useRealTimers()

    await expect(promise).rejects.toThrow(TimeoutError)
  })
})
