// Public API — Modality-First Architecture

// Generation
export { generate, submit, poll, submitAndPoll } from './gateway.js'

// Configuration
export { configure } from './configure.js'
export { configureAuth } from './auth.js'

// Discovery
export { listModels, deriveCategory } from './discovery.js'
export { resolveModel, loadRegistry, clearRegistryCache } from './registry.js'

// Mapper (advanced use)
export { mapInput, mapOutput } from './mapper.js'

// Storage
export { configureStorage, uploadAsset, deleteAsset, presignAsset } from './storage.js'

// Types
export type {
  ModelEntry,
  ProviderBinding,
  OutputMapping,
  GenerateRequest,
  GenerateResponse,
  SubmitResponse,
  PollResponse,
  OutputItem,
  ListModelsFilters,
  InputType,
  OutputType,
  ProviderName,
  ProviderAdapter,
  ProviderResponse,
  ConfigureOptions,
  StorageConfig,
  UploadResult,
  UploadOptions,
} from './types.js'

// Errors
export {
  GetAIApiError,
  AuthError,
  ModelNotFoundError,
  NoProviderError,
  ValidationError,
  ProviderError,
  TimeoutError,
  RateLimitError,
  StorageError,
} from './errors.js'
