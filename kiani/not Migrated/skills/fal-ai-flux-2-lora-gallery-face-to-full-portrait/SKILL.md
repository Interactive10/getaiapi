---
name: fal-ai-flux-2-lora-gallery-face-to-full-portrait
description: >
  Use this skill for the fal.ai Flux 2 Lora Gallery model (fal-ai/flux-2-lora-gallery/face-to-full-portrait). Extends a face into a full body portrait
---

# Flux 2 Lora Gallery

Extends a face into a full body portrait

**Endpoint:** `fal-ai/flux-2-lora-gallery/face-to-full-portrait`
**Source:** https://fal.ai/models/fal-ai/flux-2-lora-gallery/face-to-full-portrait/api

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

const result = await fal.subscribe("fal-ai/flux-2-lora-gallery/face-to-full-portrait", {
  input: {
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
| `prompt` | string | No | `"Face to full portrait"` | The prompt describing the full portrait to generate from the face. |
| `num_images` | integer | No | `1` | Number of images to generate |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level for image generation. 'regular' balances speed and quality. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | The size of the generated image. If not provided, the size of the input image will be used. |
| `lora_scale` | float | No | `1` | The strength of the face to full portrait effect. |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"png"` | The format of the output image |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and won't be saved in history. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker for the generated image. |
| `num_inference_steps` | integer | No | `40` | The number of inference steps to perform. |
| `image_urls` | list<string> | **Yes** |  | The URL of the cropped face image. |
| `guidance_scale` | float | No | `2.5` | The CFG (Classifier Free Guidance) scale. Controls how closely the model follows the prompt. |
| `seed` | integer | null | No |  | Random seed for reproducibility. Same seed with same prompt will produce same result. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation |
| `images` | list<Image> | The generated full portrait images from face |
| `seed` | integer | The seed used for generation |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-2-lora-gallery/face-to-full-portrait", {
  input: {
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-2-lora-gallery/face-to-full-portrait", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-2-lora-gallery/face-to-full-portrait", {
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

- API page: https://fal.ai/models/fal-ai/flux-2-lora-gallery/face-to-full-portrait/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-2-lora-gallery/face-to-full-portrait
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
