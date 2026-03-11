import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ValidationError, ProviderError } from '../../src/errors.js'
import type { ModelEntry } from '../../src/types.js'

// --- Test fixtures ---

const TEST_MODEL: ModelEntry = {
  canonical_name: 'test-flux-schnell',
  aliases: ['flux-schnell', 'schnell'],
  category: 'text-to-image',
  modality: { inputs: ['text'], outputs: ['image'] },
  providers: [
    {
      provider: 'fal-ai',
      skill_id: 'fal-flux-schnell',
      endpoint: 'fal-ai/flux/schnell',
      auth_env: 'FAL_KEY',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'images[].url',
        content_type: 'image/png',
      },
    },
  ],
}

const TRAINING_MODEL: ModelEntry = {
  canonical_name: 'test-training-model',
  aliases: ['train-model'],
  category: 'nonexistent-category' as ModelEntry['category'],
  modality: { inputs: ['text'], outputs: ['image'] },
  providers: [
    {
      provider: 'fal-ai',
      skill_id: 'fal-training',
      endpoint: 'fal-ai/training/model',
      auth_env: 'FAL_KEY',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'images[].url',
        content_type: 'image/png',
      },
    },
  ],
}

const NO_MATCH_MODEL: ModelEntry = {
  canonical_name: 'test-no-match-model',
  aliases: [],
  category: 'text-to-image',
  modality: { inputs: ['text'], outputs: ['image'] },
  providers: [
    {
      provider: 'wavespeed',
      skill_id: 'ws-model',
      endpoint: 'wavespeed/model',
      auth_env: 'WAVESPEED_API_KEY',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'images[].url',
        content_type: 'image/png',
      },
    },
  ],
}

const FAL_SUBMIT_RESPONSE = { request_id: 'req-abc-123' }
const FAL_STATUS_COMPLETED = { status: 'COMPLETED' }

// --- Mocks ---

const { mockResolveModel } = vi.hoisted(() => ({
  mockResolveModel: vi.fn(),
}))

vi.mock('../../src/resolver.js', () => ({
  resolveModel: mockResolveModel,
  loadRegistry: vi.fn(() => []),
  normalizeModelName: vi.fn((s: string) => s.toLowerCase()),
  clearRegistryCache: vi.fn(),
}))

function mockFetch(
  responses: Array<{ status: number; body: unknown; headers?: Record<string, string> }>,
) {
  let callIndex = 0
  return vi.fn(async () => {
    const resp = responses[callIndex++] ?? responses[responses.length - 1]
    return {
      ok: resp.status >= 200 && resp.status < 300,
      status: resp.status,
      headers: new Headers(resp.headers ?? {}),
      json: async () => resp.body,
      text: async () => JSON.stringify(resp.body),
    } as unknown as Response
  })
}

describe('generate() - extended branch coverage', () => {
  const originalFetch = globalThis.fetch
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env.FAL_KEY = 'test-fal-key-12345'
    mockResolveModel.mockReturnValue(TEST_MODEL)
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('throws ValidationError when no category template exists', async () => {
    mockResolveModel.mockReturnValue(TRAINING_MODEL)

    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
    ])

    const { generate } = await import('../../src/gateway.js')

    await expect(
      generate({ model: 'test-training-model', prompt: 'train something' }),
    ).rejects.toThrow(ValidationError)

    await expect(
      generate({ model: 'test-training-model', prompt: 'train something' }),
    ).rejects.toThrow(/No category template for "nonexistent-category"/)
  })

  it('throws ProviderError when poll returns failed with error message', async () => {
    globalThis.fetch = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // poll status -> FAILED
      { status: 200, body: { status: 'FAILED', error: 'NSFW detected' } },
    ])

    const { generate } = await import('../../src/gateway.js')

    await expect(
      generate({ model: 'test-flux-schnell', prompt: 'bad content' }),
    ).rejects.toThrow(ProviderError)

    // Re-setup fetch for the second assertion
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: { status: 'FAILED', error: 'NSFW detected' } },
    ])

    await expect(
      generate({ model: 'test-flux-schnell', prompt: 'bad content' }),
    ).rejects.toThrow(/fal-ai/)
  })

  it('throws ProviderError with "Generation failed" when poll returns failed without error', async () => {
    globalThis.fetch = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // poll status -> FAILED, no error message
      { status: 200, body: { status: 'FAILED' } },
    ])

    const { generate } = await import('../../src/gateway.js')

    try {
      await generate({ model: 'test-flux-schnell', prompt: 'fail' })
      expect.unreachable('Should have thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(ProviderError)
      // The fal-ai adapter fills "Unknown error" as its own fallback when FAILED has no error
      expect((err as ProviderError).raw).toBe('Unknown error')
    }
  })

  it('sets safety_flagged to true when has_nsfw_concepts contains true', async () => {
    const nsfwResult = {
      images: [
        { url: 'https://fal.media/files/example/output.png', content_type: 'image/png' },
      ],
      seed: 99,
      has_nsfw_concepts: [true, false],
    }

    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: nsfwResult },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'nsfw test',
    })

    expect(response.metadata.safety_flagged).toBe(true)
  })

  it('sets safety_flagged to false when has_nsfw_concepts is all false', async () => {
    const safeResult = {
      images: [
        { url: 'https://fal.media/files/example/output.png', content_type: 'image/png' },
      ],
      seed: 42,
      has_nsfw_concepts: [false],
    }

    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: safeResult },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'safe test',
    })

    expect(response.metadata.safety_flagged).toBe(false)
  })

  it('sets seed and safety_flagged to undefined when output is non-object', async () => {
    // When the raw output is a string (non-object), metadata seed/safety_flagged should be undefined
    const stringResult = 'https://fal.media/files/example/output.png'

    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: stringResult },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'string output',
    })

    expect(response.metadata.seed).toBeUndefined()
    expect(response.metadata.safety_flagged).toBeUndefined()
  })

  it('uses custom timeout from options when provided', async () => {
    const fetchMock = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      {
        status: 200,
        body: {
          images: [{ url: 'https://fal.media/output.png', content_type: 'image/png' }],
          seed: 1,
        },
      },
    ])
    globalThis.fetch = fetchMock

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'custom timeout test',
      options: { timeout: 5000 },
    })

    // The request should succeed; the custom timeout of 5000 is passed to withRetry
    expect(response.status).toBe('completed')
  })

  it('throws ValidationError when no bindings match available providers', async () => {
    // NO_MATCH_MODEL only has wavespeed provider, but we only have FAL_KEY set
    mockResolveModel.mockReturnValue(NO_MATCH_MODEL)

    const { generate } = await import('../../src/gateway.js')

    await expect(
      generate({ model: 'test-no-match-model', prompt: 'no adapter' }),
    ).rejects.toThrow(ValidationError)

    await expect(
      generate({ model: 'test-no-match-model', prompt: 'no adapter' }),
    ).rejects.toThrow(/No adapter available/)
  })
})
