---
name: fal-ai-fashn-tryon-v1.5
description: >
  Use this skill for the fal.ai FASHN Virtual Try-On V1.5 model (fal-ai/fashn/tryon/v1.5). FASHN v1.5 delivers precise virtual try-on capabilities, accurately rendering garment details like text and patterns at 576x864 resolution from both on-model and flat-lay photo references.
---

# FASHN Virtual Try-On V1.5

FASHN v1.5 delivers precise virtual try-on capabilities, accurately rendering garment details like text and patterns at 576x864 resolution from both on-model and flat-lay photo references.

**Endpoint:** `fal-ai/fashn/tryon/v1.5`
**Source:** https://fal.ai/models/fal-ai/fashn/tryon/v1.5/api

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

const result = await fal.subscribe("fal-ai/fashn/tryon/v1.5", {
  input: {
        "model_image": "https://example.com/input.png",
        "garment_image": "https://example.com/input.png"
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
| `model_image` | string | **Yes** |  | URL or base64 of the model image |
| `moderation_level` | enum: `none`, `permissive`, `conservative` | No | `"permissive"` | Content moderation level for garment images. 'none' disables moderation, 'permissive' blocks only explicit content, '... |
| `garment_photo_type` | enum: `auto`, `model`, `flat-lay` | No | `"auto"` | Specifies the type of garment photo to optimize internal parameters for better performance. 'model' is for photos of ... |
| `garment_image` | string | **Yes** |  | URL or base64 of the garment image |
| `category` | enum: `tops`, `bottoms`, `one-pieces`, `auto` | No | `"auto"` | Category of the garment to try-on. 'auto' will attempt to automatically detect the category of the garment. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `segmentation_free` | boolean | No | `true` | Disables human parsing on the model image. |
| `output_format` | enum: `png`, `jpeg` | No | `"png"` | Output format of the generated images. 'png' is highest quality, while 'jpeg' is faster |
| `mode` | enum: `performance`, `balanced`, `quality` | No | `"balanced"` | Specifies the mode of operation. 'performance' mode is faster but may sacrifice quality, 'balanced' mode is a balance... |
| `seed` | integer | null | No |  | Sets random operations to a fixed state. Use the same seed to reproduce results with the same inputs, or different se... |
| `num_samples` | integer | No | `1` | Number of images to generate in a single run. Image generation has a random element in it, so trying multiple images ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/fashn/tryon/v1.5", {
  input: {
        "model_image": "https://example.com/input.png",
        "garment_image": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fashn/tryon/v1.5", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fashn/tryon/v1.5", {
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

- API page: https://fal.ai/models/fal-ai/fashn/tryon/v1.5/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fashn/tryon/v1.5
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
