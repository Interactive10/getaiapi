---
name: fal-ai-inpaint
description: >
  Use this skill for the fal.ai Inpainting sdxl and sd model (fal-ai/inpaint). Inpaint images with SD and SDXL
---

# Inpainting sdxl and sd

Inpaint images with SD and SDXL

**Endpoint:** `fal-ai/inpaint`
**Source:** https://fal.ai/models/fal-ai/inpaint/api

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

const result = await fal.subscribe("fal-ai/inpaint", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "model_name": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `image_url` | string | **Yes** |  | Input image for img2img or inpaint mode |
| `model_name` | string | **Yes** |  | URL or HuggingFace ID of the base model to generate the image. |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_inference_steps` | integer | No | `30` | Increasing the amount of steps tells Stable Diffusion that it should take more steps             to generate your fin... |
| `mask_url` | string | **Yes** |  | Input mask for inpaint mode. Black areas will be preserved, white areas will be inpainted. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The generated image files info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/inpaint", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "model_name": "your value here",
        "mask_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/inpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/inpaint", {
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

- API page: https://fal.ai/models/fal-ai/inpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/inpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
