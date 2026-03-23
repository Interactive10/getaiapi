---
name: fal-ai-moondream-next-detection
description: >
  Use this skill for the fal.ai MoonDreamNext Detection model (fal-ai/moondream-next/detection). MoonDreamNext Detection is a multimodal vision-language model for gaze detection, bbox detection, point detection, and more.
---

# MoonDreamNext Detection

MoonDreamNext Detection is a multimodal vision-language model for gaze detection, bbox detection, point detection, and more.

**Endpoint:** `fal-ai/moondream-next/detection`
**Source:** https://fal.ai/models/fal-ai/moondream-next/detection/api

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

const result = await fal.subscribe("fal-ai/moondream-next/detection", {
  input: {
        "image_url": "https://example.com/input.png",
        "task_type": "bbox_detection",
        "detection_prompt": "your value here"
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
| `image_url` | string | **Yes** |  | Image URL to be processed |
| `use_ensemble` | boolean | No | `false` | Whether to use ensemble for gaze detection |
| `task_type` | enum: `bbox_detection`, `point_detection`, `gaze_detection` | **Yes** |  | Type of detection to perform |
| `show_visualization` | boolean | No | `true` | Whether to show visualization for detection |
| `combine_points` | boolean | No | `false` | Whether to combine points into a single point for point detection. This has no effect for bbox detection or gaze dete... |
| `detection_prompt` | string | **Yes** |  | Text description of what to detect |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | null | Output image with detection visualization |
| `text_output` | string | Detection results as text |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/moondream-next/detection", {
  input: {
        "image_url": "https://example.com/input.png",
        "task_type": "bbox_detection",
        "detection_prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/moondream-next/detection", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/moondream-next/detection", {
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

- API page: https://fal.ai/models/fal-ai/moondream-next/detection/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/moondream-next/detection
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
