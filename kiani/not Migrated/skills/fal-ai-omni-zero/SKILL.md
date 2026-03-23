---
name: fal-ai-omni-zero
description: >
  Use this skill for the fal.ai Omni Zero model (fal-ai/omni-zero). Any pose, any style, any identity
---

# Omni Zero

Any pose, any style, any identity

**Endpoint:** `fal-ai/omni-zero`
**Source:** https://fal.ai/models/fal-ai/omni-zero/api

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

const result = await fal.subscribe("fal-ai/omni-zero", {
  input: {
        "prompt": "your value here",
        "identity_image_url": "https://example.com/input.png",
        "composition_image_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "style_image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | Prompt to guide the image generation. |
| `identity_image_url` | string | **Yes** |  | Identity image url. |
| `identity_strength` | float | No | `1` | Identity strength. |
| `number_of_images` | integer | No | `1` | Number of images. |
| `guidance_scale` | float | No | `5` | Guidance scale. |
| `image_strength` | float | No | `0.75` | Image strength. |
| `negative_prompt` | string | No | `""` | Negative prompt to guide the image generation. |
| `composition_image_url` | string | **Yes** |  | Composition image url. |
| `depth_strength` | float | No | `0.5` | Depth strength. |
| `composition_strength` | float | No | `1` | Composition strength. |
| `image_url` | string | **Yes** |  | Input image url. |
| `style_image_url` | string | **Yes** |  | Style image url. |
| `face_strength` | float | No | `1` | Face strength. |
| `seed` | integer | No | `42` | Seed. |
| `style_strength` | float | No | `1` | Style strength. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/omni-zero", {
  input: {
        "prompt": "your value here",
        "identity_image_url": "https://example.com/input.png",
        "composition_image_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "style_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/omni-zero", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/omni-zero", {
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

- API page: https://fal.ai/models/fal-ai/omni-zero/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/omni-zero
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
