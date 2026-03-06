---
name: fal-ai-gemini-25-flash-image-edit
description: >
  Use this skill for the fal.ai Gemini 2.5 Flash Image model (fal-ai/gemini-25-flash-image/edit). Google's famous original image generation and editing model, a.k.a Nano Banana
---

# Gemini 2.5 Flash Image

Google's famous original image generation and editing model, a.k.a Nano Banana

**Endpoint:** `fal-ai/gemini-25-flash-image/edit`
**Source:** https://fal.ai/models/fal-ai/gemini-25-flash-image/edit/api

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

const result = await fal.subscribe("fal-ai/gemini-25-flash-image/edit", {
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
| `prompt` | string | **Yes** |  | The prompt for image editing. |
| `aspect_ratio` | enum (11 values) | null | No | `"auto"` | The aspect ratio of the generated image. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `safety_tolerance` | enum: `1`, `2`, `3`, `4`, `5`, `6` | No | `"4"` | The safety tolerance level for content moderation. 1 is the most strict (blocks most content), 6 is the least strict. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `limit_generations` | boolean | No | `false` | Experimental parameter to limit the number of generations from each round of prompting to 1. Set to `True` to to disr... |
| `image_urls` | list<string> | **Yes** |  | The URLs of the images to use for image-to-image generation or image editing. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `description` | string | The description of the generated images. |
| `images` | list<ImageFile> | The edited images. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/gemini-25-flash-image/edit", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/gemini-25-flash-image/edit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/gemini-25-flash-image/edit", {
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

- API page: https://fal.ai/models/fal-ai/gemini-25-flash-image/edit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/gemini-25-flash-image/edit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
