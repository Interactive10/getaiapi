---
name: fal-ai-kling-video-o1-image-to-video
description: >
  Use this skill for the fal.ai Kling O1 First Frame Last Frame to Video [Pro] model (fal-ai/kling-video/o1/image-to-video). Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene guidance.
---

# Kling O1 First Frame Last Frame to Video [Pro]

Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene guidance.

**Endpoint:** `fal-ai/kling-video/o1/image-to-video`
**Source:** https://fal.ai/models/fal-ai/kling-video/o1/image-to-video/api

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

const result = await fal.subscribe("fal-ai/kling-video/o1/image-to-video", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | Use @Image1 to reference the start frame, @Image2 to reference the end frame. |
| `duration` | enum (8 values) | No | `"5"` | Video duration in seconds. |
| `start_image_url` | string | **Yes** |  | Image to use as the first frame of the video.  Max file size: 10.0MB, Min width: 300px, Min height: 300px, Min aspect... |
| `end_image_url` | string | null | No |  | Image to use as the last frame of the video. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/o1/image-to-video", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/o1/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/o1/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/o1/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/o1/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
