---
name: fal-ai-gpt-image-1.5
description: >
  Use this skill for the fal.ai GPT-Image 1.5 model (fal-ai/gpt-image-1.5). GPT Image 1.5 generates high-fidelity images with strong prompt adherence, preserving composition, lighting, and fine-grained detail.
---

# GPT-Image 1.5

GPT Image 1.5 generates high-fidelity images with strong prompt adherence, preserving composition, lighting, and fine-grained detail.

**Endpoint:** `fal-ai/gpt-image-1.5`
**Source:** https://fal.ai/models/fal-ai/gpt-image-1.5/api

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

const result = await fal.subscribe("fal-ai/gpt-image-1.5", {
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
| `background` | enum: `auto`, `transparent`, `opaque` | No | `"auto"` | Background for the generated image |
| `num_images` | integer | No | `1` | Number of images to generate |
| `image_size` | enum: `1024x1024`, `1536x1024`, `1024x1536` | No | `"1024x1024"` | Aspect ratio for the generated image |
| `prompt` | string | **Yes** |  | The prompt for image generation |
| `quality` | enum: `low`, `medium`, `high` | No | `"high"` | Quality for the generated image |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | Output format for the images |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<ImageFile> | The generated images. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/gpt-image-1.5", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/gpt-image-1.5", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/gpt-image-1.5", {
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

- API page: https://fal.ai/models/fal-ai/gpt-image-1.5/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/gpt-image-1.5
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
