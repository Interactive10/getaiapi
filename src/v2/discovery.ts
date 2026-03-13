import type { ModelEntryV2, ListModelsFiltersV2 } from './types.js'
import { loadRegistry } from './registry.js'

/**
 * Lists models filtered by modality, provider, or text query.
 * Category is derived, not stored — filter by input/output modality instead.
 */
export function listModels(filters?: ListModelsFiltersV2): ModelEntryV2[] {
  let models = loadRegistry()

  if (filters?.input) {
    models = models.filter(m => m.modality.inputs.includes(filters.input!))
  }

  if (filters?.output) {
    models = models.filter(m => m.modality.outputs.includes(filters.output!))
  }

  if (filters?.provider) {
    models = models.filter(m =>
      m.providers.some(p => p.provider === filters.provider),
    )
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase()
    models = models.filter(
      m =>
        m.canonical_name.includes(q) ||
        m.aliases.some(a => a.includes(q)),
    )
  }

  return models
}

/**
 * Derives a display category label from modality.
 * e.g., inputs=["text"], outputs=["image"] → "text-to-image"
 * e.g., inputs=["image","text"], outputs=["video"] → "image,text-to-video"
 */
export function deriveCategory(model: ModelEntryV2): string {
  const inputs = model.modality.inputs.join(',')
  const outputs = model.modality.outputs.join(',')
  return `${inputs}-to-${outputs}`
}
