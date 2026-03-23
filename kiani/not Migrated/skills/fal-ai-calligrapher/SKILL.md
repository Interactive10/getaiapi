---
name: fal-ai-calligrapher
description: >
  Use this skill for the fal.ai Calligrapher model (fal-ai/calligrapher). Use the text and font retaining capabilities of calligrapher to modify texts on your books, clothes and many more.
---

# Calligrapher

Use the text and font retaining capabilities of calligrapher to modify texts on your books, clothes and many more.

**Endpoint:** `fal-ai/calligrapher`
**Source:** https://fal.ai/models/fal-ai/calligrapher/api

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

const result = await fal.subscribe("fal-ai/calligrapher", {
  input: {
        "prompt": "your value here",
        "source_image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | Text prompt to inpaint or customize |
| `num_images` | integer | No | `1` | How many images to generate |
| `source_image_url` | string | **Yes** |  | Base64-encoded source image with drawn mask layers |
| `auto_mask_generation` | boolean | No | `false` | Whether to automatically generate mask from detected text |
| `reference_image_url` | string | null | No |  | Optional base64 reference image for style |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 1024, 'width': 1024}` | Target image size for generation |
| `use_context` | boolean | No | `true` | Whether to prepend context reference to the input |
| `mask_image_url` | string | null | No |  | Base64-encoded mask image (optional if using auto_mask_generation) |
| `source_text` | string | No | `""` | Source text to replace (if empty, masks all detected text) |
| `seed` | integer | No |  | Random seed for reproducibility |
| `num_inference_steps` | integer | No | `50` | Number of inference steps (1-100) |
| `cfg_scale` | float | No | `1` | Guidance or strength scale for the model |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/calligrapher", {
  input: {
        "prompt": "your value here",
        "source_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/calligrapher", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/calligrapher", {
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

- API page: https://fal.ai/models/fal-ai/calligrapher/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/calligrapher
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
