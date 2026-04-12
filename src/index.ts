// ── v2 Providers ─────────────────────────────────────────────────────────────
export { kling, createClient, KlingClient } from './providers/kling/index.js'
export type {
  TextToVideoInput, ImageToVideoInput, OmniVideoInput,
  ImageGenerationInput, OmniImageInput, VirtualTryOnInput,
  AvatarInput, LipSyncInput, EffectsInput, MotionControlInput,
  TtsInput, VideoToAudioInput, TextToAudioInput, CreateVoiceInput,
  MultiShotInput, ReferenceToImageInput, ExpandImageInput,
  ExtendVideoInput, IdentifyFaceInput, ImageRecognizeInput,
  ReferenceToVideoInput,
  KlingVideoResult, KlingImageResult, KlingAudioResult, KlingJsonResult,
  KlingConfig,
} from './providers/kling/index.js'
export {
  KlingError, KlingAuthError, KlingRateLimitError,
  KlingApiError, KlingTimeoutError, KlingTaskFailedError,
  generateJwt,
} from './providers/kling/index.js'

/**
 * @deprecated All exports below are from the deprecated v1 library.
 * New code should not import from this module.
 */
export {
  generate,
  submit,
  poll,
  submitAndPoll,
  configure,
  configureAuth,
  configureFetch,
  listModels,
  deriveCategory,
  resolveModel,
  loadRegistry,
  clearRegistryCache,
  mapInput,
  mapOutput,
  configureStorage,
  uploadAsset,
  deleteAsset,
  presignAsset,
  klingAdapter,
  GetAIApiError,
  AuthError,
  ModelNotFoundError,
  NoProviderError,
  ValidationError,
  ProviderError,
  TimeoutError,
  RateLimitError,
  StorageError,
} from '../deprecated/src/index.js'

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
  KlingOptions,
  KlingVideoModel,
  KlingImageModel,
  KlingCameraControl,
  FetchLogEntry,
  LogFn,
  FetchOptions,
} from '../deprecated/src/index.js'
