import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ValidationError } from '../../src/errors.js'
import type { ModelEntry } from '../../src/types.js'

// --- Test fixture: a model available on all 3 providers ---

const MULTI_PROVIDER_MODEL: ModelEntry = {
  canonical_name: 'test-multi-provider',
  aliases: ['multi-provider'],
  modality: { inputs: ['text'], outputs: ['image'] },
  providers: [
    {
      provider: 'fal-ai',
      skill_id: 'fal-test-multi',
      endpoint: 'fal-ai/test/multi',
      auth_env: 'FAL_KEY',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'images[].url',
        content_type: 'image/png',
      },
    },
    {
      provider: 'replicate',
      skill_id: 'replicate-test-multi',
      endpoint: 'test/multi',
      auth_env: 'REPLICATE_API_TOKEN',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'output[]',
        content_type: 'image/png',
      },
    },
    {
      provider: 'wavespeed',
      skill_id: 'wavespeed-test-multi',
      endpoint: 'test/multi',
      auth_env: 'WAVESPEED_API_KEY',
      param_map: {},
      output_map: {
        type: 'image',
        extract_path: 'data.outputs[]',
        content_type: 'image/png',
      },
    },
  ],
}

// --- Mock registry to return our multi-provider model ---
vi.mock('../../src/registry.js', () => ({
  resolveModel: vi.fn(() => MULTI_PROVIDER_MODEL),
  loadRegistry: vi.fn(() => [MULTI_PROVIDER_MODEL]),
  normalizeModelName: vi.fn((s: string) => s.toLowerCase()),
  clearRegistryCache: vi.fn(),
}))

// --- Provider-specific mock responses ---

function falResponses() {
  return [
    { status: 200, body: { request_id: 'fal-req-001' } },
    { status: 200, body: { status: 'COMPLETED' } },
    {
      status: 200,
      body: {
        images: [{ url: 'https://fal.media/output.png', content_type: 'image/png' }],
        seed: 1,
      },
    },
  ]
}

function replicateResponses() {
  return [
    { status: 200, body: { id: 'rep-pred-001' } },
    {
      status: 200,
      body: { id: 'rep-pred-001', status: 'succeeded', output: ['https://replicate.delivery/output.png'] },
    },
  ]
}

function wavespeedResponses() {
  return [
    { status: 200, body: { data: { id: 'ws-task-001', status: 'pending' } } },
    {
      status: 200,
      body: {
        data: {
          id: 'ws-task-001',
          status: 'completed',
          outputs: ['https://wavespeed.ai/output.png'],
        },
      },
    },
  ]
}

// --- Fetch mock helper ---

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

describe('Provider Routing', () => {
  const originalFetch = globalThis.fetch
  const originalEnv = { ...process.env }

  beforeEach(() => {
    // Clear all provider keys before each test
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('selects fal-ai when only FAL_KEY is set', async () => {
    process.env.FAL_KEY = 'test-fal-key'
    globalThis.fetch = mockFetch(falResponses())

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({ model: 'test-multi-provider', prompt: 'test' })

    expect(response.provider).toBe('fal-ai')
  })

  it('selects replicate when only REPLICATE_API_TOKEN is set', async () => {
    process.env.REPLICATE_API_TOKEN = 'test-replicate-token'
    globalThis.fetch = mockFetch(replicateResponses())

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({ model: 'test-multi-provider', prompt: 'test' })

    expect(response.provider).toBe('replicate')
  })

  it('selects wavespeed when only WAVESPEED_API_KEY is set', async () => {
    process.env.WAVESPEED_API_KEY = 'test-wavespeed-key'
    globalThis.fetch = mockFetch(wavespeedResponses())

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({ model: 'test-multi-provider', prompt: 'test' })

    expect(response.provider).toBe('wavespeed')
  })

  it('selects first available provider in binding order with multiple keys', async () => {
    // fal-ai is first in the binding order, so it should be selected
    process.env.FAL_KEY = 'test-fal-key'
    process.env.REPLICATE_API_TOKEN = 'test-replicate-token'
    process.env.WAVESPEED_API_KEY = 'test-wavespeed-key'
    globalThis.fetch = mockFetch(falResponses())

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({ model: 'test-multi-provider', prompt: 'test' })

    expect(response.provider).toBe('fal-ai')
  })

  it('selects replicate when fal-ai key is missing but replicate+wavespeed are set', async () => {
    // replicate is second in binding order, so it should be selected
    process.env.REPLICATE_API_TOKEN = 'test-replicate-token'
    process.env.WAVESPEED_API_KEY = 'test-wavespeed-key'
    globalThis.fetch = mockFetch(replicateResponses())

    const { generate } = await import('../../src/gateway.js')
    const response = await generate({ model: 'test-multi-provider', prompt: 'test' })

    expect(response.provider).toBe('replicate')
  })

  it('throws error when no API keys are set', async () => {
    // All keys already cleared in beforeEach
    const { generate } = await import('../../src/gateway.js')

    await expect(
      generate({ model: 'test-multi-provider', prompt: 'test' }),
    ).rejects.toThrow()
  })

  it('calls the correct provider API URL for fal-ai', async () => {
    process.env.FAL_KEY = 'test-fal-key'
    const fetchMock = mockFetch(falResponses())
    globalThis.fetch = fetchMock

    const { generate } = await import('../../src/gateway.js')
    await generate({ model: 'test-multi-provider', prompt: 'test' })

    // First call is submit to fal-ai queue
    const firstCallUrl = fetchMock.mock.calls[0][0] as string
    expect(firstCallUrl).toContain('queue.fal.run')
  })

  it('calls the correct provider API URL for replicate', async () => {
    process.env.REPLICATE_API_TOKEN = 'test-replicate-token'
    const fetchMock = mockFetch(replicateResponses())
    globalThis.fetch = fetchMock

    const { generate } = await import('../../src/gateway.js')
    await generate({ model: 'test-multi-provider', prompt: 'test' })

    // First call is submit to replicate API
    const firstCallUrl = fetchMock.mock.calls[0][0] as string
    expect(firstCallUrl).toContain('api.replicate.com')
  })

  it('calls the correct provider API URL for wavespeed', async () => {
    process.env.WAVESPEED_API_KEY = 'test-wavespeed-key'
    const fetchMock = mockFetch(wavespeedResponses())
    globalThis.fetch = fetchMock

    const { generate } = await import('../../src/gateway.js')
    await generate({ model: 'test-multi-provider', prompt: 'test' })

    // First call is submit to wavespeed API
    const firstCallUrl = fetchMock.mock.calls[0][0] as string
    expect(firstCallUrl).toContain('api.wavespeed.ai')
  })
})
