---
name: fal-ai-live-avatar
description: >
  Use this skill for the fal.ai Live Avatar model (fal-ai/live-avatar). Real-time avatar generation with Live Avatar. Have natural face-to-face conversations with AI avatars that respond instantly—streaming infinite-length video with immediate visual feedback.
---

# Live Avatar

Real-time avatar generation with Live Avatar. Have natural face-to-face conversations with AI avatars that respond instantly—streaming infinite-length video with immediate visual feedback.

**Endpoint:** `fal-ai/live-avatar`
**Source:** https://fal.ai/models/fal-ai/live-avatar/api

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

const result = await fal.subscribe("fal-ai/live-avatar", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | A text prompt describing the scene and character. Helps guide the video generation style and context. |
| `frames_per_clip` | integer | No | `48` | Number of frames per clip. Must be a multiple of 4. Higher values = smoother but slower generation. |
| `acceleration` | enum: `none`, `light`, `regular`, `high` | No | `"none"` | Acceleration level for faster video decoding |
| `image_url` | string | **Yes** |  | The URL of the reference image for avatar generation. The character in this image will be animated. |
| `num_clips` | integer | No | `10` | Number of video clips to generate. Each clip is approximately 3 seconds. Set higher for longer videos. |
| `enable_safety_checker` | boolean | No | `true` | Enable safety checker for content moderation. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. |
| `guidance_scale` | float | No | `0` | Classifier-free guidance scale. Higher values follow the prompt more closely. |
| `audio_url` | string | **Yes** |  | The URL of the driving audio file (WAV or MP3). The avatar will be animated to match this audio. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/live-avatar", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/live-avatar", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/live-avatar", {
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

- API page: https://fal.ai/models/fal-ai/live-avatar/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/live-avatar
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
