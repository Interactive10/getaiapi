---
name: fal-ai-z-image-turbo-controlnet-lora
description: >
  Use this skill for the fal.ai Z-Image Turbo model (fal-ai/z-image/turbo/controlnet/lora). Generate images from text and edge, depth or pose images using custom LoRA and Z-Image Turbo, Tongyi-MAI's super-fast 6B model.
---

# Z-Image Turbo

Generate images from text and edge, depth or pose images using custom LoRA and Z-Image Turbo, Tongyi-MAI's super-fast 6B model.

**Endpoint:** `fal-ai/z-image/turbo/controlnet/lora`
**Source:** https://fal.ai/models/fal-ai/z-image/turbo/controlnet/lora/api

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

const result = await fal.subscribe("fal-ai/z-image/turbo/controlnet/lora", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use. |
| `image_size` | ImageSize | enum (7 values) | No | `"auto"` | The size of the generated image. |
| `loras` | list<LoRAInput> | No | `[]` | List of LoRA weights to apply (maximum 3). |
| `control_end` | float | No | `0.8` | The end of the controlnet conditioning. |
| `control_start` | float | No | `0` | The start of the controlnet conditioning. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | URL of Image for ControlNet generation. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `control_scale` | float | No | `0.75` | The scale of the controlnet conditioning. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. Note: this will increase the price by 0.0025 credits per request. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `num_inference_steps` | integer | No | `8` | The number of inference steps to perform. |
| `preprocess` | enum: `none`, `canny`, `depth`, `pose` | null | No | `"none"` | What kind of preprocessing to apply to the image, if any. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<ImageFile> | The generated image files info. |
| `timings` | Timings | The timings of the generation process. |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the input or the randomly generated that ... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/z-image/turbo/controlnet/lora", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/z-image/turbo/controlnet/lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/z-image/turbo/controlnet/lora", {
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

- API page: https://fal.ai/models/fal-ai/z-image/turbo/controlnet/lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/z-image/turbo/controlnet/lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
