import type { KlingConfig } from './types.js'
import { KlingClient } from './client.js'
import { createModels } from './models.js'

export type { KlingConfig } from './types.js'
export type {
  TextToVideoInput, ImageToVideoInput, OmniVideoInput,
  ImageGenerationInput, OmniImageInput, VirtualTryOnInput,
  AvatarInput, LipSyncInput, EffectsInput, MotionControlInput,
  TtsInput, VideoToAudioInput, TextToAudioInput, CreateVoiceInput,
  MultiShotInput, ReferenceToImageInput, ExpandImageInput,
  ExtendVideoInput, IdentifyFaceInput, ImageRecognizeInput,
  ReferenceToVideoInput, AccountCostsInput, AccountCostsResult, ResourcePackInfo,
  CreateElementInput, ElementResult, ElementListInput, ElementListResult, DeleteElementInput, ElementTag,
  KlingVideoResult, KlingImageResult, KlingAudioResult, KlingJsonResult,
  KlingFaceResult, KlingMultiShotResult, KlingVoiceResult, KlingVideoAudioResult,
  KlingListParams, KlingVoiceListResult, KlingTaskListResult, VoiceInfo,
  MultiElementsInitInput, MultiElementsInitResult, MultiElementsPoint,
  MultiElementsAddSelectionInput, MultiElementsSelectionResult,
  MultiElementsDeleteSelectionInput, MultiElementsClearSelectionInput,
  MultiElementsPreviewInput, MultiElementsPreviewResult,
  MultiElementsGenerateInput,
} from './types.js'
export {
  KlingError, KlingAuthError, KlingRateLimitError,
  KlingApiError, KlingTimeoutError, KlingTaskFailedError,
} from './errors.js'
export { generateJwt } from './auth.js'
export { KlingClient } from './client.js'

/** Creates an isolated Kling client with its own credentials and settings. */
export function createClient(config: KlingConfig) {
  const client = new KlingClient()
  client.configure(config)
  return {
    configure: (c: KlingConfig) => client.configure(c),
    ...createModels(client),
  }
}

// Default instance — uses env vars unless configure() is called.
const defaultClient = new KlingClient()

export const kling = {
  configure: (config: KlingConfig) => defaultClient.configure(config),
  ...createModels(defaultClient),
}
