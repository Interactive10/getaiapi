---
name: fal-ai-recraft-v3-image-to-image
description: >
  Use this skill for the fal.ai Recraft V3 model (fal-ai/recraft/v3/image-to-image). Recraft V3 is a text-to-image model with the ability to generate long texts, vector art, images in brand style, and much more. As of today, it is SOTA in image generation, proven by Hugging Face's ind
---

# Recraft V3

Recraft V3 is a text-to-image model with the ability to generate long texts, vector art, images in brand style, and much more. As of today, it is SOTA in image generation, proven by Hugging Face's industry-leading Text-to-Image Benchmark by Artificial Analysis.

**Endpoint:** `fal-ai/recraft/v3/image-to-image`
**Source:** https://fal.ai/models/fal-ai/recraft/v3/image-to-image/api

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

const result = await fal.subscribe("fal-ai/recraft/v3/image-to-image", {
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
| `prompt` | string | **Yes** |  | A text description of areas to change. |
| `style` | enum (85 values) | No | `"realistic_image"` | The style of the generated images. Vector images cost 2X as much. |
| `style_id` | string | null | No |  | The ID of the custom style reference (optional) |
| `image_url` | string | **Yes** |  | The URL of the image to modify. Must be less than 5 MB in size, have resolution less than 16 MP and max dimension les... |
| `strength` | float | No | `0.5` | Defines the difference with the original image, should lie in [0, 1], where 0 means almost identical, and 1 means mis... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `colors` | list<RGBColor> | No | `[]` | An array of preferable colors |
| `negative_prompt` | string | null | No |  | A text description of undesired elements on an image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | The generated images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/recraft/v3/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/recraft/v3/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/recraft/v3/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/recraft/v3/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/recraft/v3/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
