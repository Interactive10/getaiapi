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

69 models across 20 endpoints. Each model is a typed function with Kling-native field names.

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
  voice_list?: Array<{ voice_id: string }>
  element_list?: Array<{ id: string; image: string }>
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
  element_list?: Array<{ id: string; image: string }>
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
  element_list?: Array<{ id: string; image: string }>
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

```typescript
const result = await kling.videoToAudio({
  video_url: 'https://example.com/video.mp4',
  sound_effect_prompt: 'ocean waves crashing',
})
```

**Input: `VideoToAudioInput`**

```typescript
{
  video_url: string           // required
  sound_effect_prompt?: string
}
```

### Text to Audio

```typescript
const result = await kling.textToAudio({
  prompt: 'thunderstorm with heavy rain',
  duration: '10',
})
```

**Input: `TextToAudioInput`**

```typescript
{
  prompt: string              // required
  duration?: string
}
```

### Voice Clone

```typescript
const result = await kling.createVoice({
  voice_url: 'https://example.com/sample.mp3',
})
```

**Input: `CreateVoiceInput`**

```typescript
{
  voice_url: string           // required
}
```

### Multi-Shot

Generate multi-angle reference images from a frontal image.

```typescript
const result = await kling.multiShot({
  element_frontal_image: 'https://example.com/face.jpg',
})
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

### Identify Face

Detect faces in a video for lip-sync targeting.

```typescript
const result = await kling.identifyFace({
  video_url: 'https://example.com/video.mp4',
})
// result.data contains face_list with face_id values
```

**Input: `IdentifyFaceInput`**

```typescript
{
  video_url: string           // required
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

## Output Types

All functions return typed results based on output modality:

```typescript
// Video endpoints
interface KlingVideoResult {
  task_id: string
  videos: Array<{ id: string; url: string; duration: string }>
}

// Image endpoints
interface KlingImageResult {
  task_id: string
  images: Array<{ index: number; url: string }>
}

// Audio endpoints
interface KlingAudioResult {
  task_id: string
  audios: Array<{ id: string; url: string; duration?: string }>
}

// JSON endpoints (identifyFace, imageRecognize)
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

Sync endpoints (`tts`, `imageRecognize`) return immediately regardless of these settings.

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
