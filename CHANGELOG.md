# Changelog

All notable changes to the getaiapi registry and library will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
