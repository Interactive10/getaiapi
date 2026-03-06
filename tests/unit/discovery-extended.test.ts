import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { listModels } from '../../src/discovery.js'
import { clearRegistryCache } from '../../src/resolver.js'

describe('listModels() - accessible filter branch coverage', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    clearRegistryCache()
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    clearRegistryCache()
  })

  it('accessible: true with FAL_KEY set returns only fal-ai models', () => {
    // Clear all keys first
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY

    // Set only FAL_KEY
    process.env.FAL_KEY = 'test-fal-key'

    const models = listModels({ accessible: true })

    expect(Array.isArray(models)).toBe(true)
    expect(models.length).toBeGreaterThan(0)

    // Every returned model must have at least one fal-ai provider
    for (const model of models) {
      expect(model.providers.some(p => p.provider === 'fal-ai')).toBe(true)
    }
  })

  it('accessible: true with no keys returns empty array', () => {
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY

    const models = listModels({ accessible: true })

    expect(Array.isArray(models)).toBe(true)
    expect(models.length).toBe(0)
  })

  it('accessible: false returns all models (same as no filter)', () => {
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY

    const allModels = listModels()
    const withFalseAccessible = listModels({ accessible: false })

    expect(withFalseAccessible.length).toBe(allModels.length)
  })

  it('accessible: true combined with category filter applies both', () => {
    delete process.env.FAL_KEY
    delete process.env.REPLICATE_API_TOKEN
    delete process.env.WAVESPEED_API_KEY

    process.env.FAL_KEY = 'test-fal-key'

    const accessibleOnly = listModels({ accessible: true })
    const accessibleTTI = listModels({ accessible: true, category: 'text-to-image' })

    expect(accessibleTTI.length).toBeLessThanOrEqual(accessibleOnly.length)

    for (const model of accessibleTTI) {
      expect(model.category).toBe('text-to-image')
      expect(model.providers.some(p => p.provider === 'fal-ai')).toBe(true)
    }
  })
})
