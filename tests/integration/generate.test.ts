import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ValidationError } from '../../src/errors.js'
import type { ModelEntry, ProviderResponse } from '../../src/types.js'

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

const FAL_SUBMIT_RESPONSE = { request_id: 'req-abc-123' }
const FAL_STATUS_COMPLETED = { status: 'COMPLETED' }
const FAL_RESULT = {
  images: [
    {
      url: 'https://fal.media/files/example/output.png',
      width: 1024,
      height: 768,
      content_type: 'image/png',
    },
  ],
  seed: 42,
  has_nsfw_concepts: [false],
  timings: { inference: 0.5 },
}

// --- Mocks ---

// Mock the resolver to return our test model
vi.mock('../../src/resolver.js', () => ({
  resolveModel: vi.fn(() => TEST_MODEL),
  loadRegistry: vi.fn(() => [TEST_MODEL]),
  normalizeModelName: vi.fn((s: string) => s.toLowerCase()),
  clearRegistryCache: vi.fn(),
}))

// Mock fetch to simulate fal-ai responses
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

describe('generate() - gateway orchestration', () => {
  const originalFetch = globalThis.fetch
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env.FAL_KEY = 'test-fal-key-12345'
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('happy path: returns a valid GenerateResponse', async () => {
    globalThis.fetch = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // poll status -> COMPLETED
      { status: 200, body: FAL_STATUS_COMPLETED },
      // poll result
      { status: 200, body: FAL_RESULT },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'a cat in space',
    })

    expect(response.id).toBeDefined()
    expect(typeof response.id).toBe('string')
    expect(response.model).toBe('test-flux-schnell')
    expect(response.provider).toBe('fal-ai')
    expect(response.status).toBe('completed')
  })

  it('outputs is always an array', async () => {
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: FAL_RESULT },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'sunset over mountains',
    })

    expect(Array.isArray(response.outputs)).toBe(true)
    expect(response.outputs.length).toBeGreaterThan(0)
    expect(response.outputs[0]).toMatchObject({
      type: 'image',
      url: expect.any(String),
      content_type: expect.any(String),
    })
  })

  it('response has id, model, provider, status', async () => {
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: FAL_RESULT },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'test prompt',
    })

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('model')
    expect(response).toHaveProperty('provider')
    expect(response).toHaveProperty('status')
    expect(response).toHaveProperty('outputs')
    expect(response).toHaveProperty('metadata')
  })

  it('metadata has inference_time_ms', async () => {
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: FAL_RESULT },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'test prompt',
    })

    expect(response.metadata).toBeDefined()
    expect(typeof response.metadata.inference_time_ms).toBe('number')
    expect(response.metadata.inference_time_ms).toBeGreaterThanOrEqual(0)
  })

  it('metadata extracts seed from output', async () => {
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: FAL_RESULT },
    ])

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'test prompt',
    })

    expect(response.metadata.seed).toBe(42)
  })

  it('missing model throws ValidationError', async () => {
    const { generate } = await import('../../src/gateway.js')

    await expect(
      generate({ model: '', prompt: 'test' }),
    ).rejects.toThrow(ValidationError)
  })

  it('no API keys throws error', async () => {
    // Clear all provider keys
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY

    const { generate } = await import('../../src/gateway.js')

    // resolveModel is mocked to return TEST_MODEL, but AuthManager
    // will see no keys available, so resolveModel filtering (via
    // auth.availableProviders()) will cause ModelNotFoundError.
    // However, since we mock resolveModel, the error will come from
    // the "no adapter available" check in the gateway.
    await expect(
      generate({ model: 'test-flux-schnell', prompt: 'test' }),
    ).rejects.toThrow()
  })

  it('polls until completion when status is processing', async () => {
    const fetchMock = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // first poll -> IN_PROGRESS
      { status: 200, body: { status: 'IN_PROGRESS' } },
      // second poll -> COMPLETED
      { status: 200, body: FAL_STATUS_COMPLETED },
      // result fetch
      { status: 200, body: FAL_RESULT },
    ])
    globalThis.fetch = fetchMock

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({
      model: 'test-flux-schnell',
      prompt: 'test with polling',
    })

    expect(response.status).toBe('completed')
    // submit + (poll status) + (poll status + result fetch)
    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
})
