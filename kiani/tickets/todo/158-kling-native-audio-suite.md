---
id: "158"
title: "Add native kling provider for TTS, text-to-audio, video-to-audio, and voice clone"
priority: P2
complexity: M
depends_on: []
area: build
status: todo
---

# PDD-158: Kling audio suite — TTS, text-to-audio, video-to-audio, voice clone

## Product — PM

### Problem
Kling audio models (TTS, video-to-audio, voice clone) only route through fal-ai. Text-to-audio (sound effects generation) has no registry entry at all.

### Proposal
1. Add `kling` provider to existing audio models.
2. Create NEW `kling-text-to-audio` model for sound effects generation.

### Key metric
Full Kling audio pipeline accessible via native API + new sound effects capability.

### Priority
P2

### Dependencies
None.

## Technical — Architect

### Architecture
**TTS (synchronous):**
- Endpoint: `v1/audio/tts`
- Skill: `kiani/skills/providers/kling/kling-tts/SKILL.md`
- Existing model: `kling-video-v1-tts`
- Params: `text`, `voice_id`, `voice_language` (zh/en), `voice_speed` (0.8-2.0)
- Note: Synchronous endpoint — already in `SYNC_ENDPOINTS` set in adapter
- output_map: `extract_path: "task_result.audios[].url"`, `type: "audio"` (verify actual sync response shape)

**Text-to-Audio (NEW):**
- Endpoint: `v1/audio/text-to-audio`
- Skill: `kiani/skills/providers/kling/kling-text-to-audio/SKILL.md`
- New model ID: `kling-text-to-audio`
- Params: `prompt` (sound description, max 200 chars), `duration` (3.0-10.0s)
- Modality: inputs [text], outputs [audio]
- Category: text-to-audio
- output_map: `extract_path: "task_result.audios[].url"`, `type: "audio"`

**Video-to-Audio:**
- Endpoint: `v1/audio/video-to-audio`
- Skill: `kiani/skills/providers/kling/kling-video-to-audio/SKILL.md`
- Existing model: `kling-video-video-to-audio`
- Params: `video_id` or `video_url`, `sound_effect_prompt`, `bgm_prompt`, `asmr_mode`
- output_map: `extract_path: "task_result.audios[].url"`, `type: "audio"`

**Voice Clone:**
- Endpoint: `v1/general/custom-voices`
- Skill: `kiani/skills/providers/kling/kling-voice-clone/SKILL.md`
- Existing model: `kling-video-create-voice`
- Params: `voice_name`, `voice_url` or `video_id`
- Note: This is a CRUD/management endpoint but create-voice exists in registry as a generation-like entry

### Risks & unknowns
- TTS sync response shape may differ from async — verify `parseOutput` handles it.
- Video-to-audio can take `video_id` (Kling internal) or `video_url` — URL is more portable.
- Voice clone requires 5-30s clean audio — validation is on user side.

### Complexity
M — 3 existing models + 1 new, straightforward params.

## Tasks — PO

### Acceptance criteria
- AC-1: kling-video-v1-tts has kling provider
- AC-2: New kling-text-to-audio model exists with kling provider
- AC-3: kling-video-video-to-audio has kling provider
- AC-4: kling-video-create-voice has kling provider
- AC-5: param_maps verified against SKILL.md
- AC-6: check:types passes

### Task breakdown
- [ ] Read TTS SKILL.md, add kling provider
- [ ] Read text-to-audio SKILL.md, create new registry entry
- [ ] Read video-to-audio SKILL.md, add kling provider
- [ ] Read voice-clone SKILL.md, add kling provider to create-voice
- [ ] Run check:types

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | N/A | |
| Responsive (mobile/tablet/desktop) | N/A | |
| Accessibility (contrast, focus, aria) | N/A | |
| Loading/error/empty states | N/A | |
| Interaction feedback (hover/focus/active) | N/A | |

**Result**: pending
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [ ] | |
| Broken access control | [ ] | |
| Sensitive data exposure | [ ] | |
| XSS | [ ] | |
| Security misconfiguration | [ ] | |

**Result**: pending
**Issues found**: none

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [ ] | |
| AC-2 | [ ] | |
| AC-3 | [ ] | |
| AC-4 | [ ] | |
| AC-5 | [ ] | |
| AC-6 | [ ] | |

**Result**: pending
**Issues found**: none
