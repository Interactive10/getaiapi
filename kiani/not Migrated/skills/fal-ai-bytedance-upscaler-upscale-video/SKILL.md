---
name: fal-ai-bytedance-upscaler-upscale-video
description: >
  Use this skill for the fal.ai Bytedance Upscaler model (fal-ai/bytedance-upscaler/upscale/video). Upscale videos with Bytedance's video upscaler.
---

# Bytedance Upscaler

Upscale videos with Bytedance's video upscaler.

**Endpoint:** `fal-ai/bytedance-upscaler/upscale/video`
**Source:** https://fal.ai/models/fal-ai/bytedance-upscaler/upscale/video/api

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

const result = await fal.subscribe("fal-ai/bytedance-upscaler/upscale/video", {
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
| `video_url` | string | **Yes** |  | The URL of the video to upscale. |
| `target_fps` | enum: `30fps`, `60fps` | No | `"30fps"` | The target FPS of the video to upscale. |
| `target_resolution` | enum: `1080p`, `2k`, `4k` | No | `"1080p"` | The target resolution of the video to upscale. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `duration` | float | Duration of audio input/video output as used for billing. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance-upscaler/upscale/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance-upscaler/upscale/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance-upscaler/upscale/video", {
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

- API page: https://fal.ai/models/fal-ai/bytedance-upscaler/upscale/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance-upscaler/upscale/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
