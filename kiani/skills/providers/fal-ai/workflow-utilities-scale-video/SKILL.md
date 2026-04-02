---
name: fal-ai-workflow-utilities-scale-video
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/scale-video). FFMPEG Utilities to Scale Videos
---

# Workflow Utilities

FFMPEG Utilities to Scale Videos

**Endpoint:** `fal-ai/workflow-utilities/scale-video`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/scale-video/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/scale-video", {
  input: {
        "height": 2,
        "video_url": "https://example.com/input.png",
        "width": 2
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
| `height` | integer | **Yes** |  | Target height in pixels |
| `preset` | enum: `ultrafast`, `fast`, `medium`, `slow` | No | `"fast"` | Encoding speed preset. Slower presets give better compression but take longer. |
| `crf` | integer | No | `18` | Constant Rate Factor for quality (0-51). Lower values mean better quality and larger files. 18 is visually lossless f... |
| `video_url` | string | **Yes** |  | URL of the video file to scale/resize. Height and Width of the video must be even numbers for compatibility with vide... |
| `width` | integer | **Yes** |  | Target width in pixels |
| `codec` | enum: `libx264`, `libx265` | No | `"libx264"` | Video codec to use for encoding. libx264 (H.264) is widely compatible, libx265 (H.265/HEVC) offers better compression. |
| `mode` | enum: `stretch`, `pad`, `crop` | No | `"stretch"` | Scaling mode. 'stretch' scales the video to the exact target dimensions (may distort aspect ratio). 'pad' scales to f... |
| `pad_color` | enum: `black`, `white`, `red`, `green`, `blue`, `gray` | No | `"black"` | Padding color when mode is 'pad'. Ignored for other modes. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `scaled_height` | integer | Height of the output video in pixels |
| `scaled_width` | integer | Width of the output video in pixels |
| `original_width` | integer | Width of the original video in pixels |
| `video` | File |  |
| `original_height` | integer | Height of the original video in pixels |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/scale-video", {
  input: {
        "height": 2,
        "video_url": "https://example.com/input.png",
        "width": 2
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/scale-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/scale-video", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/scale-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/scale-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
