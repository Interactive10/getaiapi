---
name: fal-ai-cartoonify
description: >
  Use this skill for the fal.ai Cartoonify model (fal-ai/cartoonify). Transform images into 3D cartoon artwork using an AI model that applies cartoon stylization while preserving the original image's composition and details.
---

# Cartoonify

Transform images into 3D cartoon artwork using an AI model that applies cartoon stylization while preserving the original image's composition and details.

**Endpoint:** `fal-ai/cartoonify`
**Source:** https://fal.ai/models/fal-ai/cartoonify/api

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

const result = await fal.subscribe("fal-ai/cartoonify", {
  input: {
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
| `use_cfg_zero` | boolean | No | `false` | Whether to use CFG zero |
| `image_url` | string | **Yes** |  | URL of the image to apply Pixar style to |
| `guidance_scale` | float | No | `3.5` | Guidance scale for the generation |
| `num_inference_steps` | integer | No | `28` | Number of inference steps |
| `scale` | float | No | `1` | Scale factor for the Pixar effect |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker |
| `seed` | integer | No |  | The seed for image generation. Same seed with same parameters will generate same image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated image files info. |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/cartoonify", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/cartoonify", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/cartoonify", {
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

- API page: https://fal.ai/models/fal-ai/cartoonify/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/cartoonify
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
