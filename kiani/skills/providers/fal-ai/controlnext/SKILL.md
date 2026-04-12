---
name: fal-ai-controlnext
description: >
  Use this skill for the fal.ai ControlNeXt SVD model (fal-ai/controlnext). Animate a reference image with a driving video using ControlNeXt.
---

# ControlNeXt SVD

Animate a reference image with a driving video using ControlNeXt.

**Endpoint:** `fal-ai/controlnext`
**Source:** https://fal.ai/models/fal-ai/controlnext/api

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

const result = await fal.subscribe("fal-ai/controlnext", {
  input: {
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
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
| `controlnext_cond_scale` | float | No | `1` | Condition scale for ControlNeXt. |
| `video_url` | string | **Yes** |  | URL of the input video. |
| `fps` | integer | No | `7` | Frames per second for the output video. |
| `max_frame_num` | integer | No | `240` | Maximum number of frames to process. |
| `width` | integer | No | `576` | Width of the output video. |
| `overlap` | integer | No | `6` | Number of overlapping frames between batches. |
| `guidance_scale` | float | No | `3` | Guidance scale for the diffusion process. |
| `batch_frames` | integer | No | `24` | Number of frames to process in each batch. |
| `height` | integer | No | `1024` | Height of the output video. |
| `sample_stride` | integer | No | `2` | Stride for sampling frames from the input video. |
| `image_url` | string | **Yes** |  | URL of the reference image. |
| `decode_chunk_size` | integer | No | `2` | Chunk size for decoding frames. |
| `motion_bucket_id` | float | No | `127` | Motion bucket ID for the pipeline. |
| `num_inference_steps` | integer | No | `25` | Number of inference steps. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | The generated video. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/controlnext", {
  input: {
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/controlnext", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/controlnext", {
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

- API page: https://fal.ai/models/fal-ai/controlnext/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/controlnext
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
