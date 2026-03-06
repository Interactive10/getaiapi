---
name: fal-ai-xai-grok-imagine-video-edit-video
description: >
  Use this skill for the fal.ai Grok Imagine Video model (xai/grok-imagine-video/edit-video). Edit videos using xAI's Grok Imagine
---

# Grok Imagine Video

Edit videos using xAI's Grok Imagine

**Endpoint:** `xai/grok-imagine-video/edit-video`
**Source:** https://fal.ai/models/xai/grok-imagine-video/edit-video/api

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

const result = await fal.subscribe("xai/grok-imagine-video/edit-video", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | Text description of the desired edit. |
| `resolution` | enum: `auto`, `480p`, `720p` | No | `"auto"` | Resolution of the output video. |
| `video_url` | string | **Yes** |  | URL of the input video to edit. The video will be resized to a maximum area of 854x480 pixels and truncated to 8 seco... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("xai/grok-imagine-video/edit-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("xai/grok-imagine-video/edit-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("xai/grok-imagine-video/edit-video", {
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

- API page: https://fal.ai/models/xai/grok-imagine-video/edit-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=xai/grok-imagine-video/edit-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
