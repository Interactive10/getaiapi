---
name: fal-ai-hunyuan-image-v2.1-text-to-image
description: >
  Use this skill for the fal.ai Hunyuan Image model (fal-ai/hunyuan-image/v2.1/text-to-image). Use the amazing capabilities of hunyuan image 2.1 to generate images that express the feelings of your text.
---

# Hunyuan Image

Use the amazing capabilities of hunyuan image 2.1 to generate images that express the feelings of your text.

**Endpoint:** `fal-ai/hunyuan-image/v2.1/text-to-image`
**Source:** https://fal.ai/models/fal-ai/hunyuan-image/v2.1/text-to-image/api

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

const result = await fal.subscribe("fal-ai/hunyuan-image/v2.1/text-to-image", {
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
| `prompt` | string | **Yes** |  | The text prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The desired size of the generated image. |
| `use_reprompt` | boolean | No | `true` | Enable prompt enhancement for potentially better results. |
| `use_refiner` | boolean | No | `false` | Enable the refiner model for improved image quality. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `3.5` | Controls how much the model adheres to the prompt. Higher values mean stricter adherence. |
| `seed` | integer | null | No |  | Random seed for reproducible results. If None, a random seed is used. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to guide the image generation away from certain concepts. |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | A list of the generated images. |
| `seed` | integer | The base seed used for the generation process. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-image/v2.1/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-image/v2.1/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-image/v2.1/text-to-image", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-image/v2.1/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-image/v2.1/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
