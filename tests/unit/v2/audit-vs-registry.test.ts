import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'

const REGISTRY_FILE = path.resolve(import.meta.dirname ?? __dirname, '..', '..', '..', 'registry', 'v2', 'registry.json')
const AUDIT_FILE = path.resolve(import.meta.dirname ?? __dirname, '..', '..', '..', 'docs', 'combined-audit.md')

const registry: any[] = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'))
const auditLines = fs.readFileSync(AUDIT_FILE, 'utf-8').split('\n')

// Build lookup: skill_id -> { model, provider }
const registryBySkillId = new Map<string, { model: any; provider: any }>()
for (const model of registry) {
  for (const p of model.providers) {
    registryBySkillId.set(p.skill_id, { model, provider: p })
  }
}

// Parse audit table
interface AuditEntry {
  skill_id: string
  inputs: string[]
  output: string
  provider: string
  confidence: string
}

const auditEntries: AuditEntry[] = auditLines
  .slice(2)
  .filter(line => line.trim().startsWith('|'))
  .map(line => {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean)
    if (cols.length < 4) return null
    return {
      skill_id: cols[0],
      inputs: cols[1].split(',').map(s => s.trim()).filter(Boolean),
      output: cols[2],
      provider: cols[3],
      confidence: cols[4] ?? '',
    }
  })
  .filter((e): e is AuditEntry => e !== null)

describe('V2 Registry vs Combined Audit (modality-based)', () => {
  it.each(auditEntries.map(e => [e.skill_id, e]))(
    '%s matches audit expectations',
    (_skillId, entry) => {
      const auditEntry = entry as AuditEntry
      const match = registryBySkillId.get(auditEntry.skill_id)

      // Skip if skill not in registry
      if (!match) return

      const { model, provider } = match
      const errors: string[] = []

      // Check provider matches
      if (provider.provider !== auditEntry.provider) {
        errors.push(
          `provider: registry="${provider.provider}", audit="${auditEntry.provider}"`,
        )
      }

      // Check inputs — filter to standard modality types
      const standardTypes = new Set(['text', 'image', 'audio', 'video'])
      const auditInputs = auditEntry.inputs
        .filter(i => standardTypes.has(i))
        .sort()
      const registryInputs = [...model.modality.inputs].sort()

      for (const input of auditInputs) {
        if (!registryInputs.includes(input)) {
          errors.push(
            `missing input "${input}": registry has [${registryInputs}], audit expects [${auditInputs}]`,
          )
        }
      }

      // Check output type — using modality instead of category
      const auditOutput = auditEntry.output
      if (standardTypes.has(auditOutput)) {
        const registryOutputs = model.modality.outputs as string[]
        if (!registryOutputs.includes(auditOutput)) {
          errors.push(
            `output mismatch: registry has [${registryOutputs}], audit expects "${auditOutput}"`,
          )
        }
      }

      expect(errors, errors.join('\n')).toEqual([])
    },
  )
})
