---
id: "151"
title: "Add native kling provider to image generation models"
priority: P1
complexity: M
depends_on: []
area: build
status: todo
---

# PDD-151: Add native kling provider to image generation models

## Product — PM

### Problem
All Kling image generation models route through fal-ai. Users with Kling API keys cannot call the native API directly, paying intermediary markup.

### Proposal
Add a `kling` provider binding to existing image generation registry entries, mapping params to the native `v1/images/generations` endpoint.

### Key metric
Users can generate images via `provider: "kling"` with `KLING_ACCESS_KEY`.

### Priority
P1 — Core image generation is a high-value capability.

### Dependencies
None. Kling adapter already exists in `src/adapters/kling.ts`.

## Technical — Architect

### Architecture
- **Endpoint:** `v1/images/generations`
- **Skill reference:** `kiani/skills/providers/kling/kling-image-generation/SKILL.md`
- **Existing models to update (add kling provider):**
  - `kling-image-v3-text-to-image` → `model_name=kling-v3`
  - `kling-image-v3-image-to-image` → `model_name=kling-v3`
  - `kling-image-o3-text-to-image` → `model_name=kling-v3` (O3 uses v3 model via omni endpoint — verify)
  - `kling-image-o3-image-to-image` → same
- **param_map (native Kling):** `prompt`, `negative_prompt`, `image` (base64/URL), `image_reference`, `image_fidelity`, `human_fidelity`, `n`, `aspect_ratio`, `model_name`
- **output_map:** `extract_path: "task_result.images[].url"`, `type: "image"`
- **auth_env:** `KLING_ACCESS_KEY`

### Risks & unknowns
- O3 models may use `v1/images/omni-image` endpoint instead of `v1/images/generations` — verify before mapping.
- Kling supports models v1 through v3 but registry only has v3/o3 entries. Older versions can be added later.

### Complexity
M — 4 models, straightforward param mapping, single endpoint.

## Tasks — PO

### Acceptance criteria
- AC-1: All 4 image gen models have a `kling` provider entry in registry.json
- AC-2: `param_map` keys verified against SKILL.md (no phantom params)
- AC-3: `output_map.extract_path` matches Kling's native response format
- AC-4: `bun run check:types` passes
- AC-5: Unit test for at least 1 model verifying param mapping

### Task breakdown
- [ ] Read SKILL.md and map native Kling params for `v1/images/generations`
- [ ] Add kling provider to kling-image-v3-text-to-image
- [ ] Add kling provider to kling-image-v3-image-to-image
- [ ] Verify O3 models use same endpoint or omni-image; add kling provider accordingly
- [ ] Write unit test for param mapping
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

**Result**: pending
**Issues found**: none
