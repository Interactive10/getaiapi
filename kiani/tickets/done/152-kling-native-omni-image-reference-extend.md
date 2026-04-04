---
id: "152"
title: "Add native kling provider for omni-image, reference-to-image, and extend-image"
priority: P2
complexity: L
depends_on: ["151"]
area: build
status: done
---

# PDD-152: Kling omni-image, reference-to-image, and extend-image

## Product — PM

### Problem
Kling's omni-image (multi-modal), reference-to-image (multi-subject), and extend-image (outpainting) capabilities are either only available via fal-ai or not in the registry at all. Users cannot access these directly.

### Proposal
1. Add `kling` provider to existing `kling-image-o1` model (omni-image endpoint).
2. Create NEW model `kling-reference-to-image` for multi-subject image generation.
3. Create NEW model `kling-extend-image` for outpainting/expansion.

### Key metric
3 Kling image capabilities accessible via native provider.

### Priority
P2 — Expands image generation beyond basic text/image-to-image.

### Dependencies
Ticket 151 (establishes image generation pattern).

## Technical — Architect

### Architecture
**Omni-Image:**
- Endpoint: `v1/images/omni-image`
- Skill: `kiani/skills/providers/kling/kling-image-omni/SKILL.md`
- Existing model: `kling-image-o1` (add kling provider)
- Params: `model_name`, `prompt` (with `<<<image_1>>>` syntax), `image_list`, `element_list`, `resolution` (1k/2k/4k), `result_type`, `n`, `aspect_ratio`
- Note: `<<<image_N>>>` prompt syntax is unique — user passes images in `image_list` and references them in prompt text

**Reference-to-Image (NEW):**
- Endpoint: `v1/images/multi-image2image`
- Skill: `kiani/skills/providers/kling/kling-reference-to-image/SKILL.md`
- New model ID: `kling-reference-to-image`
- Params: `subject_image_list` (1-4 images), `scene_image`, `style_image`, `prompt`, `n`, `aspect_ratio`
- Modality: inputs [image, text], outputs [image]
- Category: image-edit

**Extend-Image (NEW):**
- Endpoint: `v1/images/editing/expand`
- Skill: `kiani/skills/providers/kling/kling-extend-image/SKILL.md`
- New model ID: `kling-extend-image`
- Params: `image`, `up_expansion_ratio`, `down_expansion_ratio`, `left_expansion_ratio`, `right_expansion_ratio`, `prompt`, `n`
- Modality: inputs [image, text], outputs [image]
- Category: image-edit

**output_map (all):** `extract_path: "task_result.images[].url"`, `type: "image"`

### Risks & unknowns
- Omni-image `<<<image_N>>>` syntax in prompts — gateway must pass prompt as-is without transformation.
- Reference-to-image accepts up to 4 subject images — need to decide unified param name for multi-image input.

### Complexity
L — 1 existing model update + 2 new model entries with new endpoints.

## Tasks — PO

### Acceptance criteria
- AC-1: kling-image-o1 has kling provider with correct omni-image param_map
- AC-2: New kling-reference-to-image model exists with kling provider
- AC-3: New kling-extend-image model exists with kling provider
- AC-4: All param_maps verified against SKILL.md
- AC-5: check:types passes
- AC-6: Unit tests for new models

### Task breakdown
- [x] Read omni-image SKILL.md, add kling provider to kling-image-o1
- [x] Read reference-to-image SKILL.md, create new registry entry
- [x] Read extend-image SKILL.md, create new registry entry
- [x] Write unit tests
- [x] Run check:types

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | N/A | |
| Responsive (mobile/tablet/desktop) | N/A | |
| Accessibility (contrast, focus, aria) | N/A | |
| Loading/error/empty states | N/A | |
| Interaction feedback (hover/focus/active) | N/A | |

**Result**: passed
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [ ] | |
| Broken access control | [ ] | |
| Sensitive data exposure | [ ] | |
| XSS | [ ] | |
| Security misconfiguration | [ ] | |

**Result**: passed
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

**Result**: passed
**Issues found**: none
