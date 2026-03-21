# Changelog

All notable changes to the getaiapi registry and library will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **14 new OpenRouter text-generation models**: 6 flagship (gpt-5.4-pro, gpt-5.4, gpt-5.4-mini, gemini-3.1-pro, grok-4.20, palmyra-x5) and 8 notable (gpt-5.4-nano, mimo-v2-pro, mimo-v2-omni, mistral-small-4, minimax-m2.7, nemotron-3-super, qwen-3.5-72b, glm-5-turbo). OpenRouter now has 24 total models in the registry.
- **Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`.
- **Integration tests**: 6 new tests covering `submit()`, `poll()` (processing/completed/failed states), and `submitAndPoll()` backward compatibility.

### Changed

- **Gateway refactor**: Extracted shared validation/auth/resolve/map/upload logic into internal `_prepare()` helper, shared by `submit()`, `poll()`, and `generate()`. No behavioral changes to `generate()`.

### Fixed

- **kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema.
- **pixverse-swap**: Removed 4 phantom params (`prompt`, `guidance`, `steps`, `safety`), added real params (`mode`, `keep_audio`, `keyframe`)
- **pixverse-lipsync**: Removed 7 phantom params per provider, added missing `audio` input (critical — was unmapped on both fal-ai and replicate), added TTS params (`text`, `voice_id`), added `text` to modality inputs
- **wan-v2.2-14b-animate-replace**: Removed phantom `prompt` from both providers, removed 4 phantoms from replicate. Added `shift`, `video_write_mode`, `video_quality`, `turbo`, `output_safety`, `return_frames_zip` (fal-ai) and `keep_audio`, `turbo` (replicate)
- **wan-v2.2-14b-animate-move**: Removed 3 phantom params (`prompt`, `negative_prompt`, `format`), added missing `video` input (critical — required but unmapped), added `resolution`, `shift`, `video_write_mode`, `video_quality`, `turbo`, `output_safety`, `return_frames_zip`
- **kling-video-v3-pro-motion-control**: Removed 5 phantom params per provider, fixed replicate `image` mapping (was incorrectly mapped to `character_image`), added `character_orientation` (required on fal-ai but was missing), `keep_audio`, `elements` (fal-ai) and `mode` (replicate)
- **nano-banana-2**: Removed 6 phantom params per provider, added `images`, `resolution`, `aspect_ratio`, `safety_tolerance`, `web_search`, `thinking_level` (fal-ai) and `images`, `resolution`, `aspect_ratio`, `web_search`, `image_search` (replicate), corrected input modality to include `image`
- **nano-banana-2-edit**: Removed 5 phantom params per provider (generic image-edit template), added `count`, `resolution`, `aspect_ratio`, `safety_tolerance`, `web_search`, `thinking_level` (fal-ai), fixed wavespeed `image` mapping

### Added

- Model-specific param mapping tests for: pixverse-swap, pixverse-lipsync, wan-v2.2-14b-animate-replace, wan-v2.2-14b-animate-move, kling-video-v3-pro-motion-control, nano-banana-2, nano-banana-2-edit
- Cross-provider unified param names: `keep_audio`, `turbo`, `web_search`, `character_orientation`, `mode` — same user-facing key maps to different provider-specific param names

## [1.0.0-alpha.1] - 2026-03-14

### Fixed

- **Gateway poll loop timeout**: Poll loop could hang indefinitely if a provider stayed in "processing" state. Now enforces the request timeout and throws `TimeoutError` with the actual provider and model name.
- **Gateway poll backoff**: Poll interval now ramps from 1s to 5s (was fixed 1s), reducing unnecessary API calls on slow generations.
- **Unsafe output casts in mapper**: `mapOutput()` could return `{ url: undefined }` when provider responses had missing fields. Now filters out entries with missing URLs/values instead of casting `undefined` to `string`.
- **Options passthrough leaking internal keys**: `timeout` and `reupload` from `request.options` were being forwarded to providers as API params. These internal keys are now excluded.
- **OpenRouter poll() silent data loss**: `poll()` returned `{ status: "completed" }` without output data. Now throws `ProviderError` since OpenRouter is synchronous and poll should never be called.
- **CLI NaN on invalid numeric args**: `--seed abc` silently passed `NaN` to providers. Now validates and exits with a clear error message.
- **TimeoutError missing context**: Retry timeouts reported provider as "unknown" and model as "unknown". `withRetry()` now accepts `provider` and `model` options and passes them through to `TimeoutError`.

### Changed

- **Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config.
- **`registry/` removed from npm package**: Since the registry is bundled in `dist/`, the `registry/` folder is no longer shipped in the npm package. It remains in the repo for development scripts (`generate-registry`, `validate-registry`, audit tests).

### Added

- **Migration guide**: New `docs/MIGRATION.md` covering v0.x → v1.0.0 breaking changes (category removal, API renames) and edge runtime compatibility (no more `readFileSync` config).
- **FAQ: deployment section**: Documents that getaiapi works in all ESM runtimes without `fs` or bundler config.
- **README: edge runtime note**: Providers section now mentions Vercel Edge, Cloudflare Workers, Deno, Bun compatibility.
- **README: migration section**: Links to migration guide for users upgrading from v0.x.

### Docs

- **ARCHITECTURE.md**: Updated all 15 sections to match v2 modality-first architecture — removed references to `getModel()`, `category` field, category templates, and `categories.json`. Added OpenRouter adapter, updated file structure, API examples, and decision log.
- **PRODUCT-SPEC.md**: Replaced `getModel()` with `resolveModel()`, category filters with modality filters, category templates with per-binding `param_map`. Updated provider table, file structure, and phased delivery plan.

## [1.0.0-alpha.0] - 2026-03-13

### Changed

- **BREAKING: Removed v1 category-based architecture** — v2 modality-first architecture is now the only API
- `ModelEntry` no longer has a `category` field; use `deriveCategory(model)` for display labels
- `listModels()` now accepts `input`/`output` modality filters instead of `category`
- `resolveModel()` replaces `getModel()` for model lookup
- `GenerateRequest` now accepts optional `provider` field for provider selection
- Each provider binding is self-contained with its own `param_map` (no shared category templates)
- Registry moved from `registry/v2/registry.json` to `registry/registry.json`

### Removed

- Category template system — 17 template files replaced by per-model `param_map` in registry
- `getModel()` function — use `resolveModel()` instead
- `ModelCategory` type and `category` field on `ModelEntry`
- `./v2` package export — only `"."` export remains
- `registry/catalog.json`, `registry/categories.json` — v1-only registry files
- V2 migration script and guide

## [0.4.12] - 2026-03-13

### Fixed

- **216 models recategorized** from full category audit (`bugs/category-audit-full.md`). Major corrections include:
  - 17 FLUX models: `image-edit`/`training` → `text-to-image` (no image input required); `text-to-image` → `image-edit`/`image-to-image` (image input required)
  - 30+ LTX extend/retake/audio-to-video models: `text-to-video`/`image-to-video` → `video-to-video` or `text-to-video` (correct primary input)
  - 15+ Wan models: `text-to-video`/`image-to-video`/`image-edit` → `video-to-video`/`image-to-video` (correct primary input)
  - 12+ Ideogram remix/reframe models: `text-to-image` → `image-to-image`/`image-edit` (image input required)
  - 10+ vision-language models: `text-generation` → `image-to-text`/`video-to-text` (image/video is primary input)
  - 8+ Vidu models: `text-to-video`/`text-to-image` → `image-to-video`/`image-to-image`/`video-to-video` (reference images required)
  - 6+ PixVerse models: `text-to-video` → `video-to-video`/`image-to-video` (video/image input required)
  - SAM-3 3D models: `segmentation` → `image-to-3d` (outputs 3D meshes, not segmentation masks)
  - SAM audio models: `segmentation` → `text-to-audio` (audio separation, not image segmentation)
  - Gemini/GLM image models: `image-edit` → `text-to-image` (no image input required)
  - Voice clone/embedding models: `text-to-audio` → `training` (outputs voice ID/embedding, not audio)
  - Various style transfer, preprocessor, and utility models corrected
- **273 provider output_map entries fixed**: `output_map.type` and `content_type` corrected to match new categories (e.g., `image/png` → `video/mp4` for video models, `image/png` → `model/gltf-binary` for 3D models)
- **Modality inputs/outputs** updated on all recategorized entries to match category requirements

### Added

- **8 new categories in categories.json**: `video-to-video`, `audio-to-video`, `audio-edit`, `text-generation`, `voice-clone`, `doc-to-text`, `image-to-text`, `video-to-text`
- **Per-category test suite**: 127 new tests verifying every category's models have correct modality inputs, output_map types, content_types, and modality outputs. Category coverage tests ensure categories.json and test rules stay in sync.

### Changed

- **Category counts updated** in categories.json and README to reflect actual registry distribution after audit

## [0.4.11] - 2026-03-12

### Fixed

- **12 Black Forest Labs FLUX models recategorized**: 6 to `image-to-image` (flux-canny-dev, flux-canny-pro, flux-depth-dev, flux-depth-pro, flux-redux-dev, flux-redux-schnell), 6 to `image-edit` (flux-fill-dev, flux-fill-pro, flux-kontext-dev, flux-kontext-dev-lora, flux-kontext-max, flux-kontext-pro). Previously miscategorized as `text-to-image`. Also fixed modality inputs from `[text]` to `[image, text]` for all 12.
- **9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched.
- **16 cjwbw models recategorized**: 5 to `upscale-image` (real-esrgan, supir, supir-v0f, supir-v0q, vqfr), 2 to `audio-to-video` (aniportrait-audio2vid, sadtalker), 2 to `text-to-audio` (seamless_communication, voicecraft), 2 to `image-to-image` (bigcolor, face-align-cog), 1 to `video-to-video` (controlvideo), 1 to `doc-to-text` (docentr), 1 to `image-to-text` (internlm-xcomposer), 1 to `remove-background` (rmgb), 1 to `text-to-3d` (shap-e). Previously miscategorized as `text-to-image`. Fixed modality inputs, outputs, and output_map for all 16.

## [0.4.10] - 2026-03-11

### Added

- **doc-to-text category**: New category template for document parsing/OCR models (file input → text output). Supports fal-ai, Replicate, WaveSpeed, OpenRouter.
- **image-to-text category**: New category template for image captioning/OCR models (image + optional prompt → text output). Supports fal-ai, Replicate, WaveSpeed, OpenRouter.
- **video-to-text category**: New category template for video captioning/description models (video + optional prompt → text output). Supports fal-ai, Replicate, WaveSpeed, OpenRouter.

### Fixed

- **24 models recategorized**: 3 to `doc-to-text` (bytedance-dolphin, cudanexus-ocr-surya, datalab-to-ocr), 16 to `image-to-text` (florence-2 variants, got-ocr-v2, moondream3, cogvlm, granite-vision, llama-vision, deepseek-ocr, latex-ocr, text-extract-ocr), 4 to `video-to-text` (auto-caption, fictions-ai-autocaption, bulk-video-caption, cogvlm2-video), 1 to `text-generation` (pbevan1-llama-3.1-8b-ocr-correction). Previously miscategorized as `text-to-image`.
- **SeedDream merges**: Merged 4 duplicate SeedDream model entries across fal-ai and WaveSpeed into unified entries.
- **ByteDance merges**: Merged 7 duplicate ByteDance model entries across providers into unified entries. Fixed wrong categories and modality inputs.

## [0.4.9] - 2026-03-11

### Added

- **video-to-video category**: New category template with input mappings for video, image, prompt, resolution, seed, guidance, steps, and safety. Supports fal-ai, Replicate, and WaveSpeed providers. Fixes 422 errors when calling video-to-video models.
- **Registry QA checklist** (`tasks/registry-qa.md`): 6 automated validation checks to run before every publish — duplicate detection, category/modality mismatch, missing templates, text-only input audit, output map sanity, full test suite.

### Fixed

- **wan-v2.2-14b-animate-replace**: Corrected category from `text-to-video` to `video-to-video`, modality inputs from `[text]` to `[video, image]`. Merged duplicate Replicate entry (`wan-video-wan-2.2-animate-replace`) into single entry with both fal-ai and Replicate providers.
- **kling-video-v2.6-pro-motion-control**: Corrected category from `text-to-video` to `image-to-video`, modality inputs from `[text]` to `[image, video, text]`. Merged duplicate Replicate entry (`kwaivgi-kling-v2.6-motion-control`) which was miscategorized as `text-to-image` with wrong output type (`image/png` → `video/mp4`).
- **kling-video-v2.6-standard-motion-control**: Corrected category from `text-to-video` to `image-to-video`, modality inputs from `[text]` to `[image, video, text]`.
- **kling-video-v3-pro-motion-control**: Corrected category from `text-to-video` to `image-to-video`, modality inputs from `[text]` to `[image, video, text]`. Merged duplicate Replicate entry (`kwaivgi-kling-v3-motion-control`) which was miscategorized as `text-to-image` with wrong output type.
- **kling-video-v3-standard-motion-control**: Corrected category from `text-to-video` to `image-to-video`, modality inputs from `[text]` to `[image, video, text]`. Merged duplicate WaveSpeed entry (`kwaivgi-kling-v3.0-std-motion-control`).
- **pixverse-swap**: Corrected category from `text-to-video` to `video-to-video`, modality inputs from `[text]` to `[video, image]`.


## [0.4.6] - 2026-03-09

### Fixed

- **Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior.

## [0.4.5] - 2026-03-09

### Fixed

- **Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime.

### Changed

- **Category tests**: Updated to cover all 17 registered categories instead of only 9. Relaxed required-mapping assertion for moderation (all inputs are optional).

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
