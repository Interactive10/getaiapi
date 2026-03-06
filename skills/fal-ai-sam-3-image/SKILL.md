---
name: fal-ai-sam-3-image
description: >
  Use this skill for the fal.ai Segment Anything Model 3 model (fal-ai/sam-3/image). SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text or visual prompts such as points, boxes, and masks.
---

# Segment Anything Model 3

SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text or visual prompts such as points, boxes, and masks.

**Endpoint:** `fal-ai/sam-3/image`
**Source:** https://fal.ai/models/fal-ai/sam-3/image/api

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

const result = await fal.subscribe("fal-ai/sam-3/image", {
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
| `prompt` | string | No | `"wheel"` | Text prompt for segmentation |
| `include_boxes` | boolean | No | `false` | Whether to include bounding boxes for each mask (when available). |
| `box_prompts` | list<BoxPrompt> | No | `[]` | Box prompt coordinates (x_min, y_min, x_max, y_max). Multiple boxes supported - use object_id to group boxes for the ... |
| `return_multiple_masks` | boolean | No | `false` | If True, upload and return multiple generated masks as defined by `max_masks`. |
| `image_url` | string | **Yes** |  | URL of the image to be segmented |
| `sync_mode` | boolean | No | `false` | If True, the media will be returned as a data URI. |
| `point_prompts` | list<PointPrompt> | No | `[]` | List of point prompts |
| `include_scores` | boolean | No | `false` | Whether to include mask confidence scores. |
| `max_masks` | integer | No | `3` | Maximum number of masks to return when `return_multiple_masks` is enabled. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `apply_mask` | boolean | No | `true` | Apply the mask on the image. |
| `text_prompt` | string | null | No |  | [DEPRECATED] Use 'prompt' instead. Kept for backward compatibility. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | null | Primary segmented mask preview. |
| `metadata` | list<MaskMetadata> | null | Per-mask metadata including scores and boxes. |
| `masks` | list<Image> | Segmented mask images. |
| `scores` | list<float | null> | null | Per-mask confidence scores when requested. |
| `boxes` | list<list<float> | null> | null | Per-mask normalized bounding boxes [cx, cy, w, h] when requested. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam-3/image", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-3/image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-3/image", {
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

- API page: https://fal.ai/models/fal-ai/sam-3/image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-3/image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
