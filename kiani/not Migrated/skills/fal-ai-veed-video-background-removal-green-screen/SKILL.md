---
name: fal-ai-veed-video-background-removal-green-screen
description: >
  Use this skill for the fal.ai Video Background Removal model (veed/video-background-removal/green-screen). Remove background from videos filmed using chromakey, with automatic green spill suppression for clean, professional edges.
---

# Video Background Removal

Remove background from videos filmed using chromakey, with automatic green spill suppression for clean, professional edges.

**Endpoint:** `veed/video-background-removal/green-screen`
**Source:** https://fal.ai/models/veed/video-background-removal/green-screen/api

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

const result = await fal.subscribe("veed/video-background-removal/green-screen", {
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
| `video_url` | string (URL) | **Yes** |  |  |
| `output_codec` | enum: `vp9`, `h264` | No | `"vp9"` | Single VP9 video with alpha channel or two videos (rgb and alpha) in H264 format. H264 is recommended for better RGB ... |
| `spill_suppression_strength` | float | null | No | `0.8` | Increase the value if green spots remain in the video, decrease if color changes are noticed on the extracted subject. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | list<File> |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("veed/video-background-removal/green-screen", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("veed/video-background-removal/green-screen", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("veed/video-background-removal/green-screen", {
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

- API page: https://fal.ai/models/veed/video-background-removal/green-screen/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=veed/video-background-removal/green-screen
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
