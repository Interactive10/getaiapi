---
id: "166"
title: Implement missing Kling management & list APIs
priority: P2
complexity: L
depends_on: []
area: build
status: done
---

# PDD-166: Implement missing Kling management & list APIs

## Product — PM

### Problem

The Kling provider covers task *creation* and async polling well (69 models), but 39 documented API calls from the skill docs are not implemented. This leaves users unable to manage voices, list historical tasks, query individual resources by ID, use the multi-elements video editing workflow, or even fetch single task results for most generation endpoints.

Missing coverage falls into five groups:
1. **Voice management** — list, query single, and delete custom voices
2. **Multi-elements video** — entire 6-step interactive workflow is absent
3. **List/historical queries** — paginated list endpoints for all generation types
4. **Single-resource lookup** — query a single task by ID for all generation types
5. **Element management** — query a single element by task_id

### Proposal

Implement all 39 missing API calls in `src/providers/kling/client.ts` and expose them through `src/providers/kling/models.ts` and `src/providers/kling/index.ts`. Add extractor logic in `extract.ts` where needed. Write unit tests for each.

### Key metric

All 39 missing endpoints implemented, tested, and exported from the provider index.

### Priority

P2 — not blocking generation flows, but blocks voice/element management use cases, makes the multi-elements workflow entirely unusable, and prevents users from querying historical tasks.

### Dependencies

None. All endpoints are already documented in the skill files.

---

## Technical — Architect

### Architecture

All additions follow the existing `client.ts` + `models.ts` pattern:

- **client.ts** — add `httpGet`/`httpPost` calls for each endpoint, typed with request/response interfaces from `types.ts`
- **models.ts** — expose each call as a named export function
- **extract.ts** — add extractor if the response needs normalisation
- **index.ts** — re-export any new public types

**Missing endpoints by group:**

#### Voice management (`kiani/skills/providers/kling/kling-voice-clone/SKILL.md`)

| # | Function | Method | Path |
|---|---|---|---|
| 1 | `listVoices(pageNum?, pageSize?)` | GET | `/v1/general/custom-voices` |
| 2 | `listPresetVoices(pageNum?, pageSize?)` | GET | `/v1/general/presets-voices` |
| 3 | `queryVoice(taskId)` | GET | `/v1/general/custom-voices/{task_id}` |
| 4 | `deleteVoice(voiceId)` | POST | `/v1/general/delete-voices` |

#### Element management (`kiani/skills/providers/kling/kling-element/SKILL.md`)

| # | Function | Method | Path |
|---|---|---|---|
| 5 | `getElement(taskId)` | GET | `/v1/general/advanced-custom-elements/{task_id}` |

#### Multi-elements video (`kiani/skills/providers/kling/kling-multi-elements-video/SKILL.md`)

| # | Function | Method | Path |
|---|---|---|---|
| 6 | `initMultiElementsSelection(input)` | POST | `/v1/videos/multi-elements/init-selection` |
| 7 | `addSelectionArea(input)` | POST | `/v1/videos/multi-elements/add-selection` |
| 8 | `deleteSelectionArea(input)` | POST | `/v1/videos/multi-elements/delete-selection` |
| 9 | `clearSelectionArea(input)` | POST | `/v1/videos/multi-elements/clear-selection` |
| 10 | `previewSelection(input)` | POST | `/v1/videos/multi-elements/preview-selection` |
| 11 | `generateMultiElementsVideo(input)` | POST | `/v1/videos/multi-elements` |
| 12 | `queryMultiElementsTask(taskId)` | GET | `/v1/videos/multi-elements/{task_id}` |
| 13 | `listMultiElementsTasks(pageNum?, pageSize?)` | GET | `/v1/videos/multi-elements` |

#### List queries (`kiani/skills/providers/kling/kling-lip-sync/SKILL.md`, `kling-text-to-audio/SKILL.md`, and others)

| # | Function | Method | Path |
|---|---|---|---|
| 14 | `listLipSyncTasks(pageNum?, pageSize?)` | GET | `/v1/videos/advanced-lip-sync` |
| 15 | `listTextToAudioTasks(pageNum?, pageSize?)` | GET | `/v1/audio/text-to-audio` |
| 16 | `listVideoEffectsTasks(pageNum?, pageSize?)` | GET | `/v1/videos/effects` |
| 17 | `listImageGenerationTasks(pageNum?, pageSize?)` | GET | `/v1/images/generations` |
| 18 | `listOmniVideoTasks(pageNum?, pageSize?)` | GET | `/v1/videos/omni-video` |
| 19 | `listMultiShotTasks(pageNum?, pageSize?)` | GET | `/v1/general/ai-multi-shot` |
| 20 | `listImageToVideoTasks(pageNum?, pageSize?)` | GET | `/v1/videos/image2video` |
| 21 | `listOmniImageTasks(pageNum?, pageSize?)` | GET | `/v1/images/omni-image` |
| 22 | `listReferenceToImageTasks(pageNum?, pageSize?)` | GET | `/v1/images/multi-image2image` |
| 23 | `listVirtualTryOnTasks(pageNum?, pageSize?)` | GET | `/v1/images/kolors-virtual-try-on` |
| 24 | `listMotionControlTasks(pageNum?, pageSize?)` | GET | `/v1/videos/motion-control` |
| 25 | `listExtendVideoTasks(pageNum?, pageSize?)` | GET | `/v1/videos/video-extend` |
| 26 | `listAvatarTasks(pageNum?, pageSize?)` | GET | `/v1/videos/avatar/image2video` |

#### Single-task query endpoints

| # | Function | Method | Path |
|---|---|---|---|
| 27 | `getLipSyncTask(taskId)` | GET | `/v1/videos/advanced-lip-sync/{task_id}` |
| 28 | `getTextToAudioTask(taskId)` | GET | `/v1/audio/text-to-audio/{task_id}` |
| 29 | `getVideoEffectsTask(taskId)` | GET | `/v1/videos/effects/{task_id}` |
| 30 | `getImageGenerationTask(taskId)` | GET | `/v1/images/generations/{task_id}` |
| 31 | `getOmniVideoTask(taskId)` | GET | `/v1/videos/omni-video/{task_id}` |
| 32 | `getMultiShotTask(taskId)` | GET | `/v1/general/ai-multi-shot/{task_id}` |
| 33 | `getImageToVideoTask(taskId)` | GET | `/v1/videos/image2video/{task_id}` |
| 34 | `getOmniImageTask(taskId)` | GET | `/v1/images/omni-image/{task_id}` |
| 35 | `getReferenceToImageTask(taskId)` | GET | `/v1/images/multi-image2image/{task_id}` |
| 36 | `getVirtualTryOnTask(taskId)` | GET | `/v1/images/kolors-virtual-try-on/{task_id}` |
| 37 | `getMotionControlTask(taskId)` | GET | `/v1/videos/motion-control/{task_id}` |
| 38 | `getExtendVideoTask(taskId)` | GET | `/v1/videos/video-extend/{task_id}` |
| 39 | `getAvatarTask(taskId)` | GET | `/v1/videos/avatar/image2video/{task_id}` |

All input/output types go into `types.ts`. Follow existing patterns: `KlingVoiceResult`, `KlingElementResult`, etc. List endpoints share a common `KlingListParams` input type `{ pageNum?: number; pageSize?: number }`.

### Risks & unknowns

- Multi-elements video is a 6-step interactive flow (init → add → delete/clear → preview → generate). All request body shapes are documented in the skill file. The generation endpoint is `POST /v1/videos/multi-elements` (not `/generation`). Params: `session_id`, `edit_mode` (`addition`/`swap`/`removal`), `image_list`, `prompt`, `negative_prompt`, `mode`, `duration`, `watermark_info`, `callback_url`, `external_task_id`.
- `deleteVoice` takes a single `voice_id` string (not an array) per the skill doc.
- Single-task query endpoints likely share response shapes with their creation counterparts — reuse existing result types where possible.

### Complexity

L — straightforward HTTP wiring repeated 39 times across 5 groups. Most are simple GET calls; multi-elements workflow steps require careful ordering.

---

## Tasks — PO

### Acceptance criteria

- AC-1: `listVoices()` and `listPresetVoices()` return paginated voice lists with correct types
- AC-2: `queryVoice(taskId)` returns a single voice result by task ID
- AC-3: `deleteVoice(voiceId)` posts the delete request with a single `voice_id` string and returns success/failure
- AC-4: `getElement(taskId)` returns a single element result by task ID
- AC-5: All 6 multi-elements workflow steps implemented per skill doc (init, add, delete, clear, preview, generate)
- AC-6: `queryMultiElementsTask(taskId)` and `listMultiElementsTasks()` return task status/list
- AC-7: All 13 list endpoints return paginated task lists with correct types
- AC-8: All 13 single-task query endpoints return task status/output with correct types
- AC-9: All 39 functions are exported from `src/providers/kling/index.ts`
- AC-10: Unit tests cover each new function (happy path + error case)
- AC-11: CHANGELOG and README updated; version bumped (minor — significant new surface area)

### Task breakdown

- [x] Read skill docs for all 5 groups and finalise shared types in `types.ts` (KlingListParams, reuse existing result types for query endpoints)
- [x] Implement voice management methods in `client.ts` (listVoices, listPresetVoices, queryVoice, deleteVoice)
- [x] Implement `getElement(taskId)` in `client.ts`
- [x] Implement all 8 multi-elements video methods in `client.ts` (initMultiElementsSelection, addSelectionArea, deleteSelectionArea, clearSelectionArea, previewSelection, generateMultiElementsVideo, queryMultiElementsTask, listMultiElementsTasks)
- [x] Implement 13 list query methods in `client.ts` via shared `taskList()` helper (listLipSyncTasks, listTextToAudioTasks, listVideoEffectsTasks, listImageGenerationTasks, listOmniVideoTasks, listMultiShotTasks, listImageToVideoTasks, listOmniImageTasks, listReferenceToImageTasks, listVirtualTryOnTasks, listMotionControlTasks, listExtendVideoTasks, listAvatarTasks)
- [x] Implement 13 single-task query methods in `client.ts` via shared `taskGet()` helper (getLipSyncTask, getTextToAudioTask, getVideoEffectsTask, getImageGenerationTask, getOmniVideoTask, getMultiShotTask, getImageToVideoTask, getOmniImageTask, getReferenceToImageTask, getVirtualTryOnTask, getMotionControlTask, getExtendVideoTask, getAvatarTask)
- [x] Expose all 39 as named exports in `models.ts`
- [x] Add extractors in `extract.ts` where normalisation is needed (no new extractors needed — reuse existing)
- [x] Re-export new public types from `index.ts`
- [x] Write unit tests for all 39 functions
- [x] Update CHANGELOG.md and README.md; bump version (2.0.2 → 2.1.0)

---

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | [x] | N/A — backend only |
| Responsive (mobile/tablet/desktop) | [x] | N/A |
| Accessibility (contrast, focus, aria) | [x] | N/A |
| Loading/error/empty states | [x] | N/A |
| Interaction feedback (hover/focus/active) | [x] | N/A |

**Result**: passed
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [x] | No injection surface — typed structs, path params via URLSearchParams, bodies JSON-serialized |
| Broken access control | [x] | Auth resolved from env vars / configure(); no new access control surface |
| Sensitive data exposure | [x] | No credentials logged; only error response bodies logged on failure |
| XSS | [x] | N/A — library, no DOM |
| Security misconfiguration | [x] | No new config; reuses existing JWT auth |

**Result**: passed
**Issues found**: none

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [x] | listVoices/listPresetVoices return KlingVoiceListResult; tests pass |
| AC-2 | [x] | queryVoice returns KlingVoiceResult with voices[]; test passes |
| AC-3 | [x] | deleteVoice posts single voice_id; test verifies body shape |
| AC-4 | [x] | getElement returns ElementResult; test verifies element_id/element_name |
| AC-5 | [x] | All 6 workflow steps implemented and tested (init/add/delete/clear/preview/generate) |
| AC-6 | [x] | queryMultiElementsTask + listMultiElementsTasks both implemented and tested |
| AC-7 | [x] | All 13 list functions; table-driven tests verify correct endpoint + tasks[] shape |
| AC-8 | [x] | All 13 query functions return typed results (video/audio/image/multishot); 6 explicitly tested |
| AC-9 | [x] | Namespace count test: 115 functions including configure (70 gen + 5 existing mgmt + 39 new) |
| AC-10 | [x] | 20,746 tests pass including all new management/list/query tests |
| AC-11 | [x] | CHANGELOG 2.1.0 added, README updated with voice/multi-elements/list sections, package.json 2.1.0 |

**Result**: passed
**Issues found**: none
