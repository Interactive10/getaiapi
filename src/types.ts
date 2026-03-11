// === Universal I/O ===

export interface GenerateRequest {
  model: string;
  prompt?: string;
  image?: string | File;
  images?: (string | File)[];
  audio?: string | File;
  video?: string | File;
  negative_prompt?: string;
  count?: number;
  size?: string | { width: number; height: number };
  seed?: number;
  guidance?: number;
  steps?: number;
  strength?: number;
  format?: "png" | "jpeg" | "webp" | "mp4" | "mp3" | "wav" | "obj" | "glb";
  quality?: number;
  safety?: boolean;
  options?: Record<string, unknown>;
}

export type OutputType =
  | "image"
  | "video"
  | "audio"
  | "text"
  | "3d"
  | "segmentation";

export interface GenerateResponse {
  id: string;
  model: string;
  provider: string;
  status: "completed" | "failed";
  outputs: OutputItem[];
  metadata: {
    seed?: number;
    inference_time_ms?: number;
    cost?: number;
    safety_flagged?: boolean;
    tokens?: number;
    prompt_tokens?: number;
    completion_tokens?: number;
  };
}

export interface OutputItem {
  type: OutputType;
  url?: string;
  content?: string;
  content_type: string;
  size_bytes?: number;
}

// === Model Registry ===

export type ModelCategory =
  | "text-to-image"
  | "image-to-image"
  | "text-to-video"
  | "image-to-video"
  | "text-to-audio"
  | "audio-to-text"
  | "image-to-3d"
  | "text-to-3d"
  | "upscale-image"
  | "upscale-video"
  | "remove-background"
  | "segmentation"
  | "image-edit"
  | "video-to-audio"
  | "video-to-video"
  | "moderation"
  | "training"
  | "text-generation"
  | "doc-to-text"
  | "image-to-text"
  | "video-to-text";

export type ProviderName = "fal-ai" | "replicate" | "wavespeed" | "openrouter";

export type InputType = "text" | "image" | "audio" | "video";

export interface ModelEntry {
  canonical_name: string;
  aliases: string[];
  category: ModelCategory;
  modality: {
    inputs: InputType[];
    outputs: OutputType[];
  };
  providers: ProviderBinding[];
}

export interface ProviderBinding {
  provider: ProviderName;
  skill_id: string;
  endpoint: string;
  auth_env: string;
  param_map: Record<string, string>;
  output_map: OutputMapping;
}

export interface OutputMapping {
  type: OutputType;
  extract_path: string;
  content_type?: string;
}

// === Provider Adapter ===

export interface ProviderResponse {
  id: string;
  status: "completed" | "failed" | "processing" | "pending";
  output?: unknown;
  error?: string;
}

export interface ProviderAdapter {
  name: ProviderName;
  submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse>;
  poll(
    taskId: string,
    auth: string,
    endpoint?: string,
  ): Promise<ProviderResponse>;
  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[];
}

// === Catalog ===

export interface SkillEntry {
  skill_id: string;
  provider: ProviderName;
  model_family: string;
  category: ModelCategory;
  description: string;
  endpoint: string;
}

export interface SkillCatalog {
  categories: Record<ModelCategory, SkillEntry[]>;
  providers: Record<string, SkillEntry[]>;
  duplicates: { canonical_name: string; skills: SkillEntry[] }[];
  total: number;
}

// === Category Template ===

export interface ParamMapping {
  universal: string;
  providers: Partial<Record<ProviderName, string | string[]>>;
  transform?: "flip_boolean" | "parse_size" | "none";
  required?: boolean;
}

export interface CategoryTemplate {
  category: ModelCategory;
  input_mappings: ParamMapping[];
  output_type: OutputType;
  output_extract: Record<ProviderName, string>;
  default_timeout_ms: number;
}

// === Configuration ===

export interface ConfigureOptions {
  keys?: Partial<Record<ProviderName, string>>;
  storage?: StorageConfig;
}

// === Storage (R2) ===

export interface StorageConfig {
  accountId: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrlBase?: string;
  autoUpload?: boolean;
  mode?: 'public' | 'presigned';
  presignExpiresIn?: number;
}

export interface UploadResult {
  url: string;
  key: string;
  size_bytes: number;
  content_type: string;
}

export interface UploadOptions {
  key?: string;
  contentType?: string;
  prefix?: string;
  maxBytes?: number;
}
