---
name: fal-ai-evf-sam
description: >
  Use this skill for the fal.ai EVF-SAM2 Segmentation model (fal-ai/evf-sam). EVF-SAM2 combines natural language understanding with advanced segmentation capabilities, allowing you to precisely mask image regions using intuitive positive and negative text prompts.
---

# EVF-SAM2 Segmentation

EVF-SAM2 combines natural language understanding with advanced segmentation capabilities, allowing you to precisely mask image regions using intuitive positive and negative text prompts.

**Endpoint:** `fal-ai/evf-sam`
**Source:** https://fal.ai/models/fal-ai/evf-sam/api

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

const result = await fal.subscribe("fal-ai/evf-sam", {
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
| `prompt` | string | **Yes** |  | The prompt to generate segmentation from. |
| `use_grounding_dino` | boolean | No | `false` | Use GroundingDINO instead of SAM for segmentation |
| `semantic_type` | boolean | No | `false` | Enable semantic level segmentation for body parts, background or multi objects |
| `fill_holes` | boolean | No | `false` | Fill holes in the mask using morphological operations |
| `expand_mask` | integer | No | `0` | Expand/dilate the mask by specified pixels |
| `mask_only` | boolean | No | `true` | Output only the binary mask instead of masked image |
| `revert_mask` | boolean | No | `false` | Invert the mask (background becomes foreground and vice versa) |
| `blur_mask` | integer | No | `0` | Apply Gaussian blur to the mask. Value determines kernel size (must be odd number) |
| `negative_prompt` | string | No |  | Areas to exclude from segmentation (will be subtracted from prompt results) |
| `image_url` | string | **Yes** |  | URL of the input image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | File | The segmented output image |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/evf-sam", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/evf-sam", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/evf-sam", {
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

- API page: https://fal.ai/models/fal-ai/evf-sam/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/evf-sam
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
