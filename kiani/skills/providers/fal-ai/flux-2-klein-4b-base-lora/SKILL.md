---
name: fal-ai-flux-2-klein-4b-base-lora
description: >
  Use this skill for the fal.ai Flux 2 [klein] 4B Base Lora model (fal-ai/flux-2/klein/4b/base/lora). Text-to-image generation with LoRA support for FLUX.2 [klein] 4B Base from Black Forest Labs. Custom style adaptation and fine-tuned model variations.
---

# Flux 2 [klein] 4B Base Lora

Text-to-image generation with LoRA support for FLUX.2 [klein] 4B Base from Black Forest Labs. Custom style adaptation and fine-tuned model variations.

**Endpoint:** `fal-ai/flux-2/klein/4b/base/lora`
**Source:** https://fal.ai/models/fal-ai/flux-2/klein/4b/base/lora/api

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

const result = await fal.subscribe("fal-ai/flux-2/klein/4b/base/lora", {
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use for image generation. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"landscape_4_3"` | The size of the image to generate. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `loras` | list<LoRAInput> | No | `[]` | List of LoRA weights to apply (maximum 3). |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI. Output is not stored when this is True. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `guidance_scale` | float | No | `5` | Guidance scale for classifier-free guidance. |
| `negative_prompt` | string | No | `""` | Negative prompt for classifier-free guidance. Describes what to avoid in the image. |
| `seed` | integer | null | No |  | The seed to use for the generation. If not provided, a random seed will be used. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<ImageFile> | The generated images |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-2/klein/4b/base/lora", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-2/klein/4b/base/lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-2/klein/4b/base/lora", {
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

- API page: https://fal.ai/models/fal-ai/flux-2/klein/4b/base/lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-2/klein/4b/base/lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
