---
name: fal-ai-stable-avatar
description: >
  Use this skill for the fal.ai Stable Avatar model (fal-ai/stable-avatar). Stable Avatar generates audio-driven video avatars up to five minutes long
---

# Stable Avatar

Stable Avatar generates audio-driven video avatars up to five minutes long

**Endpoint:** `fal-ai/stable-avatar`
**Source:** https://fal.ai/models/fal-ai/stable-avatar/api

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

const result = await fal.subscribe("fal-ai/stable-avatar", {
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
| `prompt` | string | **Yes** |  | The prompt to use for the video generation. |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16`, `auto` | No | `"auto"` | The aspect ratio of the video to generate. If 'auto', the aspect ratio will be determined by the reference image. |
| `perturbation` | float | No | `0.1` | The amount of perturbation to use for the video generation. 0.0 means no perturbation, 1.0 means full perturbation. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a reference for the video generation. |
| `guidance_scale` | float | No | `5` | The guidance scale to use for the video generation. |
| `seed` | integer | No |  | The seed to use for the video generation. |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to use for the video generation. |
| `audio_url` | string | **Yes** |  | The URL of the audio to use as a reference for the video generation. |
| `audio_guidance_scale` | float | No | `4` | The audio guidance scale to use for the video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/stable-avatar", {
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
const status = await fal.queue.status("fal-ai/stable-avatar", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/stable-avatar", {
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

- API page: https://fal.ai/models/fal-ai/stable-avatar/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/stable-avatar
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
