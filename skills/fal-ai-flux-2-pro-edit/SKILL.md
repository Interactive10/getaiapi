---
name: fal-ai-flux-2-pro-edit
description: >
  Use this skill for the fal.ai Flux 2 Pro model (fal-ai/flux-2-pro/edit). Text-to-image generation with FLUX.2 [pro] from Black Forest Labs. Optimized for maximum quality, exceptional photorealism and artistic images.
---

# Flux 2 Pro

Text-to-image generation with FLUX.2 [pro] from Black Forest Labs. Optimized for maximum quality, exceptional photorealism and artistic images.

**Endpoint:** `fal-ai/flux-2-pro/edit`
**Source:** https://fal.ai/models/fal-ai/flux-2-pro/edit/api

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

const result = await fal.subscribe("fal-ai/flux-2-pro/edit", {
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `image_size` | ImageSize | enum (7 values) | No | `"auto"` | The size of the generated image. If `auto`, the size will be determined by the model. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `safety_tolerance` | enum: `1`, `2`, `3`, `4`, `5` | No | `"2"` | The safety tolerance level for the generated image. 1 being the most strict and 5 being the most permissive. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `seed` | integer | null | No |  | The seed to use for the generation. |
| `image_urls` | list<string> | **Yes** |  | List of URLs of input images for editing |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<ImageFile> | The generated images. |
| `seed` | integer | The seed used for the generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-2-pro/edit", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-2-pro/edit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-2-pro/edit", {
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

- API page: https://fal.ai/models/fal-ai/flux-2-pro/edit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-2-pro/edit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
