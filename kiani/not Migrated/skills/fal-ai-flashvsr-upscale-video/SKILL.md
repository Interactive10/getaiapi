---
name: fal-ai-flashvsr-upscale-video
description: >
  Use this skill for the fal.ai Flashvsr model (fal-ai/flashvsr/upscale/video). Upscale your videos using FlashVSR with the fastest speeds!
---

# Flashvsr

Upscale your videos using FlashVSR with the fastest speeds!

**Endpoint:** `fal-ai/flashvsr/upscale/video`
**Source:** https://fal.ai/models/fal-ai/flashvsr/upscale/video/api

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

const result = await fal.subscribe("fal-ai/flashvsr/upscale/video", {
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
| `video_url` | string | **Yes** |  | The input video to be upscaled |
| `acceleration` | enum: `regular`, `high`, `full` | No | `"regular"` | Acceleration mode for VAE decoding. Options: regular (best quality), high (balanced), full (fastest). More accerleati... |
| `quality` | integer | No | `70` | Quality level for tile blending (0-100). Controls overlap between tiles to prevent grid artifacts. Higher values prov... |
| `color_fix` | boolean | No | `true` | Color correction enabled. |
| `output_format` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The format of the output video. |
| `output_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned inline and not stored in history. |
| `output_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. |
| `upscale_factor` | float | No | `2` | Upscaling factor to be used. |
| `preserve_audio` | boolean | No | `false` | Copy the original audio tracks into the upscaled video using FFmpeg when possible. |
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
const { request_id } = await fal.queue.submit("fal-ai/flashvsr/upscale/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flashvsr/upscale/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flashvsr/upscale/video", {
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

- API page: https://fal.ai/models/fal-ai/flashvsr/upscale/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flashvsr/upscale/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
