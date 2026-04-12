---
name: getaiapi-kling
description: >
  Reference for the getaiapi Kling provider SDK. Lists every exported function, its input type, return type, and usage example. Use this when building against or extending the Kling provider.
---

# getaiapi — Kling Provider SDK

**Package:** `getaiapi`
**Entry point:** `import { kling, createClient } from 'getaiapi/kling'`

---

## Setup

```ts
import { kling, createClient } from 'getaiapi/kling'

// Option A — configure the default singleton
kling.configure({ accessKey: '...', secretKey: '...' })

// Option B — isolated instance (multiple accounts)
const client = createClient({ accessKey: '...', secretKey: '...' })
```

All functions are available on both `kling` and any `createClient()` instance.

---

## How it works

- Every generation function accepts an input object and **polls automatically** until the task succeeds or times out.
- `timeout` (ms, default 300 000) and `pollInterval` (ms, default 2 000) can be set on any input.
- Any extra Kling-native field not in the typed input can be passed via `options: { field: value }`.

---

## Input Types

### `TextToVideoInput`
```ts
{
  prompt: string
  negative_prompt?: string
  duration?: string           // '3'–'15'
  aspect_ratio?: string       // '16:9' | '9:16' | '1:1'
  cfg_scale?: number
  sound?: 'on' | 'off'
  options?: Record<string, unknown>
}
```

### `ImageToVideoInput`
```ts
{
  image: string               // URL or Base64
  prompt?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  image_tail?: string         // End frame image
  voice_list?: Array<{ voice_id: string }>   // Max 2; requires sound: 'on'
  element_list?: Array<{ element_id: number }>
  options?: Record<string, unknown>
}
```

### `OmniVideoInput`
```ts
{
  prompt: string              // Max 2500 chars. Use <<<element_1>>>, <<<voice_1>>>, <<<image_1>>>, <<<video_1>>>
  image?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  voice_list?: Array<{ voice_id: string }>   // Max 2; requires sound: 'on'
  element_list?: Array<{ element_id: number }>
  options?: Record<string, unknown>
}
```

### `AvatarInput`
```ts
{
  image: string
  sound_file?: string
  prompt?: string
  options?: Record<string, unknown>
}
```

### `LipSyncInput`
```ts
{
  session_id: string          // From identifyFace()
  face_choose: Array<{
    face_id: string
    audio_id?: string         // From tts(). Mutually exclusive with sound_file.
    sound_file?: string       // Base64 or URL. Mutually exclusive with audio_id.
    sound_start_time: number  // ms
    sound_end_time: number    // ms
    sound_insert_time: number // ms
    sound_volume?: number     // [0, 2], default 1
    original_audio_volume?: number
  }>
}
```

### `TtsInput`
```ts
{
  text: string                // Max 1000 chars
  voice_id: string
  voice_language: string      // 'zh' | 'en'
  voice_speed?: number        // [0.8, 2.0]
}
```

### `EffectsInput`
```ts
{
  effect_scene: string
  input: { image?: string; images?: string[] }
}
```

### `MotionControlInput`
```ts
{
  image_url: string
  video_url?: string
  prompt?: string
  keep_original_sound?: 'yes' | 'no'
  character_orientation?: string
  element_list?: Array<{ element_id: number }>
}
```

### `CreateElementInput`
```ts
{
  element_name: string                       // Max 20 chars
  element_description: string               // Max 100 chars
  reference_type: 'image_refer' | 'video_refer'
  element_image_list?: {
    frontal_image: string
    refer_images?: Array<{ image_url: string }>
  }
  element_video_list?: {
    refer_videos: Array<{ video_url: string }>
  }
  element_voice_id?: string                 // Binds a voice to this element
  tag_list?: Array<{ tag_id: string }>
  callback_url?: string
  external_task_id?: string
}
```

### `MultiElementsGenerateInput`
```ts
{
  session_id: string
  edit_mode: 'addition' | 'swap' | 'removal'
  prompt: string
  image_list?: Array<{ image: string }>     // Required for addition/swap
  negative_prompt?: string
  mode?: 'std' | 'pro'
  duration?: '5' | '10'
}
```

---

## Return Types

| Type | Shape |
|------|-------|
| `KlingVideoResult` | `{ task_id, videos: [{ id, url, duration }] }` |
| `KlingImageResult` | `{ task_id, images: [{ index, url }] }` |
| `KlingAudioResult` | `{ task_id, audios: [{ id, url, duration? }] }` |
| `KlingFaceResult` | `{ session_id, face_data: [{ face_id, face_image, start_time, end_time }] }` |
| `KlingVoiceResult` | `{ task_id, voices: [{ voice_id, voice_name, trial_url, owned_by }] }` |
| `KlingVideoAudioResult` | `{ task_id, videos: [...], audios: [...] }` |
| `KlingVoiceListResult` | `{ voices: [{ voice_id, voice_name, trial_url?, owned_by?, status? }] }` |
| `KlingTaskListResult` | `{ tasks: Record<string, unknown>[] }` |
| `ElementResult` | `{ element_id, element_name, element_description, reference_type, status, element_voice_id?, ... }` |
| `ElementListResult` | `{ elements: ElementResult[] }` |
| `AccountCostsResult` | `{ resource_pack_subscribe_infos: ResourcePackInfo[] }` |

---

## All Functions

### Text-to-Video — `POST /v1/videos/text2video`

| Function | Model | Mode |
|----------|-------|------|
| `textToVideoV1Standard` | kling-v1 | std |
| `textToVideoV1_6Pro` | kling-v1-6 | pro |
| `textToVideoV1_6Standard` | kling-v1-6 | std |
| `textToVideoV2Master` | kling-v2-master | — |
| `textToVideoV2_1Master` | kling-v2-1-master | — |
| `textToVideoV2_5TurboPro` | kling-v2-5-turbo | pro |
| `textToVideoV2_6Pro` | kling-v2-6 | pro |
| `textToVideoV3Pro` | kling-v3 | pro |
| `textToVideoV3Standard` | kling-v3 | std |

```ts
const result = await kling.textToVideoV3Pro({
  prompt: 'A futuristic city at night',
  aspect_ratio: '16:9',
  duration: '5',
  sound: 'on',
})
// result.videos[0].url
```

---

### Image-to-Video — `POST /v1/videos/image2video`

| Function | Model | Mode |
|----------|-------|------|
| `imageToVideoV1Standard` | kling-v1 | std |
| `imageToVideoV1_5Pro` | kling-v1-5 | pro |
| `imageToVideoV1_6Pro` | kling-v1-6 | pro |
| `imageToVideoV1_6Standard` | kling-v1-6 | std |
| `imageToVideoV2Master` | kling-v2-master | — |
| `imageToVideoV2_1Master` | kling-v2-1-master | — |
| `imageToVideoV2_1Pro` | kling-v2-1 | pro |
| `imageToVideoV2_1Standard` | kling-v2-1 | std |
| `imageToVideoV2_5TurboPro` | kling-v2-5-turbo | pro |
| `imageToVideoV2_5TurboStandard` | kling-v2-5-turbo | std |
| `imageToVideoV2_6Pro` | kling-v2-6 | pro |
| `imageToVideoV3Pro` | kling-v3 | pro |
| `imageToVideoV3Standard` | kling-v3 | std |

```ts
const result = await kling.imageToVideoV3Pro({
  image: 'https://...',
  prompt: 'The character walks forward',
  duration: '5',
})
```

---

### Omni-Video — `POST /v1/videos/omni-video`

Supports `element_list`, `voice_list`, `image_list`, `video_list` references in prompt.

| Function | Model | Mode |
|----------|-------|------|
| `omniVideoO1ImageToVideo` | kling-video-o1 | pro |
| `omniVideoO1ReferenceToVideo` | kling-video-o1 | pro |
| `omniVideoO1StandardImageToVideo` | kling-video-o1 | std |
| `omniVideoO1StandardReferenceToVideo` | kling-video-o1 | std |
| `omniVideoO1StandardVideoEdit` | kling-video-o1 | std |
| `omniVideoO1StandardVideoReference` | kling-video-o1 | std |
| `omniVideoO1VideoEdit` | kling-video-o1 | pro |
| `omniVideoO1VideoReference` | kling-video-o1 | pro |
| `omniVideoO3ProImageToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProReferenceToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProTextToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProVideoEdit` | kling-v3-omni | pro |
| `omniVideoO3ProVideoReference` | kling-v3-omni | pro |
| `omniVideoO3StandardReferenceToVideo` | kling-v3-omni | std |
| `omniVideoO3StandardTextToVideo` | kling-v3-omni | std |
| `omniVideoO3StandardVideoEdit` | kling-v3-omni | std |
| `omniVideoO3StandardVideoReference` | kling-v3-omni | std |

**Character talking head (element + voice):**
```ts
const result = await kling.omniVideoO3ProTextToVideo({
  prompt: '<<<element_1>>> <<<voice_1>>> said, "Think of it like a massive group chat."',
  sound: 'on',
  element_list: [{ element_id: 307723399526301 }],
  voice_list: [{ voice_id: '870470675470499933' }],
  aspect_ratio: '9:16',
  duration: '5',
})
```

---

### Avatar — `POST /v1/videos/avatar/image2video`

| Function | Mode |
|----------|------|
| `avatarV2Pro` | pro |
| `avatarV2Standard` | std |
| `avatarV1Pro` | pro |
| `avatarV1Standard` | std |

```ts
const result = await kling.avatarV2Pro({
  image: 'https://...',
  sound_file: 'https://...',
  prompt: 'Speak naturally',
})
```

---

### Lip Sync — 2-step: `identifyFace` → `lipSyncAudioToVideo`

```ts
// Step 1 — identify faces (sync)
const faces = await kling.identifyFace({ video_id: 'xxx' })
// faces.session_id, faces.face_data[0].face_id

// Step 2a — TTS to get audio_id (sync)
const audio = await kling.tts({ text: 'Hello world', voice_id: '...', voice_language: 'en' })
// audio.audios[0].id

// Step 2b — lip sync
const result = await kling.lipSyncAudioToVideo({
  session_id: faces.session_id,
  face_choose: [{
    face_id: faces.face_data[0].face_id,
    audio_id: audio.audios[0].id,
    sound_start_time: 0,
    sound_end_time: 3000,
    sound_insert_time: 0,
  }],
})
```

---

### TTS — `POST /v1/audio/tts` (sync)

```ts
const result = await kling.tts({
  text: 'Hello, welcome to our platform.',
  voice_id: '870470675470499933',
  voice_language: 'en',
  voice_speed: 1.0,
})
// result.audios[0].id  ← use as audio_id in lip sync
// result.audios[0].url ← direct audio URL
```

---

### Video to Audio — `POST /v1/audio/video-to-audio`

```ts
const result = await kling.videoToAudio({
  video_url: 'https://...',
  sound_effect_prompt: 'city ambience',
})
// result.videos[0].url, result.audios[0].url_mp3
```

---

### Text to Audio — `POST /v1/audio/text-to-audio`

```ts
const result = await kling.textToAudio({ prompt: 'Rain on a rooftop', duration: 10 })
```

---

### Effects — `POST /v1/videos/effects`

| Function | Mode |
|----------|------|
| `effectsV1Standard` | std |
| `effectsV1_5Pro` | pro |
| `effectsV1_6Pro` | pro |
| `effectsV1_6Standard` | std |

```ts
const result = await kling.effectsV1_6Pro({
  effect_scene: 'hug',
  input: { images: ['https://...person1', 'https://...person2'] },
})
```

---

### Motion Control — `POST /v1/videos/motion-control`

| Function | Model | Mode |
|----------|-------|------|
| `motionControlV2_6Pro` | kling-v2-6 | pro |
| `motionControlV2_6Standard` | kling-v2-6 | std |
| `motionControlV3Pro` | kling-v3 | pro |
| `motionControlV3Standard` | kling-v3 | std |

---

### Images — `POST /v1/images/generations` and `/v1/images/omni-image`

| Function | Endpoint | Model |
|----------|----------|-------|
| `imageV3TextToImage` | /generations | kling-v3 |
| `imageV3ImageToImage` | /generations | kling-v3 |
| `imageO1` | /omni-image | kling-image-o1 |
| `imageO3TextToImage` | /omni-image | kling-v3-omni |
| `imageO3ImageToImage` | /omni-image | kling-v3-omni |

---

### Virtual Try-On — `POST /v1/images/kolors-virtual-try-on`

```ts
const result = await kling.virtualTryOn({ human_image: 'https://...', cloth_image: 'https://...' })
```

---

### Reference to Image — `POST /v1/images/multi-image2image`

```ts
const result = await kling.referenceToImage({
  subject_image_list: [{ subject_image: 'https://...' }],
  prompt: 'On a beach at sunset',
  aspect_ratio: '16:9',
})
```

---

### Reference to Video — `POST /v1/videos/multi-image2video`

```ts
const result = await kling.referenceToVideo({
  image_list: [{ image: 'https://...' }],
  prompt: 'The subject walks toward the camera',
  duration: '5',
})
```

---

### Expand Image — `POST /v1/images/editing/expand`

```ts
const result = await kling.expandImage({
  image: 'https://...',
  up_expansion_ratio: 0.5,
  down_expansion_ratio: 0.5,
  left_expansion_ratio: 0,
  right_expansion_ratio: 0,
})
```

---

### Extend Video — `POST /v1/videos/video-extend`

```ts
const result = await kling.extendVideo({ video_id: 'xxx', prompt: 'Continue the scene' })
```

---

### Multi-Shot — `POST /v1/general/ai-multi-shot`

```ts
const result = await kling.multiShot({ element_frontal_image: 'https://...' })
// result.images[0].url_1 / url_2 / url_3
```

---

### Create Voice — `POST /v1/general/custom-voices`

```ts
const result = await kling.createVoice({ voice_name: 'Arash', voice_url: 'https://...' })
// result.voices[0].voice_id
```

---

### Element Management

```ts
// Create
const el = await kling.createElement({
  element_name: 'ash',
  element_description: 'a man with black hair, youtuber',
  reference_type: 'image_refer',
  element_image_list: { frontal_image: 'https://...' },
  element_voice_id: '870470675470499933',   // bind voice
})
// el.element_id

// List custom elements
const list = await kling.listElements({ pageNum: 1, pageSize: 20 })

// List preset elements
const presets = await kling.listPresetElements()

// Get single element creation task
const task = await kling.getElement('task_id')

// Delete
await kling.deleteElement({ element_id: '307723399526301' })
```

---

### Voice Management

```ts
// List custom voices
const voices = await kling.listVoices()

// List preset voices
const presets = await kling.listPresetVoices()

// Query single voice creation task
const task = await kling.queryVoice('task_id')

// Delete voice
await kling.deleteVoice('voice_id')
```

---

### Multi-Elements Video Workflow (6 steps)

```ts
// Step 1 — init
const init = await kling.initMultiElementsSelection({ video_url: 'https://...' })
// init.session_id, init.fps, init.total_frame

// Step 2 — select area by clicking points on a frame
const sel = await kling.addSelectionArea({
  session_id: init.session_id,
  frame_index: 0,
  points: [{ x: 0.5, y: 0.3 }],
})

// Step 3 — (optional) delete a selection
await kling.deleteSelectionArea({ session_id: init.session_id, frame_index: 0, points: [{ x: 0.5, y: 0.3 }] })

// Step 4 — (optional) clear all selections
await kling.clearSelectionArea({ session_id: init.session_id })

// Step 5 — preview mask overlay
const preview = await kling.previewSelection({ session_id: init.session_id })
// preview.video (masked video URL)

// Step 6 — generate
const result = await kling.generateMultiElementsVideo({
  session_id: init.session_id,
  edit_mode: 'swap',            // 'addition' | 'swap' | 'removal'
  image_list: [{ image: 'https://...' }],
  prompt: 'swap the jacket from <<<image_1>>> for the jacket in <<<video_1>>>',
  duration: '5',
})
```

---

### Account Costs — `GET /v1/account/costs`

```ts
const costs = await kling.accountCosts({
  start_time: Date.now() - 7 * 24 * 60 * 60 * 1000,
  end_time: Date.now(),
})
// costs.resource_pack_subscribe_infos[].remaining_quantity
```

---

### List & Get Task Queries

Every endpoint has a paired list and single-task getter:

| List function | Get function |
|---------------|-------------|
| `listTextToVideoTasks` | — |
| `listImageToVideoTasks` | `getImageToVideoTask(taskId)` |
| `listOmniVideoTasks` | `getOmniVideoTask(taskId)` |
| `listOmniImageTasks` | `getOmniImageTask(taskId)` |
| `listImageGenerationTasks` | `getImageGenerationTask(taskId)` |
| `listLipSyncTasks` | `getLipSyncTask(taskId)` |
| `listVideoEffectsTasks` | `getVideoEffectsTask(taskId)` |
| `listMotionControlTasks` | `getMotionControlTask(taskId)` |
| `listExtendVideoTasks` | `getExtendVideoTask(taskId)` |
| `listAvatarTasks` | `getAvatarTask(taskId)` |
| `listMultiShotTasks` | `getMultiShotTask(taskId)` |
| `listReferenceToImageTasks` | `getReferenceToImageTask(taskId)` |
| `listVirtualTryOnTasks` | `getVirtualTryOnTask(taskId)` |
| `listTextToAudioTasks` | `getTextToAudioTask(taskId)` |
| `listMultiElementsTasks` | `queryMultiElementsTask(taskId)` |

All list functions accept `{ pageNum?: number, pageSize?: number }` and return `KlingTaskListResult`.

---

## Error Types

| Class | When thrown |
|-------|------------|
| `KlingAuthError` | JWT/credential failure |
| `KlingRateLimitError` | 429 — includes `bodyCode` and `detail` |
| `KlingApiError` | Non-zero `code` in response body |
| `KlingTimeoutError` | Poll exceeded `timeout` ms |
| `KlingTaskFailedError` | Task reached `failed` status |
