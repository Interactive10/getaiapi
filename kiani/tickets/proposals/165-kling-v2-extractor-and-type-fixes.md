---
id: "165"
title: "Fix Kling v2 extractor bugs and input type gaps"
priority: P1
complexity: M
depends_on: ["163"]
area: build
status: proposals
---

# PDD-165: Fix Kling v2 extractor bugs and input type gaps

## Problem

9 issues found comparing `src/providers/kling/` code against skill docs.

## Bugs (5 runtime failures)

### 1. identifyFace polls a sync endpoint

- **Skill:** `kling-lip-sync/SKILL.md` Step 1 — response: `{ session_id, face_data[] }`, no `task_id`
- **Code:** `models.ts:274` — no sync flag, uses `extractJson`
- **Result:** polls `v1/videos/identify-face/undefined` → 404

### 2. multiShot drops url_2 and url_3

- **Skill:** `kling-ai-multi-shot/SKILL.md` — response: `images[].{ index, url_1, url_2, url_3 }`
- **Code:** `extract.ts:18` — `extractImagesUrl1` only reads `url_1`
- **Result:** 2 of 3 images silently lost

### 3. createVoice reads wrong array

- **Skill:** `kling-voice-clone/SKILL.md` — response: `task_result.voices[].{ voice_id, voice_name, trial_url, owned_by }`
- **Code:** `models.ts:244` — uses `extractAudios` which reads `task_result.audios[]`
- **Result:** always returns `{ audios: [] }`

### 4. textToAudio returns undefined URLs

- **Skill:** `kling-text-to-audio/SKILL.md` — response: `audios[].{ id, url_mp3, url_wav, duration_mp3, duration_wav }`
- **Code:** `extract.ts:27` — `extractAudios` reads `audios[].url` and `audios[].duration`
- **Result:** `url` and `duration` are `undefined`
- **Note:** TTS (`kling-tts/SKILL.md`) uses plain `url`/`duration` — fix must handle both

### 5. videoToAudio loses video + wrong audio fields

- **Skill:** `kling-video-to-audio/SKILL.md` — response: `task_result.{ videos[], audios[] }`, audios use `url_mp3`/`url_wav`
- **Code:** `models.ts:232` — uses `extractAudios`, only reads `audios[]`
- **Result:** merged video discarded, audio URLs undefined

## Input type gaps (4)

### 6. VideoToAudioInput missing fields

- **Skill:** `kling-video-to-audio/SKILL.md` — `video_id` (optional, mutually exclusive with `video_url`), `bgm_prompt` (optional), `asmr_mode` (optional boolean)
- **Code:** `types.ts:126` — only has `video_url`, `sound_effect_prompt`

### 7. TextToAudioInput.duration should be required

- **Skill:** `kling-text-to-audio/SKILL.md` — `duration` is Required, float, 3.0-10.0
- **Code:** `types.ts:134` — `duration?: number` (optional)

### 8. IdentifyFaceInput wrong shape

- **Skill:** `kling-lip-sync/SKILL.md` Step 1 — `video_id` (optional) OR `video_url` (optional), mutually exclusive
- **Code:** `types.ts:179` — only `video_url: string` (required)

### 9. identifyFace return type

- **Skill:** response is `{ session_id, face_data[] }` — no `task_id`
- **Code:** returns `KlingJsonResult` with `task_id` (will be undefined) and generic `data`
- **Should be:** dedicated `KlingFaceResult` with typed `session_id` + `face_data[]`

## Task breakdown

- [x] New types in `types.ts`: `KlingFaceResult`, `KlingMultiShotResult`, `KlingVoiceResult`, `KlingVideoAudioResult`
- [x] Update `KlingAudioResult` — add optional `url_mp3`, `url_wav`
- [x] Fix `IdentifyFaceInput` — add `video_id`, make both optional
- [x] Fix `VideoToAudioInput` — add `video_id`, `bgm_prompt`, `asmr_mode`
- [x] Fix `TextToAudioInput.duration` — make required
- [x] New extractors in `extract.ts`: `extractFace`, `extractMultiShot`, `extractVoices`, `extractVideoToAudio`
- [x] Update `extractAudios` — normalize `url_mp3`/`url_wav` → `url`
- [x] Remove `extractImagesUrl1`
- [x] Add `v1/videos/identify-face` to `SYNC_ENDPOINTS` in `client.ts`
- [x] Update `models.ts` — wire new extractors, add sync flag to identifyFace
- [x] Export new types from `index.ts`
- [x] Update tests

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| identifyFace returns KlingFaceResult, no polling | [ ] | |
| multiShot returns url_1, url_2, url_3 | [ ] | |
| createVoice returns KlingVoiceResult | [ ] | |
| textToAudio returns normalized url from url_mp3/url_wav | [ ] | |
| videoToAudio returns KlingVideoAudioResult (videos + audios) | [ ] | |
| tts still works (regression) | [ ] | |
| VideoToAudioInput has video_id, bgm_prompt, asmr_mode | [ ] | |
| TextToAudioInput.duration required | [ ] | |
| IdentifyFaceInput supports video_id and video_url | [ ] | |
| New types exported | [ ] | |
| Tests pass | [ ] | |

**Result**: pending
