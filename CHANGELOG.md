# Changelog

All notable changes to the getaiapi registry and library will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.4.3] - 2026-03-09

### Changed

- **Model identity graph (batch 3)**: Merged 35 additional duplicate model entries across providers (fal-ai, Replicate, WaveSpeed) into unified entries. Includes FLUX (dev, schnell, pulid), Ideogram (v2, v2-turbo, v2a, v2a-turbo, character), Qwen image models (8 variants), Recraft (20b, vectorize), HunyuanVideo, LTX-Video, SANA, CodeFormer, AuraSR, and more. Registry reduced from 1,925 to 1,890 entries.

### Fixed

- **NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model "X" found but requires Y (ENV_VAR)` instead of the misleading `Model "X" not found. Did you mean: X?`.
- **codeplugtech-face-swap**: Recategorized from `text-to-image` to `image-to-image` — model takes two images (no prompt), but `text-to-image` validation rejected requests without a prompt.

## [0.4.2] - 2026-03-09

### Changed

- **Model identity graph**: Merged 14 duplicate model entries that existed separately per provider into unified entries with combined `aliases` and `providers` arrays. Includes `gpt-4o`, `gpt-4o-mini`, `claude-haiku-4-5`, `claude-opus-4-6`, `deepseek-v3`, `nano-banana`, `nano-banana-2`, `nano-banana-2-edit`, `nano-banana-edit`, `nano-banana-pro`, `veo3.1-fast-image-to-video`, `gpt-image-1-mini`, `gpt-image-1.5`, and `whisper`. Old canonical names (e.g., `openai-gpt-4o`, `google-nano-banana-2-edit`) are preserved as aliases for backward compatibility. Registry reduced from 1940 to 1926 entries.

### Added

- **Registry duplicate detection**: New `scripts/validate-registry.js` checks for alias collisions and normalized name duplicates to prevent future duplicate entries.
- **MODELS.md generator**: New `scripts/generate-models-md.js` generates `docs/MODELS.md` from `registry.json`.

## [0.4.1] - 2026-03-09

### Fixed

- **OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`.

## [0.4.0] - 2026-03-08

### Added

- **OpenRouter provider**: New provider for text/LLM generation via OpenRouter API gateway, supporting 200+ models (Claude, GPT, Gemini, Llama, etc.) through a single OpenAI-compatible API.
- **Text generation category**: New `text-generation` category template for prompt-in, text-out workflows.
- **10 LLM models**: claude-sonnet-4-6, claude-opus-4-6, claude-haiku-4-5, gpt-4o, gpt-4o-mini, gemini-2.0-flash, llama-3.1-70b, mistral-large, deepseek-v3, qwen-2.5-72b.
- **Phase 2 options**: System prompts (`options.system`), `temperature`, `max_tokens`, `top_p` via `options` passthrough.
- **Token metadata**: `tokens`, `prompt_tokens`, `completion_tokens` fields on `GenerateResponse.metadata` for cost tracking.
- **Text output support**: `content` field on `OutputItem` for text outputs that don't have a URL.
- **Model directory**: Full model listing at `docs/MODELS.md` with provider availability.

### Fixed

- **Registry recategorization**: 47 Replicate LLM models (Claude, GPT, Llama, DeepSeek, Gemma, Mistral, Qwen, LLaVA, etc.) miscategorized as `text-to-image` → `text-generation`. 4 guard/moderation models (llama-guard, qwen-3-guard) → `moderation`. 1 video LLM (videollama3) → `text-generation`.

## [0.3.5] - 2026-03-08

### Fixed

- **Build artifacts**: 0.3.2–0.3.4 were published from a stale `dist/` — types and runtime didn't include changes from those versions. Rebuilt from current source so `images` field, `image_urls` mapping, polling URL fix, and all output parser additions are now present in the published package.

### Added

- **prepublishOnly script**: `npm run build` now runs automatically before `npm publish`, preventing stale builds from being published again.

## [0.3.4] - 2026-03-08

### Fixed

- **fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.).
- **fal-ai output types**: Fixed 89 endpoints with wrong `output_map.type` (e.g., audio models marked as `image`).
- **fal-ai categories**: Fixed 27 endpoints miscategorized (e.g., audio output models listed as `text-to-image`).

### Added

- **fal-ai parseOutput**: Added support for `image.url` (singular image, 93 endpoints), `audio_file.url` (4 endpoints), `audio_url` (string or object, 1 endpoint), and `video_url` (string URL, 2 endpoints) extract paths.
- **fal-ai URL parity tests**: 1241 tests verifying adapter URL construction matches the official `@fal-ai/client` SDK for every endpoint in the registry.
- **Registry verification tools**: `tools/fal-endpoint-verifier.ts` (audit + live probe) and `tools/fal-registry-fixer.ts` (automated registry repair).

## [0.3.3] - 2026-03-08

### Fixed

- **fal-ai polling URLs**: Fixed queue polling URL construction for endpoints with sub-paths (e.g., `fal-ai/nano-banana-pro/edit`). The fal.ai queue API expects only `owner/alias` in status and result URLs, but getaiapi was including the full path. This caused 405 errors when polling models like `nano-banana-pro/edit`, `nano-banana-2/edit`, and other sub-path endpoints.

## [0.3.2] - 2026-03-08

### Added

- **Multi-image support**: New `images` field on `GenerateRequest` for passing multiple reference images (e.g., character + location references). Maps to `image_urls` on fal-ai, replicate, and wavespeed providers.

## [0.3.1] - 2026-03-08

### Fixed

- **nano-banana**: Recategorized from `image-edit` to `text-to-image` (no image input required)
- **nano-banana-2**: Recategorized from `image-edit` to `text-to-image` (no image input required)
- **nano-banana-pro**: Recategorized from `image-edit` to `text-to-image` (no image input required)
- **ideogram-v2-turbo**: Recategorized from `upscale-image` to `text-to-image` (prompt-only generation model, not an upscaler)
- **ideogram-v2a-turbo**: Recategorized from `upscale-image` to `text-to-image` (prompt-only generation model, not an upscaler)
- **argil-avatars-text-to-video**, **veed-avatars-text-to-video**, **ltx-2.3-text-to-video**, **ltx-2.3-text-to-video-fast**, **luma-dream-machine-ray-2-image-to-video**, **luma-dream-machine-ray-2-flash-image-to-video**: Recategorized from `image-to-video` to `text-to-video` (no required image input)
- **14 lipsync/dubbing models**: Recategorized from `image-to-video` to new `video-to-video` category (dubbing, chenxwh-video-retalking, kling-video-lipsync-*, sync-lipsync-*, pixverse-lipsync, veed-lipsync, tmappdev-lipsync, infinitalk-video-to-video)
- **argil-avatars-audio-to-video**, **longcat-single-avatar-audio-to-video**, **veed-avatars-audio-to-video**, **ltx-2.3-audio-to-video**: Recategorized from `image-to-video` to new `audio-to-video` category

- **elevenlabs-sfx-v2**: Recategorized from `video-to-audio` to `text-to-audio` (generates SFX from text, not video)
- **elevenlabs-flash-v2.5**, **elevenlabs-turbo-v2.5**, **elevenlabs-v2-multilingual**, **elevenlabs-v3**: Recategorized from `text-to-image` to `text-to-audio` (TTS models, not image generators); fixed output_map from `image/png` to `audio/mpeg`
- **elevenlabs-audio-isolation**, **elevenlabs-voice-changer**: Recategorized from `text-to-image` to new `audio-edit` category; fixed output_map from `image/png` to `audio/mpeg`
- **elevenlabs-dubbing**: Recategorized from `text-to-video` to `video-to-video` (dubs existing video, not text-to-video generation)
- **fal-elevenlabs-text-to-dialogue**: Moved from `video-to-audio` to `text-to-audio` catalog section (registry was already correct)
- **google-veo-2**, **google-veo-3**, **google-veo-3-fast**, **google-veo-3.1**, **google-veo-3.1-fast**, **veo3-fast**, **veo3.1-fast**: Recategorized from `text-to-image` to `text-to-video` (video generation models, not image); fixed output_map from `image/png` to `video/mp4`

### Added

- New category: `video-to-video` (16 models — lipsync, dubbing, video modification)
- New category: `audio-to-video` (4 models — avatar/video generation from audio)
- New category: `audio-edit` (2 models — audio isolation, voice changing)

## [0.3.0] - 2026-03-07

### Added

- **Presigned URLs**: New `presignAsset()` function generates presigned GET URLs using S3 Signature V4 query-string signing, enabling private R2 buckets
- **Storage mode**: `StorageConfig.mode` option (`'public'` | `'presigned'`) controls whether `uploadAsset` returns public or presigned URLs
- **Presign expiry**: `StorageConfig.presignExpiresIn` sets default TTL (seconds) for presigned URLs, defaults to 3600
- **S3 Signer**: New `presignS3Url()` function for query-string SigV4 signing with `UNSIGNED-PAYLOAD`
- **Env vars**: `R2_STORAGE_MODE` and `R2_PRESIGN_EXPIRES_IN` environment variable support

## [0.2.0] - 2026-03-07

### Added

- **R2 Storage**: New `configureStorage()`, `uploadAsset()`, `deleteAsset()` functions for Cloudflare R2 integration
- **Auto-upload**: Binary params (Buffer/Blob/File/ArrayBuffer) in provider params are automatically uploaded to R2 and replaced with public URLs
- **Re-upload**: URL params can be re-uploaded to R2 via `reupload` per-call option or `autoUpload` global config
- **StorageError**: New error class for storage operations (upload/delete/config)
- **S3 Signer**: AWS Signature V4 signing via `node:crypto` for R2 PUT/DELETE operations
- **Types**: `StorageConfig`, `UploadResult`, `UploadOptions` exported from main entry point

## [0.1.2] - 2026-03-07

### Fixed

- **elevenlabs-sfx-v2**: Empty endpoint filled in → `fal-ai/elevenlabs/sound-effects/v2`
- **kling-video-pro**: Renamed to `kling-video-v3-pro-image-to-video`, fixed category from `text-to-video` → `image-to-video`, added `image` to modality inputs
- **kling-video-create-voice**: Fixed category from `text-to-video` → `voice-clone`, modality from `text→video` to `audio→text`, output from `video.url` → `voice_id`

### Added

- **nano-banana-pro-edit**: Added fal-ai provider (`fal-ai/nano-banana-pro/edit`) with `images[].url` output. Created skill file `skills/fal-ai-nano-banana-pro-edit/SKILL.md`. Previously only available via WaveSpeed.
- **elevenlabs-text-to-dialogue-eleven-v3**: New registry entry for multi-speaker dialogue endpoint (`fal-ai/elevenlabs/text-to-dialogue/eleven-v3`). Aliases: `elevenlabs-dialogue-v3`, `elevenlabs-multi-speaker`.
