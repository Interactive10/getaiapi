---
name: fal-ai-topaz-upscale-video
description: >
  Use this skill for the fal.ai Topaz Video Upscale model (fal-ai/topaz/upscale/video). Professional-grade video upscaling using Topaz technology. Enhance your videos with high-quality upscaling.
---

# Topaz Video Upscale

Professional-grade video upscaling using Topaz technology. Enhance your videos with high-quality upscaling.

**Endpoint:** `fal-ai/topaz/upscale/video`
**Source:** https://fal.ai/models/fal-ai/topaz/upscale/video/api

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

const result = await fal.subscribe("fal-ai/topaz/upscale/video", {
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
| `H264_output` | boolean | No | `false` | Whether to use H264 codec for output video. Default is H265. |
| `target_fps` | integer | null | No |  | Target FPS for frame interpolation. If set, frame interpolation will be enabled. |
| `upscale_factor` | float | No | `2` | Factor to upscale the video by (e.g. 2.0 doubles width and height) |
| `video_url` | string | **Yes** |  | URL of the video to upscale |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/topaz/upscale/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/topaz/upscale/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/topaz/upscale/video", {
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

- API page: https://fal.ai/models/fal-ai/topaz/upscale/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/topaz/upscale/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
