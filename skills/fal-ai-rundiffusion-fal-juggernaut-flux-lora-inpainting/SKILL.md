---
name: fal-ai-rundiffusion-fal-juggernaut-flux-lora-inpainting
description: >
  Use this skill for the fal.ai Juggernaut Flux Lora model (rundiffusion-fal/juggernaut-flux-lora/inpainting). Juggernaut Base Flux LoRA Inpainting by RunDiffusion is a drop-in replacement for Flux [Dev] inpainting that delivers sharper details, richer colors, and enhanced realism to all your LoRAs and LyCORIS
---

# Juggernaut Flux Lora

Juggernaut Base Flux LoRA Inpainting by RunDiffusion is a drop-in replacement for Flux [Dev] inpainting that delivers sharper details, richer colors, and enhanced realism to all your LoRAs and LyCORIS with full compatibility.

**Endpoint:** `rundiffusion-fal/juggernaut-flux-lora/inpainting`
**Source:** https://fal.ai/models/rundiffusion-fal/juggernaut-flux-lora/inpainting/api

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

const result = await fal.subscribe("rundiffusion-fal/juggernaut-flux-lora/inpainting", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | URL of image to use for inpainting. or img2img |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. You can use any number of LoRAs             and they will be merged togeth... |
| `sync_mode` | boolean | No | `false` | If set to true, the function will wait for the image to be generated and uploaded             before returning the re... |
| `strength` | float | No | `0.85` | The strength to use for inpainting/image-to-image. Only used if the image_url is provided. 1.0 is completely remakes ... |
| `guidance_scale` | float | No | `3.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `mask_url` | string | **Yes** |  | The mask to area to Inpaint in. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |

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
const { request_id } = await fal.queue.submit("rundiffusion-fal/juggernaut-flux-lora/inpainting", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "mask_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("rundiffusion-fal/juggernaut-flux-lora/inpainting", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("rundiffusion-fal/juggernaut-flux-lora/inpainting", {
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

- API page: https://fal.ai/models/rundiffusion-fal/juggernaut-flux-lora/inpainting/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=rundiffusion-fal/juggernaut-flux-lora/inpainting
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
