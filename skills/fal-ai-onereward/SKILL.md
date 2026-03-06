---
name: fal-ai-onereward
description: >
  Use this skill for the fal.ai Onereward model (fal-ai/onereward). OneReward is a finetuned version of Flux 1.0 Fill with intelligent editing capabilities.
---

# Onereward

OneReward is a finetuned version of Flux 1.0 Fill with intelligent editing capabilities.

**Endpoint:** `fal-ai/onereward`
**Source:** https://fal.ai/models/fal-ai/onereward/api

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

const result = await fal.subscribe("fal-ai/onereward", {
  input: {
        "image_url": "https://example.com/input.png",
        "mask_url": "https://example.com/input.png"
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
| `prompt` | string | null | No |  | Text description of what to generate in the masked area. |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | Acceleration level for image generation. |
| `true_cfg` | float | No | `4` | True classifier-free guidance scale. Controls how strongly the model follows the prompt. Values above 1.0 enable CFG. |
| `guidance_scale` | float | No | `1` | Guidance scale for the base diffusion process. The model uses true_cfg for classifier-free guidance; this controls th... |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | Format of the output image. |
| `image_url` | string | **Yes** |  | URL of the source image to edit. |
| `sync_mode` | boolean | No | `false` | If True, returns the image as a data URI instead of uploading to CDN. The image will not be available in the request ... |
| `enable_safety_checker` | boolean | No | `true` | If True, runs a safety checker on the output and filters NSFW content. |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. More steps generally produce higher quality results. |
| `mask_url` | string | **Yes** |  | URL of the mask image. White pixels indicate the area to fill or modify; black pixels preserve the original content. |
| `negative_prompt` | string | No | `"nsfw"` | Text describing what to avoid in the generated output. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is used. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The edited image files. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `timings` | Timings |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/onereward", {
  input: {
        "image_url": "https://example.com/input.png",
        "mask_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/onereward", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/onereward", {
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

- API page: https://fal.ai/models/fal-ai/onereward/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/onereward
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
