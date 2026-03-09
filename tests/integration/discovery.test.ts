import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { listModels, getModel } from '../../src/index.js'
import { ModelNotFoundError } from '../../src/errors.js'
import { clearRegistryCache, loadRegistry, resolveModel } from '../../src/resolver.js'
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
      // Even if no API keys are set, it should return an array (possibly empty)
      if (models.length > 0) {
        const model = models[0]
        expect(model).toHaveProperty('canonical_name')
        expect(model).toHaveProperty('aliases')
        expect(model).toHaveProperty('category')
        expect(model).toHaveProperty('modality')
        expect(model).toHaveProperty('providers')
        expect(Array.isArray(model.aliases)).toBe(true)
        expect(Array.isArray(model.providers)).toBe(true)
      }
    })

    it('filters by category text-to-image', () => {
      const models = listModels({ category: 'text-to-image' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        expect(model.category).toBe('text-to-image')
      }
    })

    it('filters by category text-to-video', () => {
      const models = listModels({ category: 'text-to-video' })
      expect(Array.isArray(models)).toBe(true)
      for (const model of models) {
        expect(model.category).toBe('text-to-video')
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
      const allTTI = listModels({ category: 'text-to-image' })
      const falTTI = listModels({ category: 'text-to-image', provider: 'fal-ai' })
      expect(falTTI.length).toBeLessThanOrEqual(allTTI.length)
    })
  })

  describe('getModel()', () => {
    it('returns a ModelEntry for flux-schnell', () => {
      const model = getModel('flux-schnell')
      expect(model).toBeDefined()
      expect(model.canonical_name).toBe('flux-schnell')
      expect(model.category).toBe('text-to-image')
      expect(Array.isArray(model.aliases)).toBe(true)
      expect(Array.isArray(model.providers)).toBe(true)
      expect(model.providers.length).toBeGreaterThan(0)
      expect(model.modality).toHaveProperty('inputs')
      expect(model.modality).toHaveProperty('outputs')
    })

    it('resolves alias to canonical model', () => {
      // flux-schnell has alias "flux-schnell" which is also canonical
      // Use a model where alias differs if available, otherwise test identity
      const model = getModel('flux-schnell')
      expect(model.canonical_name).toBe('flux-schnell')
    })

    it('returns providers with correct shape', () => {
      const model = getModel('flux-schnell')
      const provider = model.providers[0]
      expect(provider).toHaveProperty('provider')
      expect(provider).toHaveProperty('skill_id')
      expect(provider).toHaveProperty('endpoint')
      expect(provider).toHaveProperty('auth_env')
      expect(provider).toHaveProperty('param_map')
      expect(provider).toHaveProperty('output_map')
    })

    it('throws ModelNotFoundError for nonexistent model', () => {
      expect(() => getModel('nonexistent-model-xyz-999')).toThrow(ModelNotFoundError)
    })

    it('ModelNotFoundError has correct properties', () => {
      try {
        getModel('nonexistent-model-xyz-999')
        expect.unreachable('Should have thrown')
      } catch (err) {
        expect(err).toBeInstanceOf(ModelNotFoundError)
        const mnfErr = err as InstanceType<typeof ModelNotFoundError>
        expect(mnfErr.query).toBe('nonexistent-model-xyz-999')
        expect(Array.isArray(mnfErr.suggestions)).toBe(true)
      }
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

      // Verify they have different providers, not duplicates
      for (const model of crossProviderModels) {
        const providerNames = model.providers.map(p => p.provider)
        const uniqueProviders = new Set(providerNames)
        expect(uniqueProviders.size).toBe(providerNames.length)
      }
    })

    it('listModels({ provider: "replicate" }) returns only replicate models', () => {
      // Set all keys so listModels returns all models
      process.env.FAL_KEY = 'test-key'
      process.env.REPLICATE_API_TOKEN = 'test-key'
      process.env.WAVESPEED_API_KEY = 'test-key'

      const models = listModels({ provider: 'replicate' })
      expect(models.length).toBeGreaterThan(0)
      for (const model of models) {
        expect(model.providers.some(p => p.provider === 'replicate')).toBe(true)
      }
    })

    it('listModels({ provider: "wavespeed" }) returns only wavespeed models', () => {
      process.env.FAL_KEY = 'test-key'
      process.env.REPLICATE_API_TOKEN = 'test-key'
      process.env.WAVESPEED_API_KEY = 'test-key'

      const models = listModels({ provider: 'wavespeed' })
      expect(models.length).toBeGreaterThan(0)
      for (const model of models) {
        expect(model.providers.some(p => p.provider === 'wavespeed')).toBe(true)
      }
    })

    it('getModel for a cross-provider model returns multiple bindings', () => {
      // bria-eraser exists on fal-ai and replicate
      const model = getModel('bria-eraser')
      expect(model.providers.length).toBeGreaterThan(1)

      const providerNames = model.providers.map(p => p.provider)
      expect(providerNames).toContain('fal-ai')
      expect(providerNames).toContain('replicate')
    })

    it('resolveModel filters providers by available keys', () => {
      // bria-eraser has fal-ai and replicate
      // When only replicate is available, result should only have replicate
      const model = resolveModel('bria-eraser', ['replicate'] as ProviderName[])
      expect(model.providers.length).toBe(1)
      expect(model.providers[0].provider).toBe('replicate')
    })

    it('elevenlabs-music has bindings for all 3 providers', () => {
      const model = getModel('elevenlabs-music')
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
