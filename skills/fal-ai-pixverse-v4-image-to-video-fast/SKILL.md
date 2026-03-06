---
name: fal-ai-pixverse-v4-image-to-video-fast
description: >
  Use this skill for the fal.ai PixVerse v4: Image to Video Fast model (fal-ai/pixverse/v4/image-to-video/fast). Generate fast high quality video clips from text and image prompts using PixVerse v4
---

# PixVerse v4: Image to Video Fast

Generate fast high quality video clips from text and image prompts using PixVerse v4

**Endpoint:** `fal-ai/pixverse/v4/image-to-video/fast`
**Source:** https://fal.ai/models/fal-ai/pixverse/v4/image-to-video/fast/api

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

const result = await fal.subscribe("fal-ai/pixverse/v4/image-to-video/fast", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  |  |
| `resolution` | enum: `360p`, `540p`, `720p` | No | `"720p"` | The resolution of the generated video |
| `style` | enum: `anime`, `3d_animation`, `clay`, `comic`, `cyberpunk` | null | No |  | The style of the generated video |
| `camera_movement` | enum (20 values) | null | No |  | The type of camera movement to apply to the video |
| `image_url` | string | **Yes** |  | URL of the image to use as the first frame |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same video every... |
| `negative_prompt` | string | No | `""` | Negative prompt to be used for the generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pixverse/v4/image-to-video/fast", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pixverse/v4/image-to-video/fast", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pixverse/v4/image-to-video/fast", {
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

- API page: https://fal.ai/models/fal-ai/pixverse/v4/image-to-video/fast/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pixverse/v4/image-to-video/fast
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
