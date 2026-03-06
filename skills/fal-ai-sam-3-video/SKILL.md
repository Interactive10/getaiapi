---
name: fal-ai-sam-3-video
description: >
  Use this skill for the fal.ai Sam 3 model (fal-ai/sam-3/video). SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text or visual prompts such as points, boxes, and masks.
---

# Sam 3

SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text or visual prompts such as points, boxes, and masks.

**Endpoint:** `fal-ai/sam-3/video`
**Source:** https://fal.ai/models/fal-ai/sam-3/video/api

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

const result = await fal.subscribe("fal-ai/sam-3/video", {
  input: {
        "video_url": "https://example.com/input.png"
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
| `prompt` | string | No | `""` | Text prompt for segmentation. Use commas to track multiple objects (e.g., 'person, cloth'). |
| `video_url` | string | **Yes** |  | The URL of the video to be segmented. |
| `detection_threshold` | float | No | `0.5` | Detection confidence threshold (0.0-1.0). Lower = more detections but less precise. |
| `box_prompts` | list<BoxPromptBase> | No | `[]` | List of box prompt coordinates (x_min, y_min, x_max, y_max). |
| `point_prompts` | list<PointPromptBase> | No | `[]` | List of point prompts |
| `apply_mask` | boolean | No | `true` | Apply the mask on the video. |
| `text_prompt` | string | null | No |  | [DEPRECATED] Use 'prompt' instead. Kept for backward compatibility. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `boundingbox_frames_zip` | File | null | Zip file containing per-frame bounding box overlays. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam-3/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-3/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-3/video", {
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

- API page: https://fal.ai/models/fal-ai/sam-3/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-3/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
