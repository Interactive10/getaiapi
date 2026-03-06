import { describe, it, expect } from 'vitest'
import { generate } from '../../src/index.js'

describe('E2E smoke tests (live API)', () => {
  // Only run if FAL_KEY is set
  const runLive = !!process.env.FAL_KEY

  it.skipIf(!runLive)('generates image via fal-ai flux-schnell', async () => {
    const result = await generate({
      model: 'flux-schnell',
      prompt: 'a simple red circle on white background',
      seed: 42,
    })

    expect(result.status).toBe('completed')
    expect(result.provider).toBe('fal-ai')
    expect(result.outputs).toHaveLength(1)
    expect(result.outputs[0].type).toBe('image')
    expect(result.outputs[0].url).toMatch(/^https?:\/\//)
    expect(result.metadata.inference_time_ms).toBeGreaterThan(0)
  }, 60000)
})
