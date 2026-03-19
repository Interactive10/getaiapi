import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { ModelEntry } from '../../src/types.js'

// --- Test fixtures ---

const TEST_MODEL: ModelEntry = {
  canonical_name: 'test-flux-schnell',
  aliases: ['flux-schnell', 'schnell'],
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
const FAL_STATUS_IN_PROGRESS = { status: 'IN_PROGRESS' }
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
}

// --- Mocks ---

vi.mock('../../src/registry.js', () => ({
  resolveModel: vi.fn(() => TEST_MODEL),
  loadRegistry: vi.fn(() => [TEST_MODEL]),
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

describe('submit() - async job submission', () => {
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

  it('returns task ID without blocking on poll', async () => {
    const fetchMock = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
    ])
    globalThis.fetch = fetchMock

    const { submit } = await import('../../src/gateway.js')
    const result = await submit({
      model: 'test-flux-schnell',
      prompt: 'a cat in space',
    })

    expect(result.id).toBe('req-abc-123')
    expect(result.model).toBe('test-flux-schnell')
    expect(result.provider).toBe('fal-ai')
    expect(result.endpoint).toBe('fal-ai/flux/schnell')
    expect(['pending', 'processing']).toContain(result.status)
    // Only one fetch call (submit), no polling
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('returns SubmitResponse with correct shape', async () => {
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
    ])

    const { submit } = await import('../../src/gateway.js')
    const result = await submit({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('model')
    expect(result).toHaveProperty('provider')
    expect(result).toHaveProperty('endpoint')
    expect(result).toHaveProperty('status')
  })
})

describe('poll() - status checking', () => {
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

  it('returns processing status when job is still running', async () => {
    // First call for submit, next for poll status
    globalThis.fetch = mockFetch([
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_IN_PROGRESS },
    ])

    const { submit, poll } = await import('../../src/gateway.js')
    const job = await submit({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    const status = await poll(job)
    expect(status.id).toBe('req-abc-123')
    expect(status.status).toBe('processing')
    expect(status.outputs).toBeUndefined()
  })

  it('returns completed with mapped outputs when done', async () => {
    globalThis.fetch = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // poll status -> COMPLETED
      { status: 200, body: FAL_STATUS_COMPLETED },
      // poll result fetch
      { status: 200, body: FAL_RESULT },
    ])

    const { submit, poll } = await import('../../src/gateway.js')
    const job = await submit({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    const result = await poll(job)
    expect(result.status).toBe('completed')
    expect(result.outputs).toBeDefined()
    expect(result.outputs!.length).toBeGreaterThan(0)
    expect(result.outputs![0]).toMatchObject({
      type: 'image',
      url: expect.any(String),
      content_type: expect.any(String),
    })
    expect(result.metadata).toBeDefined()
    expect(result.metadata!.seed).toBe(42)
  })

  it('returns failed status with error message', async () => {
    globalThis.fetch = mockFetch([
      // submit
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      // poll status -> FAILED (fal-ai uses uppercase FAILED)
      { status: 200, body: { status: 'FAILED', error: 'NSFW content detected' } },
    ])

    const { submit, poll } = await import('../../src/gateway.js')
    const job = await submit({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    const result = await poll(job)
    expect(result.status).toBe('failed')
    expect(result.error).toBeDefined()
  })
})

describe('submitAndPoll() - backward compatibility', () => {
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

  it('returns same result as generate()', async () => {
    const makeResponses = () => [
      { status: 200, body: FAL_SUBMIT_RESPONSE },
      { status: 200, body: FAL_STATUS_COMPLETED },
      { status: 200, body: FAL_RESULT },
    ]

    // Run generate
    globalThis.fetch = mockFetch(makeResponses())
    const { generate, submitAndPoll } = await import('../../src/gateway.js')
    const genResult = await generate({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    // Run submitAndPoll
    globalThis.fetch = mockFetch(makeResponses())
    const sapResult = await submitAndPoll({
      model: 'test-flux-schnell',
      prompt: 'test',
    })

    // Same shape (IDs will differ since they're UUIDs)
    expect(sapResult.model).toBe(genResult.model)
    expect(sapResult.provider).toBe(genResult.provider)
    expect(sapResult.status).toBe(genResult.status)
    expect(sapResult.outputs.length).toBe(genResult.outputs.length)
  })
})
