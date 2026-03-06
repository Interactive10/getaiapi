// Re-export the main function
export { generate } from './gateway.js'

// Discovery functions
export { listModels, getModel } from "./discovery.js";
export type { ListModelsFilters } from "./discovery.js";

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
} from "./errors.js";
