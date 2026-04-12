---
name: fal-ai-wan-25-preview-image-to-image
description: >
  Use this skill for the fal.ai Wan 2.5 Image to Image model (fal-ai/wan-25-preview/image-to-image). Wan 2.5 image-to-image model.
---

# Wan 2.5 Image to Image

Wan 2.5 image-to-image model.

**Endpoint:** `fal-ai/wan-25-preview/image-to-image`
**Source:** https://fal.ai/models/fal-ai/wan-25-preview/image-to-image/api

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

const result = await fal.subscribe("fal-ai/wan-25-preview/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_urls": []
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
| `prompt` | string | **Yes** |  | The text prompt describing how to edit the image. Max 2000 characters. |
| `num_images` | integer | No | `1` | Number of images to generate. Values from 1 to 4. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square"` | The size of the generated image. Width and height must be between 384 and 1440 pixels. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `image_urls` | list<string> | **Yes** |  | URLs of images to edit. For single-image editing, provide 1 URL. For multi-reference generation, provide up to 2 URLs... |
| `negative_prompt` | string | null | No |  | Negative prompt to describe content to avoid. Max 500 characters. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seeds` | list<integer> | The seeds used for each generated image |
| `images` | list<ImageFile> | The edited images |
| `actual_prompt` | string | null | The original prompt (prompt expansion is not available for image editing) |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-25-preview/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-25-preview/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-25-preview/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/wan-25-preview/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-25-preview/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
