// === Modality-First Architecture ===
// No category field — modality is the source of truth.
// Each provider binding is self-contained with its own param_map.

export type OutputType = 'image' | 'video' | 'audio' | 'text' | '3d' | 'segmentation'
export type InputType = 'text' | 'image' | 'audio' | 'video'
export type ProviderName = 'fal-ai' | 'replicate' | 'wavespeed' | 'openrouter'

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
  output_map: OutputMapping
}

export interface OutputMapping {
  type: OutputType
  extract_path: string
  content_type?: string
}

// === Request / Response ===

export interface GenerateRequest {
  model: string
  provider?: ProviderName
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
  options?: Record<string, unknown>
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

// === Configuration ===

export interface ConfigureOptions {
  keys?: Partial<Record<ProviderName, string>>
  storage?: StorageConfig
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
