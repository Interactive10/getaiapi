---
id: "154"
title: "Add native kling provider to text-to-video and image-to-video models"
priority: P1
complexity: XL
depends_on: []
area: build
status: todo
---

# PDD-154: Add native kling provider to text-to-video and image-to-video models

## Product — PM

### Problem
30+ Kling video generation models only route through fal-ai/replicate. This is the highest-value Kling capability and users cannot call it directly.

### Proposal
Add `kling` provider bindings to all text-to-video and image-to-video registry entries, mapping to the native `v1/videos/text2video` and `v1/videos/image2video` endpoints.

### Key metric
All existing Kling t2v/i2v models accessible via native provider.

### Priority
P1 — Core video generation, highest user value.

### Dependencies
None.

## Technical — Architect

### Architecture
**Text-to-Video:**
- Endpoint: `v1/videos/text2video`
- Skill: `kiani/skills/providers/kling/kling-text-to-video/SKILL.md`
- Models (each becomes a separate kling provider binding with different `model_name`/`mode` defaults):
  - kling-video-v1-standard-text-to-video → `model_name=kling-v1`, `mode=std`
  - kling-video-v1.6-pro-text-to-video → `model_name=kling-v1-6`, `mode=pro`
  - kling-video-v1.6-standard-text-to-video → `model_name=kling-v1-6`, `mode=std`
  - kling-video-v2-master-text-to-video → `model_name=kling-v2-master`, `mode=pro`
  - kling-video-v2.1-master-text-to-video → `model_name=kling-v2-1-master`, `mode=pro`
  - kling-video-v2.5-turbo-pro-text-to-video → `model_name=kling-v2-5-turbo`, `mode=pro`
  - kling-video-v2.6-pro-text-to-video → `model_name=kling-v2-6`, `mode=pro`
  - kling-video-v3-pro-text-to-video → `model_name=kling-v3`, `mode=pro`
  - kling-video-v3-standard-text-to-video → `model_name=kling-v3`, `mode=std`
- param_map: `prompt`, `negative_prompt`, `cfg_scale`, `mode`, `camera_control`, `aspect_ratio`, `duration`, `model_name`
- Advanced params: `multi_shot`, `shot_type`, `multi_prompt`, `sound`

**Image-to-Video:**
- Endpoint: `v1/videos/image2video`
- Skill: `kiani/skills/providers/kling/kling-image-to-video/SKILL.md`
- Same model version pattern as text-to-video, plus:
  - `image` (first frame), `image_tail` (end frame)
  - `static_mask`, `dynamic_masks` (motion brush)
  - `element_list`, `voice_list`
- output_map: `extract_path: "task_result.videos[].url"`, `type: "video"`

### Endpoint multiplexing pattern
```json
{
  "provider": "kling",
  "endpoint": "v1/videos/text2video",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt",
    "negative_prompt": "negative_prompt",
    "duration": "duration",
    "aspect_ratio": "aspect_ratio",
    "cfg_scale": "cfg_scale"
  },
  "defaults": {
    "model_name": "kling-v3",
    "mode": "pro"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Risks & unknowns
- Need to verify how `defaults` (fixed params like `model_name`) are sent — check if registry supports a `defaults` field or if they go in `param_map` with a special convention.
- `model_name` values for each version need exact verification against Kling API docs.
- v1 and v1.5 models may not exist in registry — only add kling provider to models that already have entries.
- Camera control and motion brush are complex nested structures — may need passthrough.

### Complexity
XL — 30+ models, complex params (camera control, motion brush, multi-shot), endpoint multiplexing.

## Tasks — PO

### Acceptance criteria
- AC-1: All existing text-to-video models have kling provider binding
- AC-2: All existing image-to-video models have kling provider binding
- AC-3: Each binding uses correct `model_name` and `mode` values
- AC-4: param_map verified against SKILL.md (no phantom params)
- AC-5: output_map uses `task_result.videos[].url`
- AC-6: check:types passes
- AC-7: Unit tests for at least 2 models (1 t2v, 1 i2v)

### Task breakdown
- [ ] Read text-to-video SKILL.md, document all model_name values
- [ ] Read image-to-video SKILL.md, document additional params
- [ ] Determine how to pass fixed params (model_name, mode) — check registry pattern
- [ ] Add kling provider to all text-to-video models
- [ ] Add kling provider to all image-to-video models
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
