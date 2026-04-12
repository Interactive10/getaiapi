---
id: "162"
title: "Align kling native param_map with fal-ai canonical names"
priority: P1
complexity: L
depends_on: []
area: build
status: done
---

# PDD-162: Align kling native param_map with fal-ai canonical names

## Product — PM

### Problem

All 62 models with both fal-ai and kling bindings have parameter mismatches. Users switching `provider: 'fal-ai'` to `provider: 'kling'` experience silent data loss — params are discarded without error. This violates the core provider portability promise.

Three categories of issues:
1. **Supported but unmapped** — Kling API supports the param but the `param_map` entry is missing (e.g. `cfg_scale`, `image_tail`, `voice_list`, `elements`)
2. **Renamed** — fal-ai and kling use different target names for the same concept (e.g. `image_url` vs `image`, `num_images` vs `n`)
3. **Unsupported** — Kling API doesn't expose the control at all (e.g. `seed`, `guidance`, `steps`, `format`, `safety`)

### Proposal

For each of the 62 dual-provider models:
- **Category 1 (supported but unmapped):** Add the missing `param_map` entries translating canonical names to Kling-native names
- **Category 2 (renamed):** Fix `param_map` so canonical user-facing name maps to the correct Kling-native field
- **Category 3 (unsupported):** No action needed — these params are correctly absent. Document which params are provider-specific in model metadata if needed later

### Key metric

100% of fal-ai `param_map` keys that have a Kling API equivalent are present in the kling binding's `param_map`.

### Priority

P1 — users switching providers get silent failures today.

### Dependencies

None.

## Technical — Architect

### Architecture

Changes are registry-only (`registry/registry.json`). No adapter code changes needed — `mapInput()` already handles `param_map` translation correctly.

For each model with both providers:
1. Read the Kling SKILL.md to confirm native API field names
2. Compare fal-ai `param_map` keys against kling `param_map` keys
3. Add missing entries where Kling supports the param
4. Fix renamed entries to use correct Kling-native target

**Specific fixes needed (by param):**

| Canonical Param | fal-ai Target | Kling Native Target | Models Affected |
|-----------------|---------------|---------------------|-----------------|
| `image` | `image_url` / `start_image_url` | `image` | 26 video models — kling already correct, fal-ai maps differently. **No fix needed** |
| `count` | `num_images` | `n` | 2 image models — kling already correct |
| `cfg_scale` | `cfg_scale` | `cfg_scale` | ~10 video models — ADD to kling binding |
| `end_image_url` | `end_image_url` | `image_tail` | ~8 video models — ADD with correct target |
| `generate_audio` | `generate_audio` | `sound` (value mapping: true→"on") | ~8 video models — ADD with correct target |
| `voice_ids` | `voice_ids` | `voice_list` | ~4 video models — ADD with correct target |
| `elements` | `elements` | `element_list` | ~6 video models — ADD with correct target |
| `audio` (avatar) | `audio_url` | `sound_file` | 1 model — ADD with correct target |

**Params NOT mappable (Kling doesn't support):**
- `seed`, `guidance`/`guidance_scale`, `steps`/`num_inference_steps`, `format`/`output_format`, `safety`/`enable_safety_checker`, `quality`, `strength`

### Risks & unknowns

- Some Kling params may need **value transformation**, not just key renaming (e.g. `generate_audio: true` → `sound: "on"`). This may require adapter-level changes if `param_map` can't do value mapping.
- `elements` vs `element_list` may have structural differences (array of IDs vs nested objects). Need to verify schema compatibility.
- Lipsync models (~15) may be fundamentally incompatible endpoints between fal-ai and kling. Need case-by-case review.
- **Type safety approach**: Provider-scoped generics (`GenerateInput<'kling'>`) add complexity. Must ensure the generic defaults to a union of all providers so existing code (`GenerateInput` without generic) stays valid. Codegen from registry vs hand-maintained types is a design tradeoff — codegen is accurate but adds build step.

### Complexity

L — 62 models to review, registry changes only but requires cross-referencing SKILL.md docs for each model group.

## Tasks — PO

### Acceptance criteria

- AC-1: Every kling binding includes `param_map` entries for all params that both the canonical interface AND the Kling native API support
- AC-2: `param_map` target names match Kling's native API field names (verified against SKILL.md docs)
- AC-3: No user-facing param names changed (backward compatible)
- AC-4: No fal-ai bindings modified
- AC-5: Models where kling doesn't support a param do NOT have that param in kling's `param_map` (no phantom params)
- AC-6: Unit tests pass for all affected model groups
- AC-7: Provider-scoped TypeScript types enforce valid params per provider at compile time — passing an unsupported param (e.g. `seed` on kling) produces a type error
- AC-8: Type safety is backward compatible — existing code using the generic `GenerateInput` type still compiles without changes
- AC-9: Test coverage for type-safe provider params: compile-time rejection of unsupported params, runtime validation alignment

### Task breakdown

- [x] **Image generation models** (kling-image-v3, kling-image-o1, kling-image-o3): audit & fix param_map
- [x] **Text-to-video models** (v1.5, v1.6, v2, v2.1, v2.6, v3): audit & fix param_map — add `cfg_scale`, `generate_audio`→`sound`
- [x] **Image-to-video models** (v1.5, v1.6, v2, v2.1, v2.6, v3): audit & fix param_map — add `end_image_url`→`image_tail`, `cfg_scale`, `generate_audio`→`sound`, `voice_ids`→`voice_list`
- [x] **Motion control models** (v2.6, v3): audit & fix param_map
- [x] **Video effects models** (v1, v1.5, v1.6): audit & fix param_map
- [x] **Avatar & lipsync models**: audit compatibility — flag incompatible endpoints
- [x] **Audio models** (TTS, voice-clone, video-to-audio, text-to-audio): audit & fix param_map
- [x] **Omni models** (image-omni, video-omni): audit & fix param_map
- [x] **Misc models** (virtual-try-on, reference-to-image, extend-image, image-recognize): audit & fix param_map
- [x] Identify params needing value transformation (e.g. boolean→string) and implement in adapter if needed
- [x] **Type safety**: Design provider-scoped param types (e.g. `GenerateInput<'kling'>` narrows `options` to only Kling-supported params)
- [x] **Type safety**: Generate per-provider param type from registry `param_map` keys (codegen or mapped type)
- [x] **Type safety**: Ensure generic `GenerateInput` (no provider generic) remains unchanged for backward compatibility
- [x] **Tests**: Unit tests for param_map alignment — each dual-provider model's kling binding covers all supported canonical params
- [x] **Tests**: Type-level tests (e.g. `expectTypeOf`) confirming unsupported params error at compile time
- [x] **Tests**: Runtime tests verifying `mapInput()` translates canonical params to correct Kling-native field names
- [x] Run existing unit tests, verify no regressions
- [x] Update CHANGELOG.md, bump version

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | N/A | |
| Responsive (mobile/tablet/desktop) | N/A | |
| Accessibility (contrast, focus, aria) | N/A | |
| Loading/error/empty states | N/A | |
| Interaction feedback (hover/focus/active) | N/A | |

**Result**: N/A (no UI changes)
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
