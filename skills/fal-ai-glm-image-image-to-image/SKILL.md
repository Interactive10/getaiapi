---
name: fal-ai-glm-image-image-to-image
description: >
  Use this skill for the fal.ai Glm Image model (fal-ai/glm-image/image-to-image). Create high-quality images with accurate text rendering and rich knowledge details—supports editing, style transfer, and maintaining consistent characters across multiple images.
---

# Glm Image

Create high-quality images with accurate text rendering and rich knowledge details—supports editing, style transfer, and maintaining consistent characters across multiple images.

**Endpoint:** `fal-ai/glm-image/image-to-image`
**Source:** https://fal.ai/models/fal-ai/glm-image/image-to-image/api

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

const result = await fal.subscribe("fal-ai/glm-image/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_urls": []
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
| `prompt` | string | **Yes** |  | Text prompt for image generation. |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `image_size` | ImageSize | enum (10 values) | No | `"square_hd"` | Output image size. |
| `seed` | integer | null | No |  | Random seed for reproducibility. The same seed with the same prompt will produce the same image. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | Output image format. |
| `sync_mode` | boolean | No | `false` | If True, the image will be returned as a base64 data URI instead of a URL. |
| `enable_prompt_expansion` | boolean | No | `false` | If True, the prompt will be enhanced using an LLM for more detailed and higher quality results. |
| `num_inference_steps` | integer | No | `30` | Number of diffusion denoising steps. More steps generally produce higher quality images. |
| `image_urls` | list<string> | **Yes** |  | URL(s) of the condition image(s) for image-to-image generation. Supports up to 4 URLs for multi-image references. |
| `enable_safety_checker` | boolean | No | `true` | Enable NSFW safety checking on the generated images. |
| `guidance_scale` | float | No | `1.5` | Classifier-free guidance scale. Higher values make the model follow the prompt more closely. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | List of URLs to the generated images. |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/glm-image/image-to-image", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/glm-image/image-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/glm-image/image-to-image", {
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

- API page: https://fal.ai/models/fal-ai/glm-image/image-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/glm-image/image-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
