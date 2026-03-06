---
name: fal-ai-kling-image-v3-image-to-image
description: >
  Use this skill for the fal.ai Kling Image model (fal-ai/kling-image/v3/image-to-image). Kling Image V3: Latest kling image model
---

# Kling Image

Kling Image V3: Latest kling image model

**Endpoint:** `fal-ai/kling-image/v3/image-to-image`
**Source:** https://fal.ai/models/fal-ai/kling-image/v3/image-to-image/api

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

const result = await fal.subscribe("fal-ai/kling-image/v3/image-to-image", {
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
| `prompt` | string | **Yes** |  | Text prompt for image generation. Max 2500 characters. |
| `aspect_ratio` | enum (8 values) | No | `"16:9"` | Aspect ratio of generated images. |
| `resolution` | enum: `1K`, `2K` | No | `"1K"` | Image generation resolution. 1K: standard, 2K: high-res. |
| `num_images` | integer | No | `1` | Number of images to generate (1-9). |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | Reference image for image-to-image generation. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI. |
| `elements` | list<ElementInput> | null | No |  | Optional: Elements (characters/objects) to include in the image for face control. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Generated images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-image/v3/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-image/v3/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-image/v3/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/kling-image/v3/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-image/v3/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
