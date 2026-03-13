// === V2 Types: Modality-First Architecture ===
// No category field — modality is the source of truth.
// Each provider binding is self-contained with its own param_map.

export type OutputType = 'image' | 'video' | 'audio' | 'text' | '3d' | 'segmentation'
export type InputType = 'text' | 'image' | 'audio' | 'video'
export type ProviderName = 'fal-ai' | 'replicate' | 'wavespeed' | 'openrouter'

export interface ModelEntryV2 {
  canonical_name: string
  aliases: string[]
  modality: {
    inputs: InputType[]
    outputs: OutputType[]
  }
  providers: ProviderBindingV2[]
}

export interface ProviderBindingV2 {
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

export interface GenerateRequestV2 {
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

export interface GenerateResponseV2 {
  id: string
  model: string
  provider: string
  status: 'completed' | 'failed'
  outputs: OutputItemV2[]
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

export interface OutputItemV2 {
  type: OutputType
  url?: string
  content?: string
  content_type: string
  size_bytes?: number
}

// === Discovery ===

export interface ListModelsFiltersV2 {
  input?: InputType
  output?: OutputType
  provider?: ProviderName
  query?: string
}
