import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'

const REGISTRY_FILE = path.resolve(import.meta.dirname ?? __dirname, '..', '..', 'registry', 'registry.json')
const registry: any[] = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'))

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
      for (const a of m.aliases) {
        const owner = seen.get(a)
        if (owner && owner !== m.canonical_name) {
          collisions.push(`"${a}" -> "${owner}" and "${m.canonical_name}"`)
        }
        seen.set(a, m.canonical_name)
      }
    }
    expect(collisions).toEqual([])
  })

  it('has no category field on any model (v2 has no categories)', () => {
    const violations = registry.filter((m: any) => 'category' in m)
    expect(
      violations.map((m: any) => m.canonical_name),
      'These models still have a category field',
    ).toEqual([])
  })

  it('every model has modality with inputs and outputs', () => {
    const violations: string[] = []
    for (const m of registry) {
      if (!m.modality) violations.push(`${m.canonical_name}: missing modality`)
      else {
        if (!Array.isArray(m.modality.inputs) || m.modality.inputs.length === 0) {
          violations.push(`${m.canonical_name}: empty or missing modality.inputs`)
        }
        if (!Array.isArray(m.modality.outputs) || m.modality.outputs.length === 0) {
          violations.push(`${m.canonical_name}: empty or missing modality.outputs`)
        }
      }
    }
    expect(violations).toEqual([])
  })

  it('every model has at least one provider', () => {
    const violations = registry.filter((m: any) => !m.providers || m.providers.length === 0)
    expect(
      violations.map((m: any) => m.canonical_name),
      'These models have no providers',
    ).toEqual([])
  })

  // --- Per-model tests ---
  describe.each(registry.map((m: any) => [m.canonical_name, m]))('%s', (_name: string, model: any) => {
    it('has valid input types', () => {
      for (const input of model.modality.inputs) {
        expect(VALID_INPUT_TYPES).toContain(input)
      }
    })

    it('has valid output types', () => {
      for (const output of model.modality.outputs) {
        expect(VALID_OUTPUT_TYPES).toContain(output)
      }
    })

    it('has valid provider names', () => {
      for (const p of model.providers) {
        expect(VALID_PROVIDERS).toContain(p.provider)
      }
    })

    it('has non-empty endpoint on every provider', () => {
      for (const p of model.providers) {
        expect(p.endpoint, `${p.provider} endpoint is empty`).toBeTruthy()
      }
    })

    it('has auth_env on every provider', () => {
      for (const p of model.providers) {
        expect(p.auth_env, `${p.provider} missing auth_env`).toBeTruthy()
      }
    })

    it('has non-empty extract_path on every provider', () => {
      for (const p of model.providers) {
        expect(p.output_map.extract_path, `${p.provider} extract_path is empty`).toBeTruthy()
      }
    })

    it('has valid output_map.type on every provider', () => {
      for (const p of model.providers) {
        expect(VALID_OUTPUT_TYPES).toContain(p.output_map.type)
      }
    })

    it('has param_map as an object on every provider', () => {
      for (const p of model.providers) {
        expect(typeof p.param_map).toBe('object')
        expect(p.param_map).not.toBeNull()
      }
    })

    it('param_map values are strings or string arrays', () => {
      for (const p of model.providers) {
        for (const [key, val] of Object.entries(p.param_map)) {
          const valid = typeof val === 'string' || (Array.isArray(val) && val.every((v: any) => typeof v === 'string'))
          expect(valid, `${p.provider} param_map["${key}"] is invalid: ${JSON.stringify(val)}`).toBe(true)
        }
      }
    })

    it('output_map.type is consistent with modality.outputs', () => {
      for (const p of model.providers) {
        const outputType = p.output_map.type
        // segmentation output_map.type maps to 'image' in modality
        const expectedModalityOutput = outputType === 'segmentation' ? 'image' : outputType
        expect(
          model.modality.outputs,
          `output_map.type="${outputType}" but modality.outputs=[${model.modality.outputs}]`,
        ).toContain(expectedModalityOutput)
      }
    })
  })
})
