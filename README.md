# getaiapi

**Typed AI provider SDKs. One import per provider.**

[![npm version](https://img.shields.io/npm/v/getaiapi)](https://www.npmjs.com/package/getaiapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

Each AI provider gets a typed namespace with one function per model. No generic `generate()`, no model strings, no mapping layers. What you type is what gets sent.

## Install

```bash
npm install getaiapi
```

## Kling AI

69 generation models plus 45 management, list, and query functions. Each model is a typed function with Kling-native field names.

### Setup

```bash
export KLING_ACCESS_KEY="your-access-key"
export KLING_SECRET_KEY="your-secret-key"
```

Or configure programmatically:

```typescript
import { kling } from 'getaiapi'

kling.configure({ accessKey: '...', secretKey: '...' })
```

### Text to Video

9 models: V1 Standard, V1.6 Pro/Standard, V2 Master, V2.1 Master, V2.5 Turbo Pro, V2.6 Pro, V3 Pro/Standard.

```typescript
import { kling } from 'getaiapi'

const result = await kling.textToVideoV3Pro({
  prompt: 'a golden retriever running on a beach at sunset',
  duration: '5',
  aspect_ratio: '16:9',
  sound: 'on',
})

console.log(result.videos[0].url)
```

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

**Input: `TextToVideoInput`**

```typescript
{
  prompt: string              // required
  negative_prompt?: string
  duration?: string           // '5' or '10'
  aspect_ratio?: string       // '16:9', '9:16', '1:1'
  cfg_scale?: number
  sound?: 'on' | 'off'       // generate audio
}
```

### Image to Video

13 models: V1 Standard, V1.5 Pro, V1.6 Pro/Standard, V2 Master, V2.1 Master/Pro/Standard, V2.5 Turbo Pro/Standard, V2.6 Pro, V3 Pro/Standard.

```typescript
const result = await kling.imageToVideoV3Pro({
  image: 'https://example.com/photo.jpg',
  prompt: 'animate this photo with gentle wind',
  duration: '5',
})
```

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

**Input: `ImageToVideoInput`**

```typescript
{
  image: string               // required — URL or base64
  prompt?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  image_tail?: string         // end frame image URL
  voice_list?: Array<{ voice_id: string }>   // mutually exclusive with element_list
  element_list?: Array<{ element_id: number }> // mutually exclusive with voice_list
}
```

### Omni Video

17 models across O1 and O3 variants. Supports text-to-video, image-to-video, reference-to-video, video editing, and video reference — all through one endpoint.

```typescript
const result = await kling.omniVideoO3ProTextToVideo({
  prompt: 'a cyberpunk city at night',
  duration: '5',
  aspect_ratio: '16:9',
})
```

| Function | Model | Mode |
|----------|-------|------|
| `omniVideoO1ImageToVideo` | kling-video-o1 | — |
| `omniVideoO1ReferenceToVideo` | kling-video-o1 | — |
| `omniVideoO1StandardImageToVideo` | kling-video-o1 | std |
| `omniVideoO1StandardReferenceToVideo` | kling-video-o1 | std |
| `omniVideoO1StandardVideoEdit` | kling-video-o1 | std |
| `omniVideoO1StandardVideoReference` | kling-video-o1 | std |
| `omniVideoO1VideoEdit` | kling-video-o1 | — |
| `omniVideoO1VideoReference` | kling-video-o1 | — |
| `omniVideoO3ProImageToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProReferenceToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProTextToVideo` | kling-v3-omni | pro |
| `omniVideoO3ProVideoEdit` | kling-v3-omni | pro |
| `omniVideoO3ProVideoReference` | kling-v3-omni | pro |
| `omniVideoO3StandardReferenceToVideo` | kling-v3-omni | std |
| `omniVideoO3StandardTextToVideo` | kling-v3-omni | std |
| `omniVideoO3StandardVideoEdit` | kling-v3-omni | std |
| `omniVideoO3StandardVideoReference` | kling-v3-omni | std |

**Input: `OmniVideoInput`**

```typescript
{
  prompt: string              // required
  image?: string
  negative_prompt?: string
  duration?: string
  aspect_ratio?: string
  cfg_scale?: number
  sound?: 'on' | 'off'
  element_list?: Array<{ element_id: number }>
}
```

### Image Generation

2 models on `v1/images/generations` and 3 models on `v1/images/omni-image`.

```typescript
const result = await kling.imageO1({
  prompt: 'a watercolor painting of a mountain lake',
  n: 2,
  aspect_ratio: '16:9',
})

console.log(result.images[0].url)
```

| Function | Endpoint | Model |
|----------|----------|-------|
| `imageV3TextToImage` | generations | kling-v3 |
| `imageV3ImageToImage` | generations | kling-v3 |
| `imageO1` | omni-image | kling-image-o1 |
| `imageO3TextToImage` | omni-image | kling-v3-omni |
| `imageO3ImageToImage` | omni-image | kling-v3-omni |

**Input: `ImageGenerationInput` / `OmniImageInput`**

```typescript
{
  prompt: string              // required
  image?: string              // for image-to-image
  n?: number                  // number of outputs
  aspect_ratio?: string
}
```

### Virtual Try-On

```typescript
const result = await kling.virtualTryOn({
  human_image: 'https://example.com/person.jpg',
  cloth_image: 'https://example.com/shirt.jpg',
})
```

**Input: `VirtualTryOnInput`**

```typescript
{
  human_image: string         // required
  cloth_image: string         // required
}
```

### AI Avatar

4 models: V1 Pro/Standard, V2 Pro/Standard.

```typescript
const result = await kling.avatarV2Pro({
  image: 'https://example.com/portrait.jpg',
  sound_file: 'https://example.com/speech.mp3',
  prompt: 'talking head presentation',
})
```

| Function | Mode |
|----------|------|
| `avatarV1Pro` | pro |
| `avatarV1Standard` | std |
| `avatarV2Pro` | pro |
| `avatarV2Standard` | std |

**Input: `AvatarInput`**

```typescript
{
  image: string               // required — portrait image
  sound_file?: string         // audio for lip sync
  prompt?: string
}
```

### Lip Sync

```typescript
const result = await kling.lipSyncAudioToVideo({
  sound_file: 'https://example.com/speech.mp3',
})
```

| Function | Description |
|----------|-------------|
| `lipSyncAudioToVideo` | Audio-driven lip sync |
| `lipSyncTextToVideo` | Text-driven lip sync |

**Input: `LipSyncInput`**

```typescript
{
  sound_file?: string         // audio URL
}
```

### Video Effects

4 models: V1 Standard, V1.5 Pro, V1.6 Pro/Standard.

```typescript
const result = await kling.effectsV1_6Pro({
  image: 'https://example.com/photo.jpg',
})
```

| Function |
|----------|
| `effectsV1Standard` |
| `effectsV1_5Pro` |
| `effectsV1_6Pro` |
| `effectsV1_6Standard` |

**Input: `EffectsInput`**

```typescript
{
  image: string               // required
}
```

### Motion Control

4 models: V2.6 Pro/Standard, V3 Pro/Standard.

```typescript
const result = await kling.motionControlV3Pro({
  image_url: 'https://example.com/scene.jpg',
  prompt: 'camera pan left',
})
```

| Function | Model | Mode |
|----------|-------|------|
| `motionControlV2_6Pro` | kling-v2-6 | pro |
| `motionControlV2_6Standard` | kling-v2-6 | std |
| `motionControlV3Pro` | kling-v3 | pro |
| `motionControlV3Standard` | kling-v3 | std |

**Input: `MotionControlInput`**

```typescript
{
  image_url: string           // required
  video_url?: string
  prompt?: string
  keep_original_sound?: boolean
  character_orientation?: string
  element_list?: Array<{ element_id: number }>
}
```

### Text to Speech (Sync)

Returns immediately — no polling.

```typescript
const result = await kling.tts({ text: 'Hello world' })
console.log(result.audios[0].url)
```

**Input: `TtsInput`**

```typescript
{
  text: string                // required
}
```

### Video to Audio

Generates audio for a video. Returns both the merged video and the generated audio tracks.

```typescript
const result = await kling.videoToAudio({
  video_url: 'https://example.com/video.mp4',
  sound_effect_prompt: 'ocean waves crashing',
})

console.log(result.videos[0].url)       // merged video with audio
console.log(result.audios[0].url_mp3)   // audio track (mp3)
console.log(result.audios[0].url_wav)   // audio track (wav)
```

**Input: `VideoToAudioInput`**

```typescript
{
  video_url?: string          // mutually exclusive with video_id
  video_id?: string           // mutually exclusive with video_url
  sound_effect_prompt?: string
  bgm_prompt?: string         // background music prompt
  asmr_mode?: boolean         // enhanced detailed sound effects
}
```

### Text to Audio

```typescript
const result = await kling.textToAudio({
  prompt: 'thunderstorm with heavy rain',
  duration: 5.0,
})

console.log(result.audios[0].url)       // normalized from url_mp3
console.log(result.audios[0].url_mp3)   // mp3 URL
console.log(result.audios[0].url_wav)   // wav URL
```

**Input: `TextToAudioInput`**

```typescript
{
  prompt: string              // required
  duration: number            // required — 3.0 to 10.0
}
```

### Voice Clone

```typescript
const result = await kling.createVoice({
  voice_name: 'my-voice',
  voice_url: 'https://example.com/sample.mp3',
})

console.log(result.voices[0].voice_id)
console.log(result.voices[0].trial_url)
```

**Input: `CreateVoiceInput`**

```typescript
{
  voice_name: string          // required
  voice_url?: string          // audio sample URL
  video_id?: string           // or extract from video
}
```

### Multi-Shot

Generate multi-angle reference images from a frontal image. Each image returns 3 angle variants.

```typescript
const result = await kling.multiShot({
  element_frontal_image: 'https://example.com/face.jpg',
})

console.log(result.images[0].url_1)  // angle 1
console.log(result.images[0].url_2)  // angle 2
console.log(result.images[0].url_3)  // angle 3
```

**Input: `MultiShotInput`**

```typescript
{
  element_frontal_image: string  // required
}
```

### Reference to Image

```typescript
const result = await kling.referenceToImage({
  prompt: 'portrait in watercolor style',
  n: 2,
})
```

**Input: `ReferenceToImageInput`**

```typescript
{
  prompt: string              // required
  n?: number
  aspect_ratio?: string
}
```

### Expand Image

Outpainting — expand an image beyond its borders.

```typescript
const result = await kling.expandImage({
  image: 'https://example.com/photo.jpg',
  prompt: 'extend the landscape',
})
```

**Input: `ExpandImageInput`**

```typescript
{
  image: string               // required
  prompt?: string
  n?: number
}
```

### Extend Video

Continue a video beyond its last frame.

```typescript
const result = await kling.extendVideo({
  prompt: 'the camera continues to pan right',
})
```

**Input: `ExtendVideoInput`**

```typescript
{
  prompt?: string
  negative_prompt?: string
}
```

### Identify Face (Sync)

Detect faces in a video for lip-sync targeting. Returns immediately — no polling.

```typescript
const result = await kling.identifyFace({
  video_url: 'https://example.com/video.mp4',
})

console.log(result.session_id)
result.face_data.forEach(face => {
  console.log(face.face_id, face.face_image, face.start_time, face.end_time)
})
```

**Input: `IdentifyFaceInput`**

```typescript
{
  video_url?: string          // mutually exclusive with video_id
  video_id?: string           // mutually exclusive with video_url
}
```

### Image Recognize (Sync)

Returns immediately — no polling.

```typescript
const result = await kling.imageRecognize({
  image: 'https://example.com/photo.jpg',
})
```

**Input: `ImageRecognizeInput`**

```typescript
{
  image: string               // required
}
```

### Account Costs

Query resource package balances under your account. Free to call; QPS ≤ 1. Note: `remaining_quantity` has a 12-hour reporting delay.

```typescript
const result = await kling.accountCosts({
  start_time: Date.now() - 86_400_000, // last 24h
  end_time: Date.now(),
})

for (const pack of result.resource_pack_subscribe_infos) {
  console.log(pack.resource_pack_name, pack.remaining_quantity, pack.status)
}
```

**Input: `AccountCostsInput`**

```typescript
{
  start_time: number             // required — Unix ms
  end_time: number               // required — Unix ms
  resource_pack_name?: string    // optional — filter by exact package name
}
```

**Output: `AccountCostsResult`**

```typescript
{
  resource_pack_subscribe_infos: Array<{
    resource_pack_name: string
    resource_pack_id: string
    resource_pack_type: 'decreasing_total' | 'constant_period'
    total_quantity: number
    remaining_quantity: number   // 12h delay
    purchase_time: number
    effective_time: number
    invalid_time: number
    status: 'toBeOnline' | 'online' | 'expired' | 'runOut'
  }>
}
```

### Element Library

Create reusable characters/objects (elements) from images or video, then reference them in generation tasks via `element_list`.

```typescript
// Create a custom element (async — polls until ready)
const el = await kling.createElement({
  element_name: 'My Character',
  element_description: 'A hero in a red cape',
  reference_type: 'image_refer',
  element_image_list: {
    frontal_image: 'https://example.com/frontal.jpg',
    refer_images: [{ image_url: 'https://example.com/side.jpg' }],
  },
})

// Use element_id in video generation
await kling.imageToVideoV3Pro({
  image: 'https://example.com/scene.jpg',
  prompt: 'Character walks forward',
  element_list: [{ element_id: Number(el.element_id) }],
})

// List all custom elements (paginated)
const { elements } = await kling.listElements({ pageNum: 1, pageSize: 30 })

// List official preset elements
const { elements: presets } = await kling.listPresetElements()

// Delete a custom element
await kling.deleteElement({ element_id: el.element_id })
```

**`createElement` input: `CreateElementInput`**

```typescript
{
  element_name: string                          // required — max 20 chars
  element_description: string                   // required — max 100 chars
  reference_type: 'image_refer' | 'video_refer' // required
  element_image_list?: {                        // required when image_refer
    frontal_image: string                       // front-facing image URL or base64
    refer_images?: Array<{ image_url: string }> // 1–3 additional angles
  }
  element_video_list?: {                        // required when video_refer
    refer_videos: Array<{ video_url: string }>  // 1 video, .mp4/.mov, 3–8s
  }
  element_voice_id?: string
  tag_list?: Array<{ tag_id: string }>          // o_101–o_108
  callback_url?: string
  external_task_id?: string
  timeout?: number                              // poll timeout ms
}
```

**`createElement` output: `ElementResult`**

```typescript
{
  element_id: string
  element_name: string
  element_description: string
  reference_type: 'image_refer' | 'video_refer'
  status: string
  owned_by?: string
  element_voice_id?: string
  tag_list?: Array<{ tag_id: string; tag_name?: string }>
  element_image_list?: { frontal_image: string; refer_images?: Array<{ image_url: string }> }
  element_video_list?: { refer_videos: Array<{ video_url: string }> }
}
```

### Voice Management

```typescript
import { kling } from 'getaiapi'

// List custom voices (paginated)
const { voices } = await kling.listVoices({ pageNum: 1, pageSize: 30 })

// List preset voices from Kling's library
const { voices: presets } = await kling.listPresetVoices()

// Query a single voice creation task
const result = await kling.queryVoice('task-id')

// Delete a custom voice
await kling.deleteVoice('voice-id')
```

### Character Speaking with Custom Voice

`element_list` and `voice_list` are mutually exclusive on all video endpoints — you cannot pass both at once. To get a character (element) to speak in their own custom voice, use a two-step approach: generate TTS audio first, then drive an avatar with the character's image.

**Use case A — Character video with custom voice (avatar)**

```typescript
import { kling } from 'getaiapi'

// Step 1: Generate speech audio from your custom voice
const audio = await kling.tts({
  text: 'Hello, welcome to my world.',
  voice_id: 'your-custom-voice-id',
  voice_language: 'en',
})

// Step 2: Animate the character image with that audio (lip-synced)
const video = await kling.avatarV2Pro({
  image: element.element_image_list.frontal_image, // element's frontal image
  audio_id: audio.audios[0].id,                   // TTS result audio ID
  prompt: 'looking at the camera, friendly expression',
})

console.log(video.videos[0].url)
```

**Use case B — Character video with element (no custom voice)**

When you only need visual character consistency and don't need a specific voice:

```typescript
const video = await kling.imageToVideoV3Pro({
  image: 'https://example.com/scene.jpg',
  prompt: 'Character walks through a forest',
  element_list: [{ element_id: Number(el.element_id) }],
  sound: 'on',  // Kling generates audio automatically
})
```

**Use case C — Character video with voice (no element)**

When you only need a specific voice track and don't need element-based character consistency:

```typescript
const video = await kling.imageToVideoV3Pro({
  image: 'https://example.com/character.jpg',
  prompt: '<<<voice_1>>> Hello, welcome to my world.',
  voice_list: [{ voice_id: 'your-custom-voice-id' }],
})
```

### Multi-Elements Video Workflow

```typescript
import { kling } from 'getaiapi'

// Step 1: Initialize video
const { session_id } = await kling.initMultiElementsSelection({ video_url: 'https://...' })

// Step 2: Click points to select an area
await kling.addSelectionArea({ session_id, frame_index: 10, points: [{ x: 0.5, y: 0.5 }] })

// Step 5: Preview selection
const preview = await kling.previewSelection({ session_id })

// Step 6: Generate edited video (polls until complete)
const video = await kling.generateMultiElementsVideo({
  session_id,
  edit_mode: 'swap',
  image_list: [{ image: 'https://...' }],
  prompt: 'swap <<<image_1>>> for element from <<<video_1>>>',
})
```

### List & Query Historical Tasks

Every generation endpoint has a list function (paginated) and a single-task query function:

```typescript
// List recent tasks (all generation types)
const { tasks } = await kling.listImageToVideoTasks({ pageNum: 1, pageSize: 20 })
const { tasks: videoTasks } = await kling.listTextToAudioTasks()

// Query a single task result by ID (returns same typed result as the generation function)
const video = await kling.getImageToVideoTask('task-id')     // KlingVideoResult
const audio = await kling.getTextToAudioTask('task-id')      // KlingAudioResult
const image = await kling.getImageGenerationTask('task-id')  // KlingImageResult
```

Available list functions: `listLipSyncTasks`, `listTextToAudioTasks`, `listVideoEffectsTasks`, `listImageGenerationTasks`, `listOmniVideoTasks`, `listMultiShotTasks`, `listImageToVideoTasks`, `listOmniImageTasks`, `listReferenceToImageTasks`, `listVirtualTryOnTasks`, `listMotionControlTasks`, `listExtendVideoTasks`, `listAvatarTasks`.

Available query functions: `getLipSyncTask`, `getTextToAudioTask`, `getVideoEffectsTask`, `getImageGenerationTask`, `getOmniVideoTask`, `getMultiShotTask`, `getImageToVideoTask`, `getOmniImageTask`, `getReferenceToImageTask`, `getVirtualTryOnTask`, `getMotionControlTask`, `getExtendVideoTask`, `getAvatarTask`.

## Output Types

All functions return typed results based on output modality:

```typescript
// Video endpoints (textToVideo, imageToVideo, omniVideo, avatar, lipSync, effects, motionControl, extendVideo)
interface KlingVideoResult {
  task_id: string
  videos: Array<{ id: string; url: string; duration: string }>
}

// Image endpoints (imageGeneration, omniImage, virtualTryOn, referenceToImage, expandImage)
interface KlingImageResult {
  task_id: string
  images: Array<{ index: number; url: string }>
}

// Audio endpoints (tts, textToAudio)
interface KlingAudioResult {
  task_id: string
  audios: Array<{ id: string; url: string; url_mp3?: string; url_wav?: string; duration?: string; duration_mp3?: string; duration_wav?: string }>
}

// Multi-shot endpoint — 3 angle URLs per image
interface KlingMultiShotResult {
  task_id: string
  images: Array<{ index: number; url_1: string; url_2: string; url_3: string }>
}

// Voice clone endpoint
interface KlingVoiceResult {
  task_id: string
  voices: Array<{ voice_id: string; voice_name: string; trial_url: string; owned_by: string }>
}

// Video-to-audio endpoint — merged video + generated audio
interface KlingVideoAudioResult {
  task_id: string
  videos: Array<{ id: string; url: string; duration: string }>
  audios: Array<{ id: string; url_mp3?: string; url_wav?: string; duration_mp3?: string; duration_wav?: string }>
}

// Face detection (identifyFace) — sync, no task_id
interface KlingFaceResult {
  session_id: string
  face_data: Array<{ face_id: string; face_image: string; start_time: number; end_time: number }>
}

// Generic JSON (imageRecognize)
interface KlingJsonResult {
  task_id: string
  data: unknown
}
```

## Polling Control

All functions accept optional polling parameters:

```typescript
await kling.textToVideoV3Pro({
  prompt: 'a sunset',
  timeout: 600_000,     // max wait time in ms (default: 300_000 = 5 min)
  pollInterval: 5_000,  // poll frequency in ms (default: 3_000)
})
```

Sync endpoints (`tts`, `imageRecognize`, `identifyFace`) return immediately regardless of these settings.

## Extra Parameters

All input types accept additional Kling-native fields via index signature. Pass any parameter the Kling API supports:

```typescript
await kling.textToVideoV3Pro({
  prompt: 'a sunset',
  camera_control: { type: 'simple', config: { horizontal: 5 } },
  callback_url: 'https://example.com/webhook',
})
```

## Error Handling

```typescript
import { kling, KlingAuthError, KlingTimeoutError, KlingTaskFailedError } from 'getaiapi'

try {
  await kling.textToVideoV3Pro({ prompt: 'test' })
} catch (err) {
  if (err instanceof KlingAuthError) {
    // Missing or invalid credentials
  }
  if (err instanceof KlingTimeoutError) {
    // Task took too long (increase timeout)
  }
  if (err instanceof KlingTaskFailedError) {
    // Kling rejected the task (content violation, bad params, etc.)
    console.error(err.taskId, err.message)
  }
}
```

| Error | Code | When |
|-------|------|------|
| `KlingAuthError` | `AUTH_ERROR` | Missing credentials or 401 response |
| `KlingRateLimitError` | `RATE_LIMIT` | HTTP 429 or body codes 1100-1102 |
| `KlingApiError` | `API_ERROR` | Provider returned an error |
| `KlingTimeoutError` | `TIMEOUT` | Polling exceeded timeout |
| `KlingTaskFailedError` | `TASK_FAILED` | Task status is 'failed' |

All errors extend `KlingError` which extends `Error`.

## Deprecated: v1 Unified Gateway

The previous `generate()`, `submit()`, `poll()` APIs and the multi-provider registry are deprecated but still exported for backward compatibility. They will be removed in the next major version.

```typescript
// Deprecated — still works but will be removed
import { generate } from 'getaiapi'
await generate({ model: 'flux-schnell', prompt: '...' })

// New — use provider-specific typed functions
import { kling } from 'getaiapi'
await kling.textToVideoV3Pro({ prompt: '...' })
```

## License

MIT
