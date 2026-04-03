---
id: "156"
title: "Add native kling provider to motion control and video effects"
priority: P2
complexity: M
depends_on: []
area: build
status: todo
---

# PDD-156: Add native kling provider to motion control and video effects

## Product — PM

### Problem
Motion control (5 models) and video effects (5+ models) only route through fal-ai/replicate. Motion control already has multi-provider support (fal-ai + replicate) but no native kling.

### Proposal
Add `kling` provider bindings for motion control and video effects models.

### Key metric
Motion control and effects accessible via native Kling API.

### Priority
P2

### Dependencies
None.

## Technical — Architect

### Architecture
**Motion Control:**
- Endpoint: `v1/videos/motion-control`
- Skill: `kiani/skills/providers/kling/kling-motion-control/SKILL.md`
- Existing models:
  - kling-video-v2.6-pro-motion-control (has fal-ai + replicate)
  - kling-video-v2.6-standard-motion-control (has fal-ai + wavespeed)
  - kling-video-v3-pro-motion-control (has fal-ai + replicate)
  - kling-video-v3-standard-motion-control (has fal-ai + wavespeed)
- Params: `image_url` (appearance), `video_url` (motion reference), `prompt`, `element_list`, `keep_original_sound`, `character_orientation`, `mode`
- Models: `kling-v2-6`, `kling-v3`

**Video Effects:**
- Endpoint: `v1/videos/effects`
- Skill: `kiani/skills/providers/kling/kling-video-effects/SKILL.md`
- Existing models: kling-video-v1-standard-effects, kling-video-v1.5-pro-effects, kling-video-v1.6-pro-effects, kling-video-v1.6-standard-effects
- Params: `effect_scene` (enum of 219+ effects), `input` (single or dual images)
- Note: Effects is version-agnostic in native API — single endpoint handles all

**output_map:** `extract_path: "task_result.videos[].url"`, `type: "video"`

### Risks & unknowns
- Motion control's `element_list` is a complex nested array with facial consistency bindings — needs passthrough.
- Effects `effect_scene` enum is massive — param_map just needs to pass it through.
- Unclear if native API differentiates effects by model version or if it's one endpoint for all.

### Complexity
M — ~9 models, moderate param complexity.

## Tasks — PO

### Acceptance criteria
- AC-1: All motion control models have kling provider (becoming 3-provider)
- AC-2: All effects models have kling provider
- AC-3: param_maps verified against SKILL.md
- AC-4: check:types passes

### Task breakdown
- [ ] Read motion-control SKILL.md, map native params
- [ ] Add kling provider to all motion control models
- [ ] Read video-effects SKILL.md, map native params
- [ ] Add kling provider to all effects models
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

**Result**: pending
**Issues found**: none
