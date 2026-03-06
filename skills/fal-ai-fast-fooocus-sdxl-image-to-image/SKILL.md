---
name: fal-ai-fast-fooocus-sdxl-image-to-image
description: >
  Use this skill for the fal.ai Fooocus model (fal-ai/fast-fooocus-sdxl/image-to-image). Fooocus extreme speed mode as a standalone app.
---

# Fooocus

Fooocus extreme speed mode as a standalone app.

**Endpoint:** `fal-ai/fast-fooocus-sdxl/image-to-image`
**Source:** https://fal.ai/models/fal-ai/fast-fooocus-sdxl/image-to-image/api

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

const result = await fal.subscribe("fal-ai/fast-fooocus-sdxl/image-to-image", {
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `enable_refiner` | boolean | No | `true` | If set to true, a smaller model will try to refine the output after it was processed. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. Leave it none to automatically infer from the prompt image. |
| `embeddings` | list<Embedding> | No | `[]` | The list of embeddings to use. |
| `expand_prompt` | boolean | No | `true` | If set to true, the prompt will be expanded with additional prompts. |
| `guidance_rescale` | float | No | `0` | The rescale factor for the CFG. |
| `guidance_scale` | float | No | `2` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a starting point for the generation. |
| `strength` | float | No | `0.95` | determines how much the generated image resembles the initial image |
| `safety_checker_version` | enum: `v1`, `v2` | No | `"v1"` | The version of the safety checker to use. v1 is the default CompVis safety checker. v2 uses a custom ViT model. |
| `num_inference_steps` | integer | No | `8` | The number of inference steps to perform. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

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
const { request_id } = await fal.queue.submit("fal-ai/fast-fooocus-sdxl/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fast-fooocus-sdxl/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fast-fooocus-sdxl/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/fast-fooocus-sdxl/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fast-fooocus-sdxl/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
