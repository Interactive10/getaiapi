import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'

const REGISTRY_FILE = path.resolve(import.meta.dirname ?? __dirname, '..', '..', 'registry', 'registry.json')
const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'))

// What each category expects
const CATEGORY_RULES: Record<string, {
  requiredInputs: string[]
  outputType: string
  contentType: string
}> = {
  'text-to-image':      { requiredInputs: ['text'],          outputType: 'image',        contentType: 'image/png' },
  'image-to-image':     { requiredInputs: ['image'],         outputType: 'image',        contentType: 'image/png' },
  'image-edit':         { requiredInputs: ['image'],         outputType: 'image',        contentType: 'image/png' },
  'text-to-video':      { requiredInputs: ['text'],          outputType: 'video',        contentType: 'video/mp4' },
  'image-to-video':     { requiredInputs: ['image'],         outputType: 'video',        contentType: 'video/mp4' },
  'video-to-video':     { requiredInputs: ['video'],         outputType: 'video',        contentType: 'video/mp4' },
  'text-to-audio':      { requiredInputs: ['text'],          outputType: 'audio',        contentType: 'audio/mpeg' },
  'audio-to-text':      { requiredInputs: ['audio'],         outputType: 'text',         contentType: 'text/plain' },
  'video-to-audio':     { requiredInputs: ['video'],         outputType: 'audio',        contentType: 'audio/mpeg' },
  'audio-to-video':     { requiredInputs: ['audio'],         outputType: 'video',        contentType: 'video/mp4' },
  'audio-to-audio':     { requiredInputs: ['audio'],         outputType: 'audio',        contentType: 'audio/mpeg' },
  'audio-edit':         { requiredInputs: ['audio'],         outputType: 'audio',        contentType: 'audio/mpeg' },
  'text-to-3d':         { requiredInputs: ['text'],          outputType: '3d',           contentType: 'model/gltf-binary' },
  'image-to-3d':        { requiredInputs: ['image'],         outputType: '3d',           contentType: 'model/gltf-binary' },
  'upscale-image':      { requiredInputs: ['image'],         outputType: 'image',        contentType: 'image/png' },
  'upscale-video':      { requiredInputs: ['video'],         outputType: 'video',        contentType: 'video/mp4' },
  'remove-background':  { requiredInputs: ['image'],         outputType: 'image',        contentType: 'image/png' },
  'segmentation':       { requiredInputs: ['image'],         outputType: 'segmentation', contentType: 'image/png' },
  'text-generation':    { requiredInputs: ['text'],          outputType: 'text',         contentType: 'text/plain' },
  'moderation':         { requiredInputs: [],                outputType: 'text',         contentType: 'text/plain' },
  'training':           { requiredInputs: [],                outputType: 'text',         contentType: 'text/plain' },
  'voice-clone':        { requiredInputs: ['audio'],         outputType: 'text',         contentType: 'text/plain' },
  'doc-to-text':        { requiredInputs: [],                outputType: 'text',         contentType: 'text/plain' },
  'image-to-text':      { requiredInputs: ['image'],         outputType: 'text',         contentType: 'text/plain' },
  'video-to-text':      { requiredInputs: ['video'],         outputType: 'text',         contentType: 'text/plain' },
}

const VALID_CATEGORIES = Object.keys(CATEGORY_RULES)
const VALID_PROVIDERS = ['fal-ai', 'replicate', 'wavespeed', 'openrouter']
const VALID_OUTPUT_TYPES = ['image', 'video', 'audio', 'text', '3d', 'segmentation']
const VALID_INPUT_TYPES = ['text', 'image', 'audio', 'video']

describe('Registry integrity — every model in registry.json', () => {
  it('has no duplicate canonical names', () => {
    const names = registry.map((m: any) => m.canonical_name)
    const dupes = names.filter((n: string, i: number) => names.indexOf(n) !== i)
    expect(dupes).toEqual([])
  })

  it('has no alias collisions across models', () => {
    const seen = new Map<string, string>()
    const collisions: string[] = []
    for (const m of registry) {
      for (const a of (m as any).aliases) {
        const owner = seen.get(a)
        if (owner && owner !== (m as any).canonical_name) {
          collisions.push(`"${a}" -> "${owner}" and "${(m as any).canonical_name}"`)
        }
        seen.set(a, (m as any).canonical_name)
      }
    }
    expect(collisions).toEqual([])
  })

  // --- Per-category tests: verify every category's models have correct inputs & outputs ---
  const categoriesFile = path.resolve(import.meta.dirname ?? __dirname, '..', '..', 'registry', 'categories.json')
  const categoryCounts: Record<string, number> = JSON.parse(fs.readFileSync(categoriesFile, 'utf-8'))

  const modelsByCategory = new Map<string, any[]>()
  for (const m of registry) {
    const cat = (m as any).category
    if (!modelsByCategory.has(cat)) modelsByCategory.set(cat, [])
    modelsByCategory.get(cat)!.push(m)
  }

  describe('Category coverage', () => {
    it('every category in CATEGORY_RULES exists in categories.json', () => {
      const missing = Object.keys(CATEGORY_RULES).filter(c => !(c in categoryCounts))
      expect(missing, `categories.json is missing: ${missing.join(', ')}`).toEqual([])
    })

    it('every category in categories.json has rules defined', () => {
      const missing = Object.keys(categoryCounts).filter(c => !CATEGORY_RULES[c])
      expect(missing, `CATEGORY_RULES is missing: ${missing.join(', ')}`).toEqual([])
    })
  })

  describe.each(Object.entries(CATEGORY_RULES))('Category: %s', (category, rules) => {
    const models = modelsByCategory.get(category) ?? []

    it('has at least one model in the registry or is a placeholder (count=0)', () => {
      if (categoryCounts[category] === 0 && models.length === 0) return // placeholder category, skip
      expect(models.length, `no models found for category "${category}"`).toBeGreaterThan(0)
    })

    it('all models have correct modality inputs', () => {
      const violations: string[] = []
      for (const m of models) {
        for (const req of rules.requiredInputs) {
          if (!m.modality.inputs.includes(req)) {
            violations.push(`${m.canonical_name}: missing "${req}" in inputs (has [${m.modality.inputs}])`)
          }
        }
      }
      expect(violations).toEqual([])
    })

    it('all models have correct modality output type', () => {
      const violations: string[] = []
      for (const m of models) {
        for (const p of m.providers) {
          if (p.output_map.type !== rules.outputType) {
            violations.push(`${m.canonical_name} (${p.provider}): output_map.type="${p.output_map.type}", expected "${rules.outputType}"`)
          }
        }
      }
      expect(violations).toEqual([])
    })

    it('all models have correct output content_type', () => {
      const violations: string[] = []
      for (const m of models) {
        for (const p of m.providers) {
          if (p.output_map.content_type !== rules.contentType) {
            violations.push(`${m.canonical_name} (${p.provider}): content_type="${p.output_map.content_type}", expected "${rules.contentType}"`)
          }
        }
      }
      expect(violations).toEqual([])
    })

    it('all models have modality outputs matching the category output', () => {
      const expectedOutput = rules.outputType === 'segmentation' ? 'image' : rules.outputType
      const violations: string[] = []
      for (const m of models) {
        if (!m.modality.outputs.includes(expectedOutput)) {
          violations.push(`${m.canonical_name}: modality.outputs=[${m.modality.outputs}], expected to contain "${expectedOutput}"`)
        }
      }
      expect(violations).toEqual([])
    })
  })

  // --- Per-model tests ---
  describe.each(registry.map((m: any) => [m.canonical_name, m]))('%s', (_name: string, model: any) => {
    it('has a valid category', () => {
      expect(VALID_CATEGORIES).toContain(model.category)
    })

    it('has at least one provider', () => {
      expect(model.providers.length).toBeGreaterThan(0)
    })

    it('has non-empty endpoint on every provider', () => {
      for (const p of model.providers) {
        expect(p.endpoint, `${p.provider} endpoint is empty`).toBeTruthy()
      }
    })

    it('has valid provider names', () => {
      for (const p of model.providers) {
        expect(VALID_PROVIDERS, `unknown provider: ${p.provider}`).toContain(p.provider)
      }
    })

    it('modality inputs are valid types', () => {
      for (const input of model.modality.inputs) {
        expect(VALID_INPUT_TYPES).toContain(input)
      }
    })

    it('modality outputs are valid types', () => {
      for (const output of model.modality.outputs) {
        expect(VALID_OUTPUT_TYPES).toContain(output)
      }
    })

    it('modality inputs contain what the category requires', () => {
      const rules = CATEGORY_RULES[model.category]
      if (!rules) return
      for (const req of rules.requiredInputs) {
        expect(model.modality.inputs, `category "${model.category}" requires "${req}" in inputs`).toContain(req)
      }
    })

    it('output_map.type matches category on every provider', () => {
      const rules = CATEGORY_RULES[model.category]
      if (!rules) return
      for (const p of model.providers) {
        expect(p.output_map.type, `${p.provider} output_map.type should be "${rules.outputType}"`).toBe(rules.outputType)
      }
    })

    it('output_map.content_type matches category on every provider', () => {
      const rules = CATEGORY_RULES[model.category]
      if (!rules) return
      for (const p of model.providers) {
        expect(p.output_map.content_type, `${p.provider} content_type should be "${rules.contentType}"`).toBe(rules.contentType)
      }
    })

    it('has non-empty extract_path on every provider', () => {
      for (const p of model.providers) {
        expect(p.output_map.extract_path, `${p.provider} extract_path is empty`).toBeTruthy()
      }
    })

    it('has auth_env on every provider', () => {
      for (const p of model.providers) {
        expect(p.auth_env, `${p.provider} missing auth_env`).toBeTruthy()
      }
    })
  })
})
