---
name: fal-ai-bria-text-to-image-3.2
description: >
  Use this skill for the fal.ai Bria 3.2 Text-to-Image model (bria/text-to-image/3.2). Bria’s Text-to-Image model, trained exclusively on licensed data for safe and risk-free commercial use. Excels in Text-Rendering and Aesthetics.
---

# Bria 3.2 Text-to-Image

Bria’s Text-to-Image model, trained exclusively on licensed data for safe and risk-free commercial use. Excels in Text-Rendering and Aesthetics.

**Endpoint:** `bria/text-to-image/3.2`
**Source:** https://fal.ai/models/bria/text-to-image/3.2/api

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

const result = await fal.subscribe("bria/text-to-image/3.2", {
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
| `prompt` | string | **Yes** |  | Prompt for image generation. |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Aspect ratio. Options: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9 |
| `prompt_enhancer` | boolean | No | `true` | Whether to improve the prompt. |
| `sync_mode` | boolean | No | `false` | If true, returns the image directly in the response (increases latency). |
| `truncate_prompt` | boolean | No | `true` | Whether to truncate the prompt. |
| `guidance_scale` | float | No | `5` | Guidance scale for text. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps. |
| `seed` | integer | No | `5555` | Random seed for reproducibility. |
| `negative_prompt` | string | No | `"Logo,Watermark,Ugly,Morbid,Extra fingers,Poorly drawn hands,Mutation,Blurry,Extra limbs,Gross proportions,Missing arms,Mutated hands,Long neck,Duplicate,Mutilated,Mutilated hands,Poorly drawn face,Deformed,Bad anatomy,Cloned face,Malformed limbs,Missing legs,Too many fingers"` | Negative prompt for image generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/text-to-image/3.2", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/text-to-image/3.2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/text-to-image/3.2", {
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

- API page: https://fal.ai/models/bria/text-to-image/3.2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/text-to-image/3.2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
