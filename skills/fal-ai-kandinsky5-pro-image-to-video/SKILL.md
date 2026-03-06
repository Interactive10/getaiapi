---
name: fal-ai-kandinsky5-pro-image-to-video
description: >
  Use this skill for the fal.ai Kandinsky5 Pro model (fal-ai/kandinsky5-pro/image-to-video). Kandinsky 5.0 Pro is a diffusion model for fast, high-quality image-to-video generation.
---

# Kandinsky5 Pro

Kandinsky 5.0 Pro is a diffusion model for fast, high-quality image-to-video generation.

**Endpoint:** `fal-ai/kandinsky5-pro/image-to-video`
**Source:** https://fal.ai/models/fal-ai/kandinsky5-pro/image-to-video/api

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

const result = await fal.subscribe("fal-ai/kandinsky5-pro/image-to-video", {
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `duration` | string | No | `"5s"` | Video duration. |
| `acceleration` | enum: `none`, `regular` | null | No | `"regular"` | Acceleration level for faster generation. |
| `resolution` | enum: `512P`, `1024P` | No | `"512P"` | Video resolution: 512p or 1024p. |
| `num_inference_steps` | integer | No | `28` |  |
| `image_url` | string | **Yes** |  | The URL of the image to use as a reference for the video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | null | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kandinsky5-pro/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kandinsky5-pro/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kandinsky5-pro/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kandinsky5-pro/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kandinsky5-pro/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
