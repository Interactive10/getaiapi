---
name: fal-ai-birefnet-v2-video
description: >
  Use this skill for the fal.ai Birefnet model (fal-ai/birefnet/v2/video). Video background removal version of bilateral reference framework (BiRefNet) for high-resolution dichotomous image segmentation (DIS)
---

# Birefnet

Video background removal version of bilateral reference framework (BiRefNet) for high-resolution dichotomous image segmentation (DIS)

**Endpoint:** `fal-ai/birefnet/v2/video`
**Source:** https://fal.ai/models/fal-ai/birefnet/v2/video/api

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

const result = await fal.subscribe("fal-ai/birefnet/v2/video", {
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
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `operating_resolution` | enum: `1024x1024`, `2048x2048`, `2304x2304` | No | `"1024x1024"` | The resolution to operate on. The higher the resolution, the more accurate the output will be for high res input imag... |
| `video_output_type` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The output type of the generated video. |
| `video_url` | string | **Yes** |  | URL of the video to remove background from |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `model` | enum: `General Use (Light)`, `General Use (Light 2K)`, `General Use (Heavy)`, `Matting`, `Portrait`, `General Use (Dynamic)` | No | `"General Use (Light)"` | Model to use for background removal.             The 'General Use (Light)' model is the original model used in the Bi... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `output_mask` | boolean | No | `false` | Whether to output the mask used to remove the background |
| `refine_foreground` | boolean | No | `true` | Whether to refine the foreground using the estimated mask |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `mask_video` | VideoFile | null | Mask used to remove the background |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/birefnet/v2/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/birefnet/v2/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/birefnet/v2/video", {
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

- API page: https://fal.ai/models/fal-ai/birefnet/v2/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/birefnet/v2/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
