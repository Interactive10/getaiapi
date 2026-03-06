---
name: fal-ai-ltx-2.3-extend-video
description: >
  Use this skill for the fal.ai LTX Video 2.3 Pro model (fal-ai/ltx-2.3/extend-video). LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video.
---

# LTX Video 2.3 Pro

LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video.

**Endpoint:** `fal-ai/ltx-2.3/extend-video`
**Source:** https://fal.ai/models/fal-ai/ltx-2.3/extend-video/api

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

const result = await fal.subscribe("fal-ai/ltx-2.3/extend-video", {
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
| `prompt` | string | null | No |  | Description of what should happen in the extended portion of the video. |
| `duration` | float | No | `5` | Duration in seconds to extend the video. Maximum 20 seconds. |
| `context` | float | null | No |  | Number of seconds from the input video to use as context for the extension (maximum 20 seconds). If not provided, def... |
| `mode` | enum: `start`, `end` | No | `"end"` | Where to extend the video: 'end' extends at the end, 'start' extends at the beginning. |
| `video_url` | string | **Yes** |  | The URL of the video to extend |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-2.3/extend-video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-2.3/extend-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-2.3/extend-video", {
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

- API page: https://fal.ai/models/fal-ai/ltx-2.3/extend-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-2.3/extend-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
