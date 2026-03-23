---
name: fal-ai-longcat-multi-avatar-image-audio-to-video
description: >
  Use this skill for the fal.ai Longcat Multi Avatar model (fal-ai/longcat-multi-avatar/image-audio-to-video). LongCat-Video-Avatar is an audio-driven video generation model that can generates super-realistic, lip-synchronized long video generation with natural dynamics and consistent identity.
---

# Longcat Multi Avatar

LongCat-Video-Avatar is an audio-driven video generation model that can generates super-realistic, lip-synchronized long video generation with natural dynamics and consistent identity.

**Endpoint:** `fal-ai/longcat-multi-avatar/image-audio-to-video`
**Source:** https://fal.ai/models/fal-ai/longcat-multi-avatar/image-audio-to-video/api

---

## Quick Start

### 1. Install the Client

```bash
npm install --save @fal-ai/client
```

### 2. Set Your API Key

```bash
export FAL_KEY="YOUR_API_KEY"
```

### 3. Submit a Request

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/longcat-multi-avatar/image-audio-to-video", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((l) => l.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

---

## Authentication

Set the `FAL_KEY` environment variable, or configure in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

> **Important:** When running client-side, use a server-side proxy to protect your API key.

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | string | No | `"Two people are having a conversation with natural expressions and movements."` | The prompt to guide the video generation. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `audio_url_person2` | string | null | No | `"https://raw.githubusercontent.com/meituan-longcat/LongCat-Video/refs/heads/main/assets/avatar/multi/sing_woman.WAV"` | The URL of the audio file for person 2 (right side). |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable safety checker. |
| `bbox_person1` | BoundingBox | null | No |  | Bounding box for person 1. If not provided, defaults to left half of image. |
| `negative_prompt` | string | No | `"Close-up, Bright tones, overexposed, static, blurred details, subtitles, style, works, paintings, images, static, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, misshapen limbs, fused fingers, still picture, messy background, three legs, many people in the background, walking backwards"` | The negative prompt to avoid in the video generation. |
| `text_guidance_scale` | float | No | `4` | The text guidance scale for classifier-free guidance. |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of the generated video (480p or 720p). Billing is per video-second (16 frames): 480p is 1 unit per second ... |
| `audio_type` | enum: `para`, `add` | No | `"para"` | How to combine the two audio tracks. 'para' (parallel) plays both simultaneously, 'add' (sequential) plays person 1 f... |
| `image_url` | string | **Yes** |  | The URL of the image containing two speakers. |
| `audio_url_person1` | string | null | No | `"https://raw.githubusercontent.com/meituan-longcat/LongCat-Video/refs/heads/main/assets/avatar/multi/sing_man.WAV"` | The URL of the audio file for person 1 (left side). |
| `audio_guidance_scale` | float | No | `4` | The audio guidance scale. Higher values may lead to exaggerated mouth movements. |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to use. |
| `bbox_person2` | BoundingBox | null | No |  | Bounding box for person 2. If not provided, defaults to right half of image. |
| `num_segments` | integer | No | `1` | Number of video segments to generate. Each segment adds ~5 seconds of video. First segment is ~5.8s, additional segme... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/longcat-multi-avatar/image-audio-to-video", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/longcat-multi-avatar/image-audio-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/longcat-multi-avatar/image-audio-to-video", {
  requestId: "<request_id>",
});
console.log(result.data);
```

---

## Tips

- Use `fal.subscribe` for quick scripts; use queue API for production workloads.
- Set `webhookUrl` on queue submit to get notified when processing completes.
- File inputs accept URLs, Base64 data URIs, or uploaded files via `fal.storage.upload(file)`.

## References

- API page: https://fal.ai/models/fal-ai/longcat-multi-avatar/image-audio-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/longcat-multi-avatar/image-audio-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
