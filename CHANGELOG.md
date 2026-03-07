# Changelog

All notable changes to the getaiapi registry and library will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.2] - 2026-03-07

### Fixed

- **elevenlabs-sfx-v2**: Empty endpoint filled in → `fal-ai/elevenlabs/sound-effects/v2`
- **kling-video-pro**: Renamed to `kling-video-v3-pro-image-to-video`, fixed category from `text-to-video` → `image-to-video`, added `image` to modality inputs
- **kling-video-create-voice**: Fixed category from `text-to-video` → `voice-clone`, modality from `text→video` to `audio→text`, output from `video.url` → `voice_id`

### Added

- **nano-banana-pro-edit**: Added fal-ai provider (`fal-ai/nano-banana-pro/edit`) with `images[].url` output. Created skill file `skills/fal-ai-nano-banana-pro-edit/SKILL.md`. Previously only available via WaveSpeed.
- **elevenlabs-text-to-dialogue-eleven-v3**: New registry entry for multi-speaker dialogue endpoint (`fal-ai/elevenlabs/text-to-dialogue/eleven-v3`). Aliases: `elevenlabs-dialogue-v3`, `elevenlabs-multi-speaker`.
