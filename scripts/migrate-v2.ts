#!/usr/bin/env npx tsx
/**
 * Migration script: generates registry/v2/registry.json from v1 data.
 *
 * For each model:
 * 1. Reads the category → looks up the category template's input_mappings
 * 2. For each provider binding, populates param_map from the template
 * 3. Drops the category field
 * 4. Writes to registry/v2/registry.json
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

// --- Load all category templates ---
// We import them directly from the source files

import { textToImageTemplate } from '../src/categories/text-to-image.js'
import { imageEditTemplate } from '../src/categories/image-edit.js'
import { textToVideoTemplate } from '../src/categories/text-to-video.js'
import { imageToVideoTemplate } from '../src/categories/image-to-video.js'
import { upscaleImageTemplate } from '../src/categories/upscale-image.js'
import { textToAudioTemplate } from '../src/categories/text-to-audio.js'
import { audioToTextTemplate } from '../src/categories/audio-to-text.js'
import { removeBackgroundTemplate } from '../src/categories/remove-background.js'
import { textGenerationTemplate } from '../src/categories/text-generation.js'
import { imageToImageTemplate } from '../src/categories/image-to-image.js'
import { textTo3dTemplate } from '../src/categories/text-to-3d.js'
import { imageTo3dTemplate } from '../src/categories/image-to-3d.js'
import { upscaleVideoTemplate } from '../src/categories/upscale-video.js'
import { videoToAudioTemplate } from '../src/categories/video-to-audio.js'
import { videoToVideoTemplate } from '../src/categories/video-to-video.js'
import { segmentationTemplate } from '../src/categories/segmentation.js'
import { moderationTemplate } from '../src/categories/moderation.js'
import { trainingTemplate } from '../src/categories/training.js'
import { docToTextTemplate } from '../src/categories/doc-to-text.js'
import { imageToTextTemplate } from '../src/categories/image-to-text.js'
import { videoToTextTemplate } from '../src/categories/video-to-text.js'
import type { CategoryTemplate, ProviderName } from '../src/types.js'

const templates: Record<string, CategoryTemplate> = {
  'text-to-image': textToImageTemplate,
  'image-edit': imageEditTemplate,
  'text-to-video': textToVideoTemplate,
  'image-to-video': imageToVideoTemplate,
  'upscale-image': upscaleImageTemplate,
  'text-to-audio': textToAudioTemplate,
  'audio-to-text': audioToTextTemplate,
  'remove-background': removeBackgroundTemplate,
  'text-generation': textGenerationTemplate,
  'image-to-image': imageToImageTemplate,
  'text-to-3d': textTo3dTemplate,
  'image-to-3d': imageTo3dTemplate,
  'upscale-video': upscaleVideoTemplate,
  'video-to-audio': videoToAudioTemplate,
  'video-to-video': videoToVideoTemplate,
  'segmentation': segmentationTemplate,
  'moderation': moderationTemplate,
  'training': trainingTemplate,
  'doc-to-text': docToTextTemplate,
  'image-to-text': imageToTextTemplate,
  'video-to-text': videoToTextTemplate,
}

// --- Load v1 registry ---
const projectRoot = path.resolve(import.meta.dirname ?? __dirname, '..')
const v1Path = path.join(projectRoot, 'registry', 'registry.json')
const v1Registry: any[] = JSON.parse(fs.readFileSync(v1Path, 'utf-8'))

// --- Build param_map for a provider from a category template ---
function buildParamMap(
  template: CategoryTemplate,
  provider: ProviderName,
): Record<string, string | string[]> {
  const paramMap: Record<string, string | string[]> = {}

  for (const mapping of template.input_mappings) {
    const providerKey = mapping.providers[provider]
    if (providerKey === undefined) continue
    paramMap[mapping.universal] = providerKey
  }

  return paramMap
}

// --- Migrate ---
interface V2ModelEntry {
  canonical_name: string
  aliases: string[]
  modality: {
    inputs: string[]
    outputs: string[]
  }
  providers: Array<{
    provider: string
    skill_id: string
    endpoint: string
    auth_env: string
    param_map: Record<string, string | string[]>
    output_map: {
      type: string
      extract_path: string
      content_type?: string
    }
  }>
}

const v2Registry: V2ModelEntry[] = []
let noTemplateCount = 0
const noTemplateCategories = new Set<string>()

for (const model of v1Registry) {
  const template = templates[model.category]

  const v2Entry: V2ModelEntry = {
    canonical_name: model.canonical_name,
    aliases: model.aliases,
    modality: model.modality,
    providers: model.providers.map((p: any) => {
      let paramMap: Record<string, string | string[]> = {}

      if (template) {
        paramMap = buildParamMap(template, p.provider as ProviderName)
      } else {
        noTemplateCount++
        noTemplateCategories.add(model.category)
      }

      return {
        provider: p.provider,
        skill_id: p.skill_id,
        endpoint: p.endpoint,
        auth_env: p.auth_env,
        param_map: paramMap,
        output_map: p.output_map,
      }
    }),
  }

  v2Registry.push(v2Entry)
}

// --- Write output ---
const outPath = path.join(projectRoot, 'registry', 'v2', 'registry.json')
fs.writeFileSync(outPath, JSON.stringify(v2Registry, null, 2) + '\n')

console.log(`✓ Migrated ${v2Registry.length} models to ${outPath}`)
if (noTemplateCount > 0) {
  console.log(`⚠ ${noTemplateCount} provider bindings had no template (categories: ${[...noTemplateCategories].join(', ')})`)
  console.log('  These entries have empty param_map — they still work via options passthrough')
}

// --- Stats ---
let totalWithParamMap = 0
let totalEmpty = 0
for (const m of v2Registry) {
  for (const p of m.providers) {
    if (Object.keys(p.param_map).length > 0) totalWithParamMap++
    else totalEmpty++
  }
}
console.log(`\nParam map stats:`)
console.log(`  Populated: ${totalWithParamMap}`)
console.log(`  Empty: ${totalEmpty}`)
