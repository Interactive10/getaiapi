---
name: fal-ai-sam2-auto-segment
description: >
  Use this skill for the fal.ai Segment Anything Model 2 model (fal-ai/sam2/auto-segment). SAM 2 is a model for segmenting images automatically. It can return individual masks or a single mask for the entire image.
---

# Segment Anything Model 2

SAM 2 is a model for segmenting images automatically. It can return individual masks or a single mask for the entire image.

**Endpoint:** `fal-ai/sam2/auto-segment`
**Source:** https://fal.ai/models/fal-ai/sam2/auto-segment/api

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

const result = await fal.subscribe("fal-ai/sam2/auto-segment", {
  input: {
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
| `points_per_side` | integer | No | `32` | Number of points to sample along each side of the image. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `min_mask_region_area` | integer | No | `100` | Minimum area of a mask region. |
| `image_url` | string | **Yes** |  | URL of the image to be automatically segmented |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `pred_iou_thresh` | float | No | `0.88` | Threshold for predicted IOU score. |
| `stability_score_thresh` | float | No | `0.95` | Threshold for stability score. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `combined_mask` | Image | Represents an image file. |
| `individual_masks` | list<Image> | Individual segmentation masks. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam2/auto-segment", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam2/auto-segment", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam2/auto-segment", {
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

- API page: https://fal.ai/models/fal-ai/sam2/auto-segment/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam2/auto-segment
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
