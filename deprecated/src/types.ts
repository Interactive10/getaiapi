// === Modality-First Architecture ===
// No category field — modality is the source of truth.
// Each provider binding is self-contained with its own param_map.

export type OutputType = 'image' | 'video' | 'audio' | 'text' | '3d' | 'segmentation'
export type InputType = 'text' | 'image' | 'audio' | 'video'
export type ProviderName = 'fal-ai' | 'replicate' | 'wavespeed' | 'openrouter' | 'kling'

export interface ModelEntry {
  canonical_name: string
  aliases: string[]
  modality: {
    inputs: InputType[]
    outputs: OutputType[]
  }
  providers: ProviderBinding[]
}

export interface ProviderBinding {
  provider: ProviderName
  skill_id: string
  endpoint: string
  auth_env: string
  param_map: Record<string, string | string[]>
  defaults?: Record<string, unknown>
  output_map: OutputMapping
}

export interface OutputMapping {
  type: OutputType
  extract_path: string
  content_type?: string
}

// === Provider-Scoped Options ===

/**
 * Resolves the options type based on provider.
 * When provider is specified, narrows options to provider-specific type.
 */
export type ProviderOptionsFor<P extends ProviderName = ProviderName> =
  P extends 'kling' ? KlingOptions :
  Record<string, unknown>

// === Request / Response ===

/**
 * Universal input for generate/submit.
 * Generic P narrows options by provider for type safety.
 * Without a generic, options accepts any Record<string, unknown>.
 */
export interface GenerateRequest<P extends ProviderName = ProviderName> {
  model: string
  provider?: P
  prompt?: string
  image?: string | File
  images?: (string | File)[]
  audio?: string | File
  video?: string | File
  negative_prompt?: string
  count?: number
  size?: string | { width: number; height: number }
  seed?: number
  guidance?: number
  steps?: number
  strength?: number
  format?: 'png' | 'jpeg' | 'webp' | 'mp4' | 'mp3' | 'wav' | 'obj' | 'glb'
  quality?: number
  safety?: boolean
  duration?: string
  options?: ProviderOptionsFor<P>
}

// === Kling Provider Options ===

export type KlingVideoModel =
  | 'kling-v1' | 'kling-v1-5' | 'kling-v1-6'
  | 'kling-v2-master' | 'kling-v2-1' | 'kling-v2-1-master'
  | 'kling-v2-5-turbo' | 'kling-v2-6'
  | 'kling-v3' | 'kling-v3-omni'
  | 'kling-video-o1'

export type KlingImageModel =
  | 'kling-v1' | 'kling-v1-5' | 'kling-v2' | 'kling-v2-1'
  | 'kling-v3' | 'kling-v3-omni' | 'kling-v3-remaster'
  | 'kling-image-o1' | 'kling-image-o3'

export interface KlingCameraControl {
  type: 'simple' | 'combined'
  config?: {
    horizontal?: number
    vertical?: number
    pan?: number
    tilt?: number
    roll?: number
    zoom?: number
  }
}

export interface KlingOptions {
  /** Model version for video/image generation. */
  model_name?: KlingVideoModel | KlingImageModel | string
  /** Quality mode — 'std' (standard) or 'pro'. */
  mode?: 'std' | 'pro'
  /** Enable audio generation on video output. */
  sound?: 'on' | 'off'
  /** Camera movement control. */
  camera_control?: KlingCameraControl
  /** Enable storyboard multi-shot mode. */
  multi_shot?: boolean
  /** Shot generation method when multi_shot is true. */
  shot_type?: 'customize' | 'intelligence'
  /** Per-shot prompt descriptions for multi-shot mode. */
  multi_prompt?: Array<{ prompt: string }>
  /** Aspect ratio for output (e.g., '16:9', '9:16', '1:1'). */
  aspect_ratio?: string
  /** Image resolution for image generation. */
  resolution?: '1k' | '2k' | '4k'
  /** Image reference mode for image generation. */
  image_reference?: 'subject' | 'face'
  /** Image reference fidelity [0, 1]. */
  image_fidelity?: number
  /** Human face similarity [0, 1]. */
  human_fidelity?: number
  /** Reference elements list. */
  element_list?: Array<{ id: string; image: string }>
  /** End frame image for image-to-video. */
  image_tail?: string
  /** Static brush mask for image-to-video. */
  static_mask?: string
  /** Motion brush masks for image-to-video. */
  dynamic_masks?: Array<{ mask: string; trajectory: Array<{ x: number; y: number }> }>
  /** Clothing image for virtual try-on. */
  cloth_image?: string
  /** Video effects scene name (e.g., 'flash_drive', 'hug', 'kiss_pro'). */
  effect_scene?: string
  /** TTS voice identifier. */
  voice_id?: string
  /** TTS language code. */
  voice_language?: 'zh' | 'en' | string
  /** TTS speech rate [0.8, 2.0]. */
  voice_speed?: number
  /** Custom voice name for voice cloning (max 20 chars). */
  voice_name?: string
  /** Expansion ratios for image outpainting [0, 2]. */
  up_expansion_ratio?: number
  down_expansion_ratio?: number
  left_expansion_ratio?: number
  right_expansion_ratio?: number
  /** Sound effect prompt for video-to-audio. */
  sound_effect_prompt?: string
  /** Background music prompt for video-to-audio. */
  bgm_prompt?: string
  /** ASMR enhancement mode for video-to-audio. */
  asmr_mode?: boolean
  /** Face ID for lip sync (from facial recognition API). */
  face_id?: string
  /** Audio timing for lip sync (milliseconds). */
  sound_start_time?: number
  sound_end_time?: number
  sound_insert_time?: number
  /** Audio volume [0, 2]. */
  sound_volume?: number
  /** Original video audio volume [0, 2]. */
  original_audio_volume?: number
  /** Element frontal image for multi-shot. */
  element_frontal_image?: string
  /** Enable watermark. */
  watermark_info?: { watermark: boolean }
  /** Async callback URL for result notification. */
  callback_url?: string
  /** User-defined external task ID for tracking. */
  external_task_id?: string
  /** Request timeout in milliseconds. */
  timeout?: number
  /** Re-upload binary URLs to R2 before sending. */
  reupload?: boolean
}

export interface GenerateResponse {
  id: string
  model: string
  provider: string
  status: 'completed' | 'failed'
  outputs: OutputItem[]
  metadata: {
    seed?: number
    inference_time_ms?: number
    cost?: number
    safety_flagged?: boolean
    tokens?: number
    prompt_tokens?: number
    completion_tokens?: number
  }
}

export interface OutputItem {
  type: OutputType
  url?: string
  content?: string
  content_type: string
  size_bytes?: number
}

// === Async Job Submission & Polling ===

export interface SubmitResponse {
  id: string
  model: string
  provider: ProviderName
  endpoint: string
  status: 'pending' | 'processing' | 'completed'
}

export interface PollResponse {
  id: string
  model: string
  provider: ProviderName
  status: 'completed' | 'failed' | 'processing' | 'pending'
  outputs?: OutputItem[]
  metadata?: GenerateResponse['metadata']
  error?: string
}

// === Discovery ===

export interface ListModelsFilters {
  input?: InputType
  output?: OutputType
  provider?: ProviderName
  query?: string
}

// === Provider Adapter ===

export interface ProviderResponse {
  id: string
  status: 'completed' | 'failed' | 'processing' | 'pending'
  output?: unknown
  error?: string
}

export interface ProviderAdapter {
  name: ProviderName
  submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse>
  poll(
    taskId: string,
    auth: string,
    endpoint?: string,
  ): Promise<ProviderResponse>
  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[]
}

// === Fetch ===

export interface FetchLogEntry {
  kind: 'request' | 'response' | 'error'
  method: string
  url: string
  bodyBytes?: number
  headers?: Record<string, string>
  status?: number
  durationMs?: number
  responseBytes?: number
  error?: string
}

export type LogFn = (entry: FetchLogEntry) => void

export interface FetchOptions {
  timeoutMs?: number
  logging?: boolean
  logger?: LogFn
}

// === Configuration ===

export interface ConfigureOptions {
  keys?: Partial<Record<ProviderName, string>>
  storage?: StorageConfig
  fetch?: FetchOptions
}

// === Storage (R2) ===

export interface StorageConfig {
  accountId: string
  bucketName: string
  accessKeyId: string
  secretAccessKey: string
  publicUrlBase?: string
  autoUpload?: boolean
  mode?: 'public' | 'presigned'
  presignExpiresIn?: number
}

export interface UploadResult {
  url: string
  key: string
  size_bytes: number
  content_type: string
}

export interface UploadOptions {
  key?: string
  contentType?: string
  prefix?: string
  maxBytes?: number
}
