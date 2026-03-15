import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { listModels, resolveModel } from '../../src/index.js'
import { clearRegistryCache, loadRegistry } from '../../src/registry.js'
import type { ProviderName } from '../../src/types.js'

describe('Discovery API', () => {
  beforeEach(() => {
    clearRegistryCache()
  })

  describe('listModels()', () => {
    it('returns an array', () => {
      const models = listModels()
      expect(Array.isArray(models)).toBe(true)
    })

    it('returns models with correct shape', () => {
      const models = listModels()
      if (models.length > 0) {
        const model = models[0]
        expect(model).toHaveProperty('canonical_name')
        expect(model).toHaveProperty('aliases')
        expect(model).toHaveProperty('modality')
        expect(model).toHaveProperty('providers')
        expect(model).not.toHaveProperty('category')
        expect(Array.isArray(model.aliases)).toBe(true)
        expect(Array.isArray(model.providers)).toBe(true)
      }
    })

    it('filters by input modality', () => {
      const models = listModels({ input: 'text' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        expect(model.modality.inputs).toContain('text')
      }
    })

    it('filters by output modality', () => {
      const models = listModels({ output: 'image' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        expect(model.modality.outputs).toContain('image')
      }
    })

    it('filters by provider', () => {
      const models = listModels({ provider: 'fal-ai' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        expect(model.providers.some(p => p.provider === 'fal-ai')).toBe(true)
      }
    })

    it('filters by query string', () => {
      const models = listModels({ query: 'flux' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        const matchesCanonical = model.canonical_name.includes('flux')
        const matchesAlias = model.aliases.some(a => a.includes('flux'))
        expect(matchesCanonical || matchesAlias).toBe(true)
      }
    })

    it('combined filters narrow results', () => {
      const allTextToImage = listModels({ input: 'text', output: 'image' })
      const falTextToImage = listModels({ input: 'text', output: 'image', provider: 'fal-ai' })
      expect(falTextToImage.length).toBeLessThanOrEqual(allTextToImage.length)
    })
  })

  describe('resolveModel()', () => {
    it('returns a ModelEntry for flux-schnell', () => {
      const model = resolveModel('flux-schnell')
      expect(model).toBeDefined()
      expect(model.canonical_name).toBe('flux-schnell')
      expect(Array.isArray(model.aliases)).toBe(true)
      expect(Array.isArray(model.providers)).toBe(true)
      expect(model.providers.length).toBeGreaterThan(0)
      expect(model.modality).toHaveProperty('inputs')
      expect(model.modality).toHaveProperty('outputs')
    })

    it('resolves alias to canonical model', () => {
      const model = resolveModel('flux-schnell')
      expect(model.canonical_name).toBe('flux-schnell')
    })

    it('returns providers with correct shape', () => {
      const model = resolveModel('flux-schnell')
      const provider = model.providers[0]
      expect(provider).toHaveProperty('provider')
      expect(provider).toHaveProperty('skill_id')
      expect(provider).toHaveProperty('endpoint')
      expect(provider).toHaveProperty('auth_env')
      expect(provider).toHaveProperty('param_map')
      expect(provider).toHaveProperty('output_map')
    })

    it('throws for nonexistent model', () => {
      expect(() => resolveModel('nonexistent-model-xyz-999')).toThrow()
    })
  })

  describe('Cross-Provider Registry Verification', () => {
    const originalEnv = { ...process.env }

    afterEach(() => {
      process.env = { ...originalEnv }
    })

    it('registry contains models from all 3 providers', () => {
      const registry = loadRegistry()
      const providers = new Set<string>()
      for (const model of registry) {
        for (const p of model.providers) {
          providers.add(p.provider)
        }
      }
      expect(providers.has('fal-ai')).toBe(true)
      expect(providers.has('replicate')).toBe(true)
      expect(providers.has('wavespeed')).toBe(true)
    })

    it('registry has substantial model counts for each provider', () => {
      const registry = loadRegistry()
      const counts: Record<string, number> = {}
      for (const model of registry) {
        for (const p of model.providers) {
          counts[p.provider] = (counts[p.provider] ?? 0) + 1
        }
      }
      expect(counts['fal-ai']).toBeGreaterThan(100)
      expect(counts['replicate']).toBeGreaterThan(100)
      expect(counts['wavespeed']).toBeGreaterThan(10)
    })

    it('some models have multiple provider bindings (cross-provider)', () => {
      const registry = loadRegistry()
      const crossProviderModels = registry.filter(m => m.providers.length > 1)
      expect(crossProviderModels.length).toBeGreaterThan(0)

      for (const model of crossProviderModels) {
        const providerNames = model.providers.map(p => p.provider)
        const uniqueProviders = new Set(providerNames)
        expect(uniqueProviders.size).toBe(providerNames.length)
      }
    })

    it('listModels({ provider: "replicate" }) returns only replicate models', () => {
      const models = listModels({ provider: 'replicate' })
      expect(models.length).toBeGreaterThan(0)
      for (const model of models) {
        expect(model.providers.some(p => p.provider === 'replicate')).toBe(true)
      }
    })

    it('listModels({ provider: "wavespeed" }) returns only wavespeed models', () => {
      const models = listModels({ provider: 'wavespeed' })
      expect(models.length).toBeGreaterThan(0)
      for (const model of models) {
        expect(model.providers.some(p => p.provider === 'wavespeed')).toBe(true)
      }
    })

    it('resolveModel for a cross-provider model returns multiple bindings', () => {
      const model = resolveModel('bria-eraser')
      expect(model.providers.length).toBeGreaterThan(1)

      const providerNames = model.providers.map(p => p.provider)
      expect(providerNames).toContain('fal-ai')
      expect(providerNames).toContain('replicate')
    })

    it('resolveModel filters providers by available keys', () => {
      const model = resolveModel('bria-eraser', ['replicate'] as ProviderName[])
      expect(model.providers.length).toBe(1)
      expect(model.providers[0].provider).toBe('replicate')
    })

    it('elevenlabs-music has bindings for all 3 providers', () => {
      const model = resolveModel('elevenlabs-music')
      expect(model.providers.length).toBe(3)

      const providerNames = model.providers.map(p => p.provider)
      expect(providerNames).toContain('fal-ai')
      expect(providerNames).toContain('replicate')
      expect(providerNames).toContain('wavespeed')
    })

    it('each binding has valid auth_env matching its provider', () => {
      const registry = loadRegistry()
      const expectedAuthEnv: Record<string, string> = {
        'fal-ai': 'FAL_KEY',
        'replicate': 'REPLICATE_API_TOKEN',
        'wavespeed': 'WAVESPEED_API_KEY',
        'openrouter': 'OPENROUTER_API_KEY',
      }

      for (const model of registry) {
        for (const binding of model.providers) {
          expect(binding.auth_env).toBe(expectedAuthEnv[binding.provider])
        }
      }
    })
  })
})
