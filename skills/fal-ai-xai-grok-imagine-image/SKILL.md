---
name: fal-ai-xai-grok-imagine-image
description: >
  Use this skill for the fal.ai Grok Imagine Image model (xai/grok-imagine-image). Generate highly aesthetic images with xAI's Grok Imagine Image generation model.
---

# Grok Imagine Image

Generate highly aesthetic images with xAI's Grok Imagine Image generation model.

**Endpoint:** `xai/grok-imagine-image`
**Source:** https://fal.ai/models/xai/grok-imagine-image/api

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

const result = await fal.subscribe("xai/grok-imagine-image", {
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
| `prompt` | string | **Yes** |  | Text description of the desired image. |
| `aspect_ratio` | enum (13 values) | No | `"1:1"` | Aspect ratio of the generated image. |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"jpeg"` | The format of the generated image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<ImageFile> | The URL of the generated image. |
| `revised_prompt` | string | The enhanced prompt that was used to generate the image. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("xai/grok-imagine-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("xai/grok-imagine-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("xai/grok-imagine-image", {
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

- API page: https://fal.ai/models/xai/grok-imagine-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=xai/grok-imagine-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
