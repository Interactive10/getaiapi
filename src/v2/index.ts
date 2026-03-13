// V2 Public API — Modality-First Architecture

export { generate } from './gateway.js'
export { listModels, deriveCategory } from './discovery.js'
export { resolveModel, loadRegistry, clearRegistryCache } from './registry.js'
export { mapInput, mapOutput } from './mapper.js'

export type {
  ModelEntryV2,
  ProviderBindingV2,
  OutputMapping,
  GenerateRequestV2,
  GenerateResponseV2,
  OutputItemV2,
  ListModelsFiltersV2,
  InputType,
  OutputType,
  ProviderName,
} from './types.js'
