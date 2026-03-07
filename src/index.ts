// Re-export the main function
export { generate } from './gateway.js'

// Configuration
export { configure } from "./configure.js";
export { configureAuth } from "./auth.js";

// Discovery functions
export { listModels, getModel } from "./discovery.js";
export type { ListModelsFilters } from "./discovery.js";

// Storage functions
export { configureStorage, uploadAsset, deleteAsset, presignAsset } from "./storage.js";

// Re-export types
export type {
  GenerateRequest,
  GenerateResponse,
  OutputItem,
  OutputType,
  ModelCategory,
  ProviderName,
  ModelEntry,
  ProviderBinding,
  ConfigureOptions,
  StorageConfig,
  UploadResult,
  UploadOptions,
} from "./types.js";

// Re-export errors
export {
  GetAIApiError,
  AuthError,
  ModelNotFoundError,
  ValidationError,
  ProviderError,
  TimeoutError,
  RateLimitError,
  StorageError,
} from "./errors.js";
