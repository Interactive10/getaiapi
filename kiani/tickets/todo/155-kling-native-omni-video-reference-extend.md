---
id: "155"
title: "Add native kling provider for omni-video, reference-to-video, and video extension"
priority: P1
complexity: L
depends_on: ["154"]
area: build
status: todo
---

# PDD-155: Kling omni-video, reference-to-video, and video extension

## Product — PM

### Problem
O1/O3 video models, reference-to-video, and video extension are either fal-ai only or missing from the registry entirely. Video extension (continuation) is a unique Kling capability with no registry entry.

### Proposal
1. Add `kling` provider to O1/O3 video models (omni-video endpoint).
2. Add `kling` provider to reference-to-video models (multi-image2video endpoint).
3. Create NEW `kling-video-extend` model for video continuation.

### Key metric
O1/O3 direct access + new video extension capability.

### Priority
P1 — Unlocks latest model generation direct access.

### Dependencies
Ticket 154 (establishes video param mapping pattern).

## Technical — Architect

### Architecture
**Omni-Video:**
- Endpoint: `v1/videos/omni-video`
- Skill: `kiani/skills/providers/kling/kling-video-omni/SKILL.md`
- Existing models: kling-video-o1-* (8 variants), kling-video-o3-* (10 variants)
- Params: `prompt` (with `<<<image/video/element>>>` references), `image_list`, `element_list`, `video_list`, `multi_shot`, `multi_prompt`, `sound`, `mode`, `aspect_ratio`, `duration`, `model_name`
- Model names: `kling-video-o1`, `kling-v3-omni`

**Reference-to-Video:**
- Endpoint: `v1/videos/multi-image2video`
- Skill: `kiani/skills/providers/kling/kling-reference-to-video/SKILL.md`
- Existing models: kling-video-o1-reference-to-video, kling-video-o3-*-reference-to-video
- Params: `image_list` (max 4), `prompt`, `negative_prompt`, `mode`, `duration`, `aspect_ratio`

**Video Extension (NEW):**
- Endpoint: `v1/videos/video-extend`
- Skill: `kiani/skills/providers/kling/kling-extend-video/SKILL.md`
- New model ID: `kling-video-extend`
- Params: `video_id` (Kling internal task ID), `prompt`, `negative_prompt`, `cfg_scale`
- Modality: inputs [video, text], outputs [video]
- Category: video-to-video
- **Important:** Takes `video_id` (a Kling task ID from a previous generation), not a video URL. This is unique to the native API — fal-ai may abstract this differently.

**output_map (all):** `extract_path: "task_result.videos[].url"`, `type: "video"`

### Risks & unknowns
- Video extension requires a `video_id` from a prior Kling generation — users must have generated via Kling previously. This limits cross-provider usage.
- O1/O3 omni-video `<<<reference>>>` syntax in prompts — same consideration as omni-image.
- video_list entries have `type` field (base_reference/feature_reference) — complex nested structure.

### Complexity
L — ~18 existing models + 1 new model, complex param structures.

## Tasks — PO

### Acceptance criteria
- AC-1: All O1 video models have kling provider
- AC-2: All O3 video models have kling provider
- AC-3: Reference-to-video models have kling provider
- AC-4: New kling-video-extend model exists with kling-only provider
- AC-5: param_maps verified against SKILL.md
- AC-6: check:types passes
- AC-7: Unit tests for omni-video and video-extend

### Task breakdown
- [ ] Read omni-video SKILL.md, map native params
- [ ] Add kling provider to all O1 video models
- [ ] Add kling provider to all O3 video models
- [ ] Read reference-to-video SKILL.md, add kling provider
- [ ] Read extend-video SKILL.md, create new kling-video-extend entry
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
| AC-7 | [ ] | |

**Result**: pending
**Issues found**: none
