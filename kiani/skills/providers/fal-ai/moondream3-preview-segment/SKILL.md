---
name: fal-ai-moondream3-preview-segment
description: >
  Use this skill for the fal.ai Moondream3 Preview [Segment] model (fal-ai/moondream3-preview/segment). Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilities to real-world applications requiring fast, inexpensive i
---

# Moondream3 Preview [Segment]

Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilities to real-world applications requiring fast, inexpensive inference at scale.

**Endpoint:** `fal-ai/moondream3-preview/segment`
**Source:** https://fal.ai/models/fal-ai/moondream3-preview/segment/api

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

const result = await fal.subscribe("fal-ai/moondream3-preview/segment", {
  input: {
        "image_url": "https://example.com/input.png",
        "object": "your value here"
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
| `image_url` | string | **Yes** |  | URL of the image to be processed |
| `settings` | SegmentSamplingSettings | null | No |  | Sampling settings for the segmentation model |
| `object` | string | **Yes** |  | Object to be segmented in the image |
| `preview` | boolean | No | `false` | Whether to preview the output and return a binary mask of the image |
| `spatial_references` | list<any | list<float>> | null | No |  | Spatial references to guide the segmentation. By feeding in references you can help the segmentation process. Must be... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | ImageFile | null | Segmentation mask image. If no object detected or preview not requested, will be null. |
| `path` | string | null | SVG path data representing the segmentation mask. If not detected, will be null. |
| `bbox` | Object | null | Bounding box of the segmented object. If not detected, will be null. |
| `finish_reason` | string | Reason for finishing the output generation |
| `usage_info` | UsageInfo |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/moondream3-preview/segment", {
  input: {
        "image_url": "https://example.com/input.png",
        "object": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/moondream3-preview/segment", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/moondream3-preview/segment", {
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

- API page: https://fal.ai/models/fal-ai/moondream3-preview/segment/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/moondream3-preview/segment
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
