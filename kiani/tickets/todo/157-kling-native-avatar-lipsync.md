---
id: "157"
title: "Add native kling provider to avatar and lip-sync models"
priority: P2
complexity: L
depends_on: []
area: build
status: todo
---

# PDD-157: Add native kling provider to avatar and lip-sync models

## Product — PM

### Problem
Avatar (talking head) and lip-sync models only route through fal-ai. Lip-sync via native Kling API is a 2-step workflow (face detection then sync) which adds complexity.

### Proposal
Add `kling` provider to avatar and lip-sync models. Handle the 2-step lip-sync workflow.

### Key metric
Avatar and lip-sync generation via native Kling API.

### Priority
P2

### Dependencies
None.

## Technical — Architect

### Architecture
**Avatar:**
- Endpoint: `v1/videos/avatar/image2video`
- Skill: `kiani/skills/providers/kling/kling-avatar/SKILL.md`
- Existing models: kling-video-ai-avatar-v2-pro, kling-video-ai-avatar-v2-standard
- Params: `image` (avatar reference), `audio_id` or `sound_file` (audio input), `prompt` (actions/emotions), `mode`
- Note: Kling avatar uses `audio_id` (from Kling TTS) or `sound_file` (base64/URL audio) — different from fal-ai which uses `audio_url`

**Lip-Sync (2-step):**
- Step 1 endpoint: `v1/videos/identify-face` (detect faces in video)
- Step 2 endpoint: `v1/videos/advanced-lip-sync` (apply audio to detected face)
- Skill: `kiani/skills/providers/kling/kling-lip-sync/SKILL.md`
- Existing models: kling-video-lipsync-audio-to-video, kling-video-lipsync-text-to-video
- Step 1 params: `video_id` or `video_url` → returns `session_id` + `face_list`
- Step 2 params: `session_id`, `face_id`, `audio_id` or `sound_file`, timing controls

**Design decision needed for lip-sync:**
- Option A: Orchestrate both steps in the adapter (submit calls step 1, waits, then calls step 2)
- Option B: Expose as 2 separate models (kling-video-identify-face + kling-video-lipsync)
- Option C: Only support simple single-face case with auto-orchestration

**output_map:** `extract_path: "task_result.videos[].url"`, `type: "video"`

### Risks & unknowns
- Avatar `audio_id` requires a prior Kling TTS call — users must generate audio via Kling first, or provide `sound_file`.
- Lip-sync 2-step workflow doesn't fit single generate() call pattern natively.
- Face detection returns multiple faces — user must select which face to sync.

### Complexity
L — 4 models but lip-sync workflow needs design decision.

## Tasks — PO

### Acceptance criteria
- AC-1: Avatar models have kling provider with correct param_map
- AC-2: Lip-sync design decision documented and implemented
- AC-3: Lip-sync models have kling provider (or new model entries for 2-step)
- AC-4: param_maps verified against SKILL.md
- AC-5: check:types passes
- AC-6: Unit test for avatar param mapping

### Task breakdown
- [ ] Read avatar SKILL.md, map native params
- [ ] Add kling provider to avatar models
- [ ] Read lip-sync SKILL.md, decide on 2-step approach
- [ ] Implement lip-sync kling provider (per design decision)
- [ ] Write unit tests
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
