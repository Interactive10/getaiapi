---
name: fal-ai-seedvr-upscale-video
description: >
  Use this skill for the fal.ai SeedVR2 model (fal-ai/seedvr/upscale/video). Upscale your videos using SeedVR2 with temporal consistency!
---

# SeedVR2

Upscale your videos using SeedVR2 with temporal consistency!

**Endpoint:** `fal-ai/seedvr/upscale/video`
**Source:** https://fal.ai/models/fal-ai/seedvr/upscale/video/api

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

const result = await fal.subscribe("fal-ai/seedvr/upscale/video", {
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
| `video_url` | string | **Yes** |  | The input video to be processed |
| `upscale_mode` | enum: `target`, `factor` | No | `"factor"` | The mode to use for the upscale. If 'target', the upscale factor will be calculated based on the target resolution. I... |
| `noise_scale` | float | No | `0.1` | The noise scale to use for the generation process. |
| `target_resolution` | enum: `720p`, `1080p`, `1440p`, `2160p` | No | `"1080p"` | The target resolution to upscale to when `upscale_mode` is `target`. |
| `output_format` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The format of the output video. |
| `output_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `output_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. |
| `upscale_factor` | float | No | `2` | Upscaling factor to be used. Will multiply the dimensions with this factor when `upscale_mode` is `factor`. |
| `seed` | integer | null | No |  | The random seed used for the generation process. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The random seed used for the generation process. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/seedvr/upscale/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/seedvr/upscale/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/seedvr/upscale/video", {
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

- API page: https://fal.ai/models/fal-ai/seedvr/upscale/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/seedvr/upscale/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
