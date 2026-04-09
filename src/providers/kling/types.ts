// ── Config ────────────────────────────────────────────────────────────────────

export interface KlingConfig {
  accessKey: string
  secretKey: string
  /** Fetch timeout per HTTP request in ms. Default 30_000. */
  fetchTimeoutMs?: number
}

// ── Poll Options (mixed into every input type) ───────────────────────────────

export interface PollOptions {
  /** Overall poll timeout in ms. Default 300_000 (5 min). */
  timeout?: number
  /** Initial poll interval in ms. Default 2_000. Grows with backoff. */
  pollInterval?: number
}

// ── Input Types (one per endpoint, Kling-native field names) ─────────────────

export interface TextToVideoInput extends PollOptions {
  prompt: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  /** Additional Kling-native parameters. */
  options?: Record<string, unknown>
}

export interface ImageToVideoInput extends PollOptions {
  image: string
  prompt?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  image_tail?: string
  voice_list?: Array<{ voice_id: string }>
  element_list?: Array<{ element_id: number }>
  options?: Record<string, unknown>
}

export interface OmniVideoInput extends PollOptions {
  prompt: string
  image?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  element_list?: Array<{ element_id: number }>
  options?: Record<string, unknown>
}

export interface ImageGenerationInput extends PollOptions {
  prompt: string
  image?: string
  n?: number
  aspect_ratio?: string
  options?: Record<string, unknown>
}

export interface OmniImageInput extends PollOptions {
  prompt: string
  image?: string
  n?: number
  aspect_ratio?: string
  options?: Record<string, unknown>
}

export interface VirtualTryOnInput extends PollOptions {
  human_image: string
  cloth_image: string
  options?: Record<string, unknown>
}

export interface AvatarInput extends PollOptions {
  image: string
  sound_file?: string
  prompt?: string
  options?: Record<string, unknown>
}

export interface LipSyncInput extends PollOptions {
  session_id: string
  face_choose: Array<{
    face_id: string
    audio_id?: string
    sound_file?: string
    sound_start_time: number
    sound_end_time: number
    sound_insert_time: number
    sound_volume?: number
    original_audio_volume?: number
  }>
  options?: Record<string, unknown>
}

export interface EffectsInput extends PollOptions {
  effect_scene: string
  input: { image?: string; images?: string[] }
  options?: Record<string, unknown>
}

export interface MotionControlInput extends PollOptions {
  image_url: string
  video_url?: string
  prompt?: string
  keep_original_sound?: 'yes' | 'no'
  character_orientation?: string
  element_list?: Array<{ element_id: number }>
  options?: Record<string, unknown>
}

export interface TtsInput extends PollOptions {
  text: string
  voice_id: string
  voice_language: string
  voice_speed?: number
  options?: Record<string, unknown>
}

export interface VideoToAudioInput extends PollOptions {
  video_url?: string
  video_id?: string
  sound_effect_prompt?: string
  bgm_prompt?: string
  asmr_mode?: boolean
  options?: Record<string, unknown>
}

export interface TextToAudioInput extends PollOptions {
  prompt: string
  duration: number
  options?: Record<string, unknown>
}

export interface CreateVoiceInput extends PollOptions {
  voice_name: string
  voice_url?: string
  video_id?: string
  options?: Record<string, unknown>
}

export interface MultiShotInput extends PollOptions {
  element_frontal_image: string
  options?: Record<string, unknown>
}

export interface ReferenceToImageInput extends PollOptions {
  subject_image_list: Array<{ subject_image: string }>
  prompt?: string
  scene_image?: string
  style_image?: string
  n?: number
  aspect_ratio?: string
  options?: Record<string, unknown>
}

export interface ExpandImageInput extends PollOptions {
  image: string
  up_expansion_ratio: number
  down_expansion_ratio: number
  left_expansion_ratio: number
  right_expansion_ratio: number
  prompt?: string
  n?: number
  options?: Record<string, unknown>
}

export interface ExtendVideoInput extends PollOptions {
  video_id: string
  prompt?: string
  negative_prompt?: string
  cfg_scale?: number
  options?: Record<string, unknown>
}

export interface IdentifyFaceInput extends PollOptions {
  video_url?: string
  video_id?: string
  options?: Record<string, unknown>
}

export interface ImageRecognizeInput extends PollOptions {
  image: string
  options?: Record<string, unknown>
}

export interface ReferenceToVideoInput extends PollOptions {
  image_list: Array<{ image: string }>
  prompt: string
  mode?: 'std' | 'pro'
  duration?: '5' | '10'
  aspect_ratio?: string
  options?: Record<string, unknown>
}

// ── Output Types ─────────────────────────────────────────────────────────────

export interface KlingVideoResult {
  task_id: string
  videos: Array<{ id: string; url: string; duration: string }>
}

export interface KlingImageResult {
  task_id: string
  images: Array<{ index: number; url: string }>
}

export interface KlingAudioResult {
  task_id: string
  audios: Array<{ id: string; url: string; url_mp3?: string; url_wav?: string; duration?: string; duration_mp3?: string; duration_wav?: string }>
}

export interface KlingJsonResult {
  task_id: string
  data: unknown
}

export interface KlingFaceResult {
  session_id: string
  face_data: Array<{ face_id: string; face_image: string; start_time: number; end_time: number }>
}

export interface KlingMultiShotResult {
  task_id: string
  images: Array<{ index: number; url_1: string; url_2: string; url_3: string }>
}

export interface KlingVoiceResult {
  task_id: string
  voices: Array<{ voice_id: string; voice_name: string; trial_url: string; owned_by: string }>
}

export interface KlingVideoAudioResult {
  task_id: string
  videos: Array<{ id: string; url: string; duration: string }>
  audios: Array<{ id: string; url_mp3?: string; url_wav?: string; duration_mp3?: string; duration_wav?: string }>
}

// ── Element ───────────────────────────────────────────────────────────────────

export interface CreateElementInput extends PollOptions {
  element_name: string
  element_description: string
  /** `"image_refer"` = multi-image based; `"video_refer"` = video character based. */
  reference_type: 'image_refer' | 'video_refer'
  /** Required when reference_type is `"image_refer"`. */
  element_image_list?: {
    frontal_image: string
    refer_images?: Array<{ image_url: string }>
  }
  /** Required when reference_type is `"video_refer"`. */
  element_video_list?: {
    refer_videos: Array<{ video_url: string }>
  }
  element_voice_id?: string
  tag_list?: Array<{ tag_id: string }>
  callback_url?: string
  external_task_id?: string
}

export interface ElementTag {
  tag_id: string
  tag_name?: string
}

export interface ElementResult {
  element_id: string
  element_name: string
  element_description: string
  reference_type: 'image_refer' | 'video_refer'
  status: string
  owned_by?: string
  element_voice_id?: string
  tag_list?: ElementTag[]
  element_image_list?: {
    frontal_image: string
    refer_images?: Array<{ image_url: string }>
  }
  element_video_list?: {
    refer_videos: Array<{ video_url: string }>
  }
}

export interface ElementListInput {
  pageNum?: number
  pageSize?: number
}

export interface ElementListResult {
  elements: ElementResult[]
}

export interface DeleteElementInput {
  element_id: string
}

// ── Account ───────────────────────────────────────────────────────────────────

export interface AccountCostsInput {
  /** Query start time, Unix timestamp in ms. */
  start_time: number
  /** Query end time, Unix timestamp in ms. */
  end_time: number
  /** Optional filter by exact resource package name. */
  resource_pack_name?: string
}

export interface ResourcePackInfo {
  resource_pack_name: string
  resource_pack_id: string
  /** `"decreasing_total"` = fixed pool; `"constant_period"` = periodic refresh. */
  resource_pack_type: 'decreasing_total' | 'constant_period'
  total_quantity: number
  /** Remaining units — has a 12-hour reporting delay. */
  remaining_quantity: number
  purchase_time: number
  effective_time: number
  invalid_time: number
  status: 'toBeOnline' | 'online' | 'expired' | 'runOut'
}

export interface AccountCostsResult {
  resource_pack_subscribe_infos: ResourcePackInfo[]
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface KlingListParams {
  pageNum?: number
  pageSize?: number
}

// ── Voice List ────────────────────────────────────────────────────────────────

export interface VoiceInfo {
  voice_id: string
  voice_name: string
  trial_url?: string
  owned_by?: string
  status?: string
}

export interface KlingVoiceListResult {
  voices: VoiceInfo[]
}

// ── Task List (generic) ───────────────────────────────────────────────────────

export interface KlingTaskListResult {
  tasks: Array<Record<string, unknown>>
}

// ── Multi-Elements Video ──────────────────────────────────────────────────────

export interface MultiElementsInitInput {
  video_id?: string
  video_url?: string
}

export interface MultiElementsInitResult {
  status: number
  session_id: string
  fps?: number
  original_duration?: number
  width?: number
  height?: number
  total_frame?: number
  normalized_video?: string
}

export interface MultiElementsPoint {
  x: number
  y: number
}

export interface MultiElementsAddSelectionInput {
  session_id: string
  frame_index: number
  points: MultiElementsPoint[]
}

export interface MultiElementsSelectionResult {
  rle_mask?: unknown
  png_mask?: string
}

export interface MultiElementsDeleteSelectionInput {
  session_id: string
  frame_index: number
  points: MultiElementsPoint[]
}

export interface MultiElementsClearSelectionInput {
  session_id: string
}

export interface MultiElementsPreviewInput {
  session_id: string
}

export interface MultiElementsPreviewResult {
  video?: string
  video_cover?: string
  tracking_output?: unknown
}

export interface MultiElementsGenerateInput extends PollOptions {
  session_id: string
  edit_mode: 'addition' | 'swap' | 'removal'
  image_list?: Array<{ image: string }>
  prompt: string
  negative_prompt?: string
  model_name?: string
  mode?: 'std' | 'pro'
  duration?: '5' | '10'
  watermark_info?: { enabled: boolean }
  callback_url?: string
  external_task_id?: string
}

// ── Internal ─────────────────────────────────────────────────────────────────

export interface KlingApiResponse {
  code: number
  message: string
  request_id: string
  data: Record<string, unknown>
}
