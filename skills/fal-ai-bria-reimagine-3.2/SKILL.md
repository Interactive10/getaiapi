---
name: fal-ai-bria-reimagine-3.2
description: >
  Use this skill for the fal.ai Reimagine model (bria/reimagine/3.2). Reimagine uses a structure reference for generating new images while preserving the structure of an input image, guided by text prompts.
Perfect for transforming sketches, illustrations, or photos int
---

# Reimagine

Reimagine uses a structure reference for generating new images while preserving the structure of an input image, guided by text prompts.
Perfect for transforming sketches, illustrations, or photos into new illustrations. Trained exclusively on licensed data

**Endpoint:** `bria/reimagine/3.2`
**Source:** https://fal.ai/models/bria/reimagine/3.2/api

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

const result = await fal.subscribe("bria/reimagine/3.2", {
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
| `depth_preprocess` | boolean | No | `true` | Depth image preprocess. |
| `canny_preprocess` | boolean | No | `true` | Canny image preprocess. |
| `depth_image_url` | string | null | No | `""` | Depth control image (file or URL). |
| `guidance_scale` | float | No | `5` | Guidance scale for text. |
| `canny_image_url` | string | null | No | `""` | Canny edge control image (file or URL). |
| `negative_prompt` | string | No | `"Logo,Watermark,Ugly,Morbid,Extra fingers,Poorly drawn hands,Mutation,Blurry,Extra limbs,Gross proportions,Missing arms,Mutated hands,Long neck,Duplicate,Mutilated,Mutilated hands,Poorly drawn face,Deformed,Bad anatomy,Cloned face,Malformed limbs,Missing legs,Too many fingers"` | Negative prompt for image generation. |
| `depth_scale` | float | No | `0.5` | Depth control strength (0.0 to 1.0). |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Aspect ratio. Options: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9 |
| `sync_mode` | boolean | No | `false` | If true, returns the image directly in the response (increases latency). |
| `prompt_enhancer` | boolean | No | `true` | Whether to improve the prompt. |
| `truncate_prompt` | boolean | No | `true` | Whether to truncate the prompt. |
| `seed` | integer | No | `5555` | Random seed for reproducibility. |
| `canny_scale` | float | No | `0.5` | Canny edge control strength (0.0 to 1.0). |
| `num_inference_steps` | integer | No | `30` | Number of inference steps. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/reimagine/3.2", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/reimagine/3.2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/reimagine/3.2", {
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

- API page: https://fal.ai/models/bria/reimagine/3.2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/reimagine/3.2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
