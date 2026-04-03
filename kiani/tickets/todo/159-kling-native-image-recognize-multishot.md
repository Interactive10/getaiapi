---
id: "159"
title: "Create new kling-image-recognize and kling-ai-multi-shot models"
priority: P3
complexity: M
depends_on: []
area: build
status: todo
---

# PDD-159: Kling image recognize (segmentation) and AI multi-shot

## Product — PM

### Problem
Kling has two utility capabilities with no registry representation: image segmentation (recognize) and multi-angle reference generation (multi-shot). These are kling-only features not available through fal-ai.

### Proposal
Create two NEW registry models with kling-only provider bindings.

### Key metric
2 new unique Kling capabilities available to users.

### Priority
P3 — Utility/preprocessing capabilities, lower direct user demand.

### Dependencies
None.

## Technical — Architect

### Architecture
**Image Recognize (synchronous):**
- Endpoint: `v1/videos/image-recognize`
- Skill: `kiani/skills/providers/kling/kling-image-recognize/SKILL.md`
- New model ID: `kling-image-recognize`
- Params: `image` (base64 or URL)
- Output: segmentation masks — `object_seg`, `head_seg`, `face_seg`, `cloth_seg` (each with `is_contain` flag and `mask` URL)
- Modality: inputs [image], outputs [image]
- Category: segmentation
- Note: Synchronous endpoint — already in `SYNC_ENDPOINTS` set in adapter
- output_map challenge: output is not a standard array — it's 4 named mask objects. May need custom extract_path or adapter handling.

**AI Multi-Shot:**
- Endpoint: `v1/general/ai-multi-shot`
- Skill: `kiani/skills/providers/kling/kling-ai-multi-shot/SKILL.md`
- New model ID: `kling-ai-multi-shot`
- Params: `element_frontal_image` (base64/URL)
- Output: 3 reference images (`url_1`, `url_2`, `url_3`)
- Modality: inputs [image], outputs [image]
- Category: image-edit (or utility)
- output_map challenge: output is 3 named URLs, not an array — may need special handling.

### Risks & unknowns
- Both models have non-standard output shapes that don't fit `items[].url` pattern.
- Image recognize returns mask images — need to decide if we return all 4 masks or let user specify which.
- Multi-shot returns exactly 3 images with named keys — adapter parseOutput may need extension.
- These are kling-exclusive (no fal-ai/replicate equivalents) — no cross-provider parity needed.

### Complexity
M — 2 new models, but both need parseOutput consideration for non-standard output shapes.

## Tasks — PO

### Acceptance criteria
- AC-1: New kling-image-recognize model exists with kling provider
- AC-2: New kling-ai-multi-shot model exists with kling provider
- AC-3: Output parsing handles non-standard response shapes
- AC-4: param_maps verified against SKILL.md
- AC-5: check:types passes
- AC-6: Unit tests for both models

### Task breakdown
- [ ] Read image-recognize SKILL.md, design output mapping
- [ ] Read ai-multi-shot SKILL.md, design output mapping
- [ ] Extend adapter parseOutput if needed for non-standard outputs
- [ ] Create registry entries for both models
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
