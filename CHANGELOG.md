# Changelog

All notable changes to the getaiapi registry and library will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
