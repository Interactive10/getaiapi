---
name: fal-ai-uso
description: >
  Use this skill for the fal.ai Uso model (fal-ai/uso). Use USO to perform subject driven generations using reference image.
---

# Uso

Use USO to perform subject driven generations using reference image.

**Endpoint:** `fal-ai/uso`
**Source:** https://fal.ai/models/fal-ai/uso/api

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

const result = await fal.subscribe("fal-ai/uso", {
  input: {
        "input_image_urls": []
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
| `prompt` | string | No | `""` | Text prompt for generation. Can be empty for pure style transfer. |
| `num_images` | integer | No | `1` | Number of images to generate in parallel. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | Output image format. PNG preserves transparency, JPEG is smaller. |
| `keep_size` | boolean | No | `false` | Preserve the layout and dimensions of the input content image. Useful for style transfer. |
| `input_image_urls` | list<string> | **Yes** |  | List of image URLs in order: [content_image, style_image, extra_style_image]. |
| `sync_mode` | boolean | No | `false` | If true, wait for generation and upload before returning. Increases latency but provides immediate access to images. |
| `guidance_scale` | float | No | `4` | How closely to follow the prompt. Higher values stick closer to the prompt. |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. More steps can improve quality but increase generation time. |
| `seed` | integer | No |  | Random seed for reproducible generation. Use same seed for consistent results. |
| `negative_prompt` | string | No | `""` | What you don't want in the image. Use it to exclude unwanted elements, styles, or artifacts. |
| `enable_safety_checker` | boolean | No | `true` | Enable NSFW content detection and filtering. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation |
| `images` | list<Image> | The generated images with applied style and/or subject customization |
| `timings` | Timings | Performance timings for different stages |
| `has_nsfw_concepts` | list<boolean> | NSFW detection results for each generated image |
| `seed` | integer | Seed used for generation |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/uso", {
  input: {
        "input_image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/uso", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/uso", {
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

- API page: https://fal.ai/models/fal-ai/uso/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/uso
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
