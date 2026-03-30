---
name: fal-ai-gemini-3.1-flash-image-preview
description: >
  Use this skill for the fal.ai Gemini 3.1 Flash Image Preview model (fal-ai/gemini-3.1-flash-image-preview). Gemini 3.1 Flash Image (a.k.a Nano Banana 2) is Google's new state-of-the-art fast image generation and editing model
---

# Gemini 3.1 Flash Image Preview

Gemini 3.1 Flash Image (a.k.a Nano Banana 2) is Google's new state-of-the-art fast image generation and editing model

**Endpoint:** `fal-ai/gemini-3.1-flash-image-preview`
**Source:** https://fal.ai/models/fal-ai/gemini-3.1-flash-image-preview/api

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

const result = await fal.subscribe("fal-ai/gemini-3.1-flash-image-preview", {
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
| `prompt` | string | **Yes** |  | The text prompt to generate an image from. |
| `resolution` | enum: `0.5K`, `1K`, `2K`, `4K` | No | `"1K"` | The resolution of the image to generate. |
| `enable_web_search` | boolean | No | `false` | Enable web search for the image generation task. This will allow the model to use the latest information from the web... |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `aspect_ratio` | enum (11 values) | null | No | `"auto"` | The aspect ratio of the generated image. Use "auto" to let the model decide based on the prompt. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `safety_tolerance` | enum: `1`, `2`, `3`, `4`, `5`, `6` | No | `"4"` | The safety tolerance level for content moderation. 1 is the most strict (blocks most content), 6 is the least strict. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `limit_generations` | boolean | No | `true` | Experimental parameter to limit the number of generations from each round of prompting to 1. Set to `True` to to disr... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `description` | string | The description of the generated images. |
| `images` | list<ImageFile> | The generated images. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/gemini-3.1-flash-image-preview", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/gemini-3.1-flash-image-preview", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/gemini-3.1-flash-image-preview", {
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

- API page: https://fal.ai/models/fal-ai/gemini-3.1-flash-image-preview/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/gemini-3.1-flash-image-preview
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
