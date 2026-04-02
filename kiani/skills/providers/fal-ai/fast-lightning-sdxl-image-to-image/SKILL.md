---
name: fal-ai-fast-lightning-sdxl-image-to-image
description: >
  Use this skill for the fal.ai Stable Diffusion XL Lightning model (fal-ai/fast-lightning-sdxl/image-to-image). Run SDXL at the speed of light
---

# Stable Diffusion XL Lightning

Run SDXL at the speed of light

**Endpoint:** `fal-ai/fast-lightning-sdxl/image-to-image`
**Source:** https://fal.ai/models/fal-ai/fast-lightning-sdxl/image-to-image/api

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

const result = await fal.subscribe("fal-ai/fast-lightning-sdxl/image-to-image", {
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
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. |
| `embeddings` | list<Embedding> | No | `[]` | The list of embeddings to use. |
| `expand_prompt` | boolean | No | `false` | If set to true, the prompt will be expanded with additional prompts. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `preserve_aspect_ratio` | boolean | No | `false` | If set to true, the aspect ratio of the generated image will be preserved even         if the image size is too large... |
| `crop_output` | boolean | No | `false` | If set to true, the output cropped to the proper aspect ratio after generating. |
| `format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a starting point for the generation. |
| `strength` | float | No | `0.95` | determines how much the generated image resembles the initial image |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `safety_checker_version` | enum: `v1`, `v2` | No | `"v1"` | The version of the safety checker to use. v1 is the default CompVis safety checker. v2 uses a custom ViT model. |
| `request_id` | string | No | `""` | An id bound to a request, can be used with response to identify the request             itself. |
| `num_inference_steps` | enum: `1`, `2`, `4`, `8` | No | `4` | The number of inference steps to perform. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

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
const { request_id } = await fal.queue.submit("fal-ai/fast-lightning-sdxl/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fast-lightning-sdxl/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fast-lightning-sdxl/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/fast-lightning-sdxl/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fast-lightning-sdxl/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
