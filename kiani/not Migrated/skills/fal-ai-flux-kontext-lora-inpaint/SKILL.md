---
name: fal-ai-flux-kontext-lora-inpaint
description: >
  Use this skill for the fal.ai Flux Kontext Lora model (fal-ai/flux-kontext-lora/inpaint). Fast inpainting endpoint for the FLUX.1 Kontext [dev] model with LoRA support, enabling rapid and high-quality image inpainting with reference images, while using pre-trained LoRA adaptations for spec
---

# Flux Kontext Lora

Fast inpainting endpoint for the FLUX.1 Kontext [dev] model with LoRA support, enabling rapid and high-quality image inpainting with reference images, while using pre-trained LoRA adaptations for specific styles, brand identities, and product-specific outputs.

**Endpoint:** `fal-ai/flux-kontext-lora/inpaint`
**Source:** https://fal.ai/models/fal-ai/flux-kontext-lora/inpaint/api

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

const result = await fal.subscribe("fal-ai/flux-kontext-lora/inpaint", {
  input: {
        "prompt": "your value here",
        "reference_image_url": "https://example.com/input.png",
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
| `prompt` | string | **Yes** |  | The prompt for the image to image task. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"none"` | The speed of the generation. The higher the speed, the faster the generation. |
| `reference_image_url` | string | **Yes** |  | The URL of the reference image for inpainting. |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. You can use any number of LoRAs             and they will be merged togeth... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `guidance_scale` | float | No | `2.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | The URL of the image to be inpainted. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `strength` | float | No | `0.88` | The strength of the initial image. Higher strength values are better for this model. |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to perform. |
| `mask_url` | string | **Yes** |  | The URL of the mask for inpainting. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |

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
const { request_id } = await fal.queue.submit("fal-ai/flux-kontext-lora/inpaint", {
  input: {
        "prompt": "your value here",
        "reference_image_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "mask_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-kontext-lora/inpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-kontext-lora/inpaint", {
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

- API page: https://fal.ai/models/fal-ai/flux-kontext-lora/inpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-kontext-lora/inpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
