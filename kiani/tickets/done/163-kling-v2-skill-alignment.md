---
id: "163"
title: "Align Kling v2 provider with skill documentation"
priority: P1
complexity: L
depends_on: []
area: build
status: current
---

# PDD-163: Align Kling v2 provider with skill documentation

## Product — PM

### Problem

The new v2 Kling provider (`src/providers/kling/`) has widespread misalignment with the 22 skill docs in `kiani/skills/providers/kling/`. Issues fall into 4 categories:

1. **Undifferentiated model variants** — 3 groups of model functions send identical HTTP requests when they should each send distinct `model_name`/`mode` values per their skill docs (avatar, effects, lip-sync). we are not to merge functions. each model and each model version to get its own function
2. **Missing required fields** — 5 input types are missing fields the Kling API marks as required, making them unusable without the `options` escape hatch
3. **Structural mismatches** — 3 types use the wrong field name or type vs what the API expects
4. **Missing endpoint** — `v1/videos/multi-image2video` (reference-to-video) has no implementation

### Proposal

Fix all issues so every model function sends a correct, distinguishable request and every required API parameter has a typed field.

### Key metric

- Every required parameter from skill docs has a typed field (not hidden behind `options`)
- Zero duplicate/indistinguishable model functions
- All type field names and types match the Kling API spec

### Priority

P1 — multiple types are missing required fields, making them broken without workarounds.

### Dependencies

None.

## Technical — Architect

### Architecture

All changes are within `src/providers/kling/`. No new files needed.

---

### Category A: Undifferentiated model variants (bug)

Each function claims to target a specific model version but sends the wrong or missing defaults. Fix = check skill doc for each variant, then set the correct `model_name`/`mode` in `models.ts`.

#### A1: Avatar — v1 and v2 send identical requests

**File:** `models.ts:171-182`
**Problem:**
| Function | Sends | Should send |
|----------|-------|-------------|
| `avatarV1Pro` | `{ mode: 'pro' }` | Check skill — likely needs `model_name` for v1 |
| `avatarV1Standard` | `{ mode: 'std' }` | Check skill — likely needs `model_name` for v1 |
| `avatarV2Pro` | `{ mode: 'pro' }` | Check skill — likely needs `model_name` for v2 |
| `avatarV2Standard` | `{ mode: 'std' }` | Check skill — likely needs `model_name` for v2 |

**Fix:** Read `kling-avatar/SKILL.md`, check the Kling API docs for the correct `model_name` values for v1 vs v2, and add them as defaults. All 4 functions stay.

#### A2: Effects — all 4 variants send identical empty requests

**File:** `models.ts:195-206`
**Problem:**
| Function | Sends | Should send |
|----------|-------|-------------|
| `effectsV1Standard` | `{}` | Needs correct version/mode defaults |
| `effectsV1_5Pro` | `{}` | Needs correct version/mode defaults |
| `effectsV1_6Pro` | `{}` | Needs correct version/mode defaults |
| `effectsV1_6Standard` | `{}` | Needs correct version/mode defaults |

**Fix:** Read `kling-video-effects/SKILL.md`, find what parameter differentiates v1/v1.5/v1.6 and std/pro, then add correct defaults. Type structure also needs fixing (see B1). All 4 functions stay.

#### A3: LipSync — audio and text variants send identical requests

**File:** `models.ts:186-191`
**Problem:**
| Function | Sends | Should send |
|----------|-------|-------------|
| `lipSyncAudioToVideo` | `{}` | Should enforce audio-specific fields |
| `lipSyncTextToVideo` | `{}` | Should enforce text-specific fields |

**Fix:** Read `kling-lip-sync/SKILL.md`. If the API differentiates via a parameter, add it. If the distinction is input-only, split into `LipSyncAudioInput` (requires `sound_file`/`audio_id`) vs `LipSyncTextInput` (requires text/voice fields) to enforce correctness at the type level. Both functions stay.

---

### Category B: Structural mismatches (wrong field names/types)

#### B1: EffectsInput — wrong top-level structure

**File:** `types.ts:92-95`
**Skill:** API expects `{ effect_scene: string, input: { image | images }, ... }`.
**Code:** Type has `image` at top level, no `effect_scene`.
**Fix:**

```ts
export interface EffectsInput extends PollOptions {
  effect_scene: string;
  input: { image?: string; images?: string[] };
  options?: Record<string, unknown>;
}
```

#### B2: MotionControlInput — `keep_original_sound` wrong type

**File:** `types.ts:101`
**Skill:** `kling-motion-control/SKILL.md` — field is string enum `"yes"` | `"no"`, default `"yes"`.
**Code:** Type is `boolean`.
**Fix:** Change to `keep_original_sound?: 'yes' | 'no'`.

#### B3: TextToAudioInput — `duration` wrong type

**File:** `types.ts:120`
**Skill:** `kling-text-to-audio/SKILL.md` — field is `float`, range 3.0–10.0.
**Code:** Type is `string`.
**Fix:** Change to `duration?: number`.

---

### Category C: Missing required fields

#### C1: TtsInput — missing 2 required fields

**File:** `types.ts:107-110`
**Skill:** `kling-tts/SKILL.md` — `voice_id` (required), `voice_language` (required), `voice_speed` (optional).
**Fix:**

```ts
export interface TtsInput extends PollOptions {
  text: string;
  voice_id: string;
  voice_language: string;
  voice_speed?: number;
  options?: Record<string, unknown>;
}
```

#### C2: CreateVoiceInput — missing required `voice_name`

**File:** `types.ts:124-127`
**Skill:** `kling-voice-clone/SKILL.md` — `voice_name` (required), `video_id` (optional alternative).
**Fix:**

```ts
export interface CreateVoiceInput extends PollOptions {
  voice_name: string;
  voice_url?: string;
  video_id?: string;
  options?: Record<string, unknown>;
}
```

#### C3: ExpandImageInput — missing 4 required expansion ratio fields

**File:** `types.ts:141-146`
**Skill:** `kling-extend-image/SKILL.md` — all 4 ratios are required.
**Fix:**

```ts
export interface ExpandImageInput extends PollOptions {
  image: string;
  up_expansion_ratio: number;
  down_expansion_ratio: number;
  left_expansion_ratio: number;
  right_expansion_ratio: number;
  prompt?: string;
  n?: number;
  options?: Record<string, unknown>;
}
```

#### C4: ExtendVideoInput — missing required `video_id`

**File:** `types.ts:148-152`
**Skill:** `kling-extend-video/SKILL.md` — `video_id` is required.
**Fix:**

```ts
export interface ExtendVideoInput extends PollOptions {
  video_id: string;
  prompt?: string;
  negative_prompt?: string;
  cfg_scale?: number;
  options?: Record<string, unknown>;
}
```

#### C5: ReferenceToImageInput — missing required `subject_image_list`

**File:** `types.ts:134-139`
**Skill:** `kling-reference-to-image/SKILL.md` — `subject_image_list` (required array), plus `scene_image`, `style_image`.
**Fix:**

```ts
export interface ReferenceToImageInput extends PollOptions {
  subject_image_list: Array<{ subject_image: string }>;
  prompt?: string;
  scene_image?: string;
  style_image?: string;
  n?: number;
  aspect_ratio?: string;
  options?: Record<string, unknown>;
}
```

#### C6: LipSyncInput — missing all required fields

**File:** `types.ts:87-90`
**Skill:** `kling-lip-sync/SKILL.md` — `session_id` (required), `face_choose[]` (required) with timing fields.
**Fix:**

```ts
export interface LipSyncInput extends PollOptions {
  session_id: string;
  face_choose: Array<{
    face_id: string;
    audio_id?: string;
    sound_file?: string;
    sound_start_time: number;
    sound_end_time: number;
    sound_insert_time: number;
    sound_volume?: number;
    original_audio_volume?: number;
  }>;
  options?: Record<string, unknown>;
}
```

---

### Category D: Missing endpoint

#### D1: `referenceToVideo` — `v1/videos/multi-image2video`

**Skill:** `kling-reference-to-video/SKILL.md` — `image_list[]` (required), `prompt` (required), `model_name: kling-v1-6`, `mode`, `duration`, `aspect_ratio`.
**Fix:** Add type and function:

```ts
export interface ReferenceToVideoInput extends PollOptions {
  image_list: Array<{ image: string }>;
  prompt: string;
  model_name?: string;
  mode?: "std" | "pro";
  duration?: "5" | "10";
  aspect_ratio?: string;
  options?: Record<string, unknown>;
}
```

```ts
referenceToVideo(input: ReferenceToVideoInput): Promise<KlingVideoResult> {
  return client.execute('v1/videos/multi-image2video', { model_name: 'kling-v1-6' }, input, extractVideos)
}
```

---

### Category E: Missing optional-but-important fields (low priority)

These fields exist across many types and can go through `options`. Not blocking, but worth noting:

| Field                                                 | Types affected                       | Notes                            |
| ----------------------------------------------------- | ------------------------------------ | -------------------------------- |
| `audio_id`                                            | AvatarInput                          | Alternative to `sound_file`      |
| `video_id`                                            | VideoToAudioInput, IdentifyFaceInput | Alternative to URL               |
| `bgm_prompt`, `asmr_mode`                             | VideoToAudioInput                    | Important audio features         |
| `image_reference`, `image_fidelity`, `human_fidelity` | ImageGenerationInput                 | Reference image controls         |
| `camera_control`, `static_mask`, `dynamic_masks`      | TextToVideoInput, ImageToVideoInput  | Advanced video controls          |
| `callback_url`, `external_task_id`, `watermark_info`  | All types                            | Cross-cutting, fine in `options` |

**Decision:** These remain in `options` for now. They're important but not required by the API, and adding them all would bloat the types. Can be promoted to typed fields in a follow-up if users request them.

---

### Deferred: Element Library & Multi-Elements Video

- `kling-element/SKILL.md` — CRUD management API (5 endpoints). Not a generation endpoint. **Separate ticket.**
- `kling-multi-elements-video/SKILL.md` — Stateful 6-step interactive workflow. Requires session management. **Separate ticket.**

### Risks & unknowns

- Avatar/effects/lip-sync version params need research — the skill docs may not document the differentiating field. May need to check the Kling API directly.
- `CreateVoiceInput.voice_url` changes from required to optional (was the only field, now `voice_name` is required instead). Breaking but correct per API spec.

### Complexity

L — 10 type rewrites, 1 function addition, defaults fixes across 10 existing functions, all tests need updating.

## Tasks — PO

### Acceptance criteria

- AC-1: Avatar v1 and v2 functions send distinct requests (different `model_name` or equivalent).
- AC-2: Effects v1/v1.5/v1.6 functions send distinct requests. `EffectsInput` requires `effect_scene` and `input` structure.
- AC-3: LipSync functions are distinct (split input types or differentiating param). `LipSyncInput` has `session_id` and `face_choose[]`.
- AC-4: `referenceToVideo` function exists, hits `v1/videos/multi-image2video`.
- AC-5: `TtsInput` has required `voice_id` and `voice_language`.
- AC-6: `CreateVoiceInput` has required `voice_name`.
- AC-7: `ExpandImageInput` has all 4 required expansion ratio fields.
- AC-8: `ExtendVideoInput` has required `video_id`.
- AC-9: `ReferenceToImageInput` has required `subject_image_list`.
- AC-10: `MotionControlInput.keep_original_sound` is `'yes' | 'no'`, not boolean.
- AC-11: `TextToAudioInput.duration` is `number`, not string.
- AC-12: All tests pass. Function count = 70 (69 + 1 refToVideo).
- AC-13: No indistinguishable model functions remain — every function sends a unique request body.

### Task breakdown

- [ ] A1: Check skill doc for avatar v1 vs v2 — find correct `model_name`, fix defaults for all 4 functions (API has no version param — see Risks)
- [x] A2: Check skill doc for effects v1/v1.5/v1.6 — find differentiating params, fix defaults for all 4 functions, rewrite `EffectsInput` (B1) (API has no version param — EffectsInput structure fixed)
- [x] A3: Check skill doc for lip-sync audio vs text — fix defaults or split input types, rewrite `LipSyncInput` (C6) (LipSyncInput rewritten with all required fields)
- [x] B2: Fix `MotionControlInput.keep_original_sound` type to `'yes' | 'no'`
- [x] B3: Fix `TextToAudioInput.duration` type to `number`
- [x] C1: Add `voice_id`, `voice_language`, `voice_speed` to `TtsInput`
- [x] C2: Add `voice_name` to `CreateVoiceInput`, make `voice_url` optional, add `video_id`
- [x] C3: Add 4 expansion ratio fields to `ExpandImageInput`
- [x] C4: Add `video_id` to `ExtendVideoInput`, add `cfg_scale`
- [x] C5: Add `subject_image_list`, `scene_image`, `style_image` to `ReferenceToImageInput`
- [x] D1: Add `ReferenceToVideoInput` type and `referenceToVideo` function
- [x] Update `index.ts` exports for new/renamed types
- [x] Update all tests: function count, new tests for changed types, verify request bodies

## UX — Sign-off

| Check                                     | Passed | Notes |
| ----------------------------------------- | ------ | ----- |
| Design system compliance                  | N/A    |       |
| Responsive (mobile/tablet/desktop)        | N/A    |       |
| Accessibility (contrast, focus, aria)     | N/A    |       |
| Loading/error/empty states                | N/A    |       |
| Interaction feedback (hover/focus/active) | N/A    |       |

**Result**: N/A (library code, no UI)
**Issues found**: none

## Security — Sign-off

| Check                           | Passed | Notes |
| ------------------------------- | ------ | ----- |
| Injection (SQL, NoSQL, command) | [ ]    |       |
| Broken access control           | [ ]    |       |
| Sensitive data exposure         | [ ]    |       |
| XSS                             | [ ]    |       |
| Security misconfiguration       | [ ]    |       |

**Result**: pending
**Issues found**: none

## QA — Sign-off

| AC                                             | Verified | Notes |
| ---------------------------------------------- | -------- | ----- |
| AC-1: Avatar v1/v2 distinct requests           | [ ]      |       |
| AC-2: Effects versions distinct + typed scene  | [ ]      |       |
| AC-3: LipSync distinct + typed fields          | [ ]      |       |
| AC-4: referenceToVideo exists                  | [ ]      |       |
| AC-5: TtsInput required fields                 | [ ]      |       |
| AC-6: CreateVoiceInput.voice_name required     | [ ]      |       |
| AC-7: ExpandImageInput expansion ratios        | [ ]      |       |
| AC-8: ExtendVideoInput.video_id required       | [ ]      |       |
| AC-9: ReferenceToImageInput.subject_image_list | [ ]      |       |
| AC-10: keep_original_sound type fix            | [ ]      |       |
| AC-11: TextToAudioInput.duration type fix      | [ ]      |       |
| AC-12: Tests pass, count = 70                  | [ ]      |       |
| AC-13: No indistinguishable functions          | [ ]      |       |

**Result**: pending
**Issues found**: none
