---
name: fal-ai-pulid
description: >
  Use this skill for the fal.ai PuLID model (fal-ai/pulid). Tuning-free ID customization.
---

# PuLID

Tuning-free ID customization.

**Endpoint:** `fal-ai/pulid`
**Source:** https://fal.ai/models/fal-ai/pulid/api

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

const result = await fal.subscribe("fal-ai/pulid", {
  input: {
        "prompt": "your value here",
        "reference_images": []
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
| `prompt` | string | **Yes** |  | Prompt to generate the face from |
| `num_images` | integer | No | `1` | Number of images to generate |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 1024, 'width': 768}` | Size of the generated image |
| `seed` | integer | null | No |  | Random seed for reproducibility |
| `id_scale` | float | No | `0.8` | ID scale |
| `id_mix` | boolean | No | `false` | if you want to mix two ID image, please turn this on, otherwise, turn this off |
| `guidance_scale` | float | No | `1.2` | Guidance scale |
| `num_inference_steps` | integer | No | `4` | Number of steps to take |
| `reference_images` | list<ReferenceFace> | **Yes** |  | List of reference faces, ideally 4 images. |
| `negative_prompt` | string | No | `"flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry"` | Negative prompt to generate the face from |
| `mode` | enum: `fidelity`, `extreme style` | No | `"fidelity"` | Mode of generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | List of generated images |
| `seed` | integer | Random seed used for reproducibility |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pulid", {
  input: {
        "prompt": "your value here",
        "reference_images": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pulid", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pulid", {
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

- API page: https://fal.ai/models/fal-ai/pulid/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pulid
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
