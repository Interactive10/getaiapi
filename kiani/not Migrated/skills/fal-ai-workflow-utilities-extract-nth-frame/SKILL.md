---
name: fal-ai-workflow-utilities-extract-nth-frame
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/extract-nth-frame). FFMPEG Untility for Extracting nth Frame
---

# Workflow Utilities

FFMPEG Untility for Extracting nth Frame

**Endpoint:** `fal-ai/workflow-utilities/extract-nth-frame`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/extract-nth-frame/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/extract-nth-frame", {
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
| `video_url` | string | **Yes** |  | URL of the video file to extract frames from |
| `max_frames` | integer | No | `100` | Maximum number of frames to extract |
| `output_format` | enum: `png`, `jpg`, `jpeg`, `webp` | No | `"png"` | Output format for extracted frames |
| `quality` | integer | No | `95` | Quality for jpg/webp output (1-100) |
| `frame_interval` | integer | No | `12` | Extract every Nth frame (e.g., 3 = every 3rd frame, 12 = every 12th frame) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Array of extracted frame images |
| `frame_count` | integer | Total number of frames extracted |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/extract-nth-frame", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/extract-nth-frame", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/extract-nth-frame", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/extract-nth-frame/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/extract-nth-frame
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
