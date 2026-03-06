---
name: fal-ai-workflow-utilities-trim-video
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/trim-video). FFMPEG Utility for Trim Video
---

# Workflow Utilities

FFMPEG Utility for Trim Video

**Endpoint:** `fal-ai/workflow-utilities/trim-video`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/trim-video/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/trim-video", {
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
| `video_url` | string | **Yes** |  | URL of the video file to trim |
| `start_time` | float | No | `1` | Start time in seconds |
| `end_time` | float | null | No |  | End time in seconds. If not provided, uses duration instead. |
| `duration` | float | null | No | `2` | Duration in seconds from start_time. Ignored if end_time is provided. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `original_duration` | float | Duration of the original video in seconds |
| `trimmed_duration` | float | Duration of the trimmed video in seconds |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/trim-video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/trim-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/trim-video", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/trim-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/trim-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
