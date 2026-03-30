---
name: fal-ai-qwen-image-layered-lora
description: >
  Use this skill for the fal.ai Qwen Image Layered model (fal-ai/qwen-image-layered/lora). Qwen-Image-Layered is a model capable of decomposing an image into multiple RGBA layers. Use loras to get your custom outputs.
---

# Qwen Image Layered

Qwen-Image-Layered is a model capable of decomposing an image into multiple RGBA layers. Use loras to get your custom outputs.

**Endpoint:** `fal-ai/qwen-image-layered/lora`
**Source:** https://fal.ai/models/fal-ai/qwen-image-layered/lora/api

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

const result = await fal.subscribe("fal-ai/qwen-image-layered/lora", {
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
| `prompt` | string | null | No |  | A caption for the input image. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use. |
| `num_layers` | integer | No | `4` | The number of layers to generate. |
| `output_format` | enum: `png`, `webp` | No | `"png"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | The URL of the input image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `loras` | list<LoRAInput> | No | `[]` | List of LoRA weights to apply (maximum 3). |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `negative_prompt` | string | No | `""` | The negative prompt to generate an image from. |
| `guidance_scale` | float | No | `5` | The guidance scale to use for the image generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | null | The prompt used to generate the image. |
| `images` | list<ImageFile> | The generated image files info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `timings` | Timings |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-image-layered/lora", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-image-layered/lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-image-layered/lora", {
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

- API page: https://fal.ai/models/fal-ai/qwen-image-layered/lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-image-layered/lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
