---
name: fal-ai-qwen-image-image-to-image
description: >
  Use this skill for the fal.ai Qwen Image model (fal-ai/qwen-image/image-to-image). Qwen-Image (Image-to-Image) transforms and edits input images with high fidelity, enabling precise style transfer, enhancement, and creative modification.
---

# Qwen Image

Qwen-Image (Image-to-Image) transforms and edits input images with high fidelity, enabling precise style transfer, enhancement, and creative modification.

**Endpoint:** `fal-ai/qwen-image/image-to-image`
**Source:** https://fal.ai/models/fal-ai/qwen-image/image-to-image/api

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

const result = await fal.subscribe("fal-ai/qwen-image/image-to-image", {
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
| `prompt` | string | **Yes** |  | The prompt to generate the image with |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"none"` | Acceleration level for image generation. Options: 'none', 'regular', 'high'. Higher acceleration increases speed. 're... |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | The size of the generated image. By default, we will use the provided image for determining the image_size. |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. You can use up to 3 LoRAs             and they will be merged together to ... |
| `guidance_scale` | float | No | `2.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `use_turbo` | boolean | No | `false` | Enable turbo mode for faster generation with high quality. When enabled, uses optimized settings (10 steps, CFG=1.2). |
| `negative_prompt` | string | No | `" "` | The negative prompt for the generation |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | The reference image to guide the generation. |
| `strength` | float | No | `0.6` | Denoising strength. 1.0 = fully remake; 0.0 = preserve original. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to perform. |
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
const { request_id } = await fal.queue.submit("fal-ai/qwen-image/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-image/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-image/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/qwen-image/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-image/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
