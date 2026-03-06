---
name: fal-ai-wan-v2.6-text-to-image
description: >
  Use this skill for the fal.ai Wan v2.6 Text to Image model (wan/v2.6/text-to-image). Wan 2.6 text-to-image model.
---

# Wan v2.6 Text to Image

Wan 2.6 text-to-image model.

**Endpoint:** `wan/v2.6/text-to-image`
**Source:** https://fal.ai/models/wan/v2.6/text-to-image/api

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

const result = await fal.subscribe("wan/v2.6/text-to-image", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Text prompt describing the desired image. Supports Chinese and English. Max 2000 characters. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | Output image size. If not set: matches input image size (up to 1280*1280). Use presets like 'square_hd', 'landscape_1... |
| `max_images` | integer | No | `1` | Maximum number of images to generate (1-5). Actual count may be less depending on model inference. |
| `image_url` | string | null | No |  | Optional reference image (0 or 1). When provided, can be used for style guidance. Resolution: 384-5000px each dimensi... |
| `enable_safety_checker` | boolean | No | `true` | Enable content moderation for input and output. |
| `seed` | integer | null | No |  | Random seed for reproducibility (0-2147483647). |
| `negative_prompt` | string | null | No | `""` | Content to avoid in the generated image. Max 500 characters. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | Generated images in PNG format |
| `seed` | integer | The seed used for generation |
| `generated_text` | string | null | Generated text content (in mixed text-and-image mode). May be None if only images were generated. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("wan/v2.6/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("wan/v2.6/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("wan/v2.6/text-to-image", {
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

- API page: https://fal.ai/models/wan/v2.6/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=wan/v2.6/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
