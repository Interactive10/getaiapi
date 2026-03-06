---
name: fal-ai-depth-anything-video
description: >
  Use this skill for the fal.ai Depth Anything Video model (fal-ai/depth-anything-video). Generates depth maps from video using Video Depth Anything (CVPR 2025). Produces per-frame depth estimation with temporal consistency across frames. Supports 3 model sizes (Small, Base, Large), 5 colo
---

# Depth Anything Video

Generates depth maps from video using Video Depth Anything (CVPR 2025). Produces per-frame depth estimation with temporal consistency across frames. Supports 3 model sizes (Small, Base, Large), 5 colormaps including grayscale, side-by-side comparison with the original video, and raw depth export as .npz. Useful for 3D reconstruction, video effects, compositing, and scene understanding.

**Endpoint:** `fal-ai/depth-anything-video`
**Source:** https://fal.ai/models/fal-ai/depth-anything-video/api

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

const result = await fal.subscribe("fal-ai/depth-anything-video", {
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
| `resolution` | enum: `auto`, `360p`, `480p`, `720p`, `1080p` | No | `"auto"` | Output resolution. 'auto' preserves input (max 1080p). Options: 'auto', '360p', '480p', '720p', '1080p'. |
| `colormap` | enum: `grayscale`, `turbo`, `inferno`, `magma`, `viridis` | No | `"grayscale"` | Colormap for depth visualization. 'turbo' (recommended) shows near=warm, far=cool. 'grayscale' for raw normalized dep... |
| `video_url` | string | **Yes** |  | URL of the input video to estimate depth for. |
| `output_fps` | float | null | No |  | Output video FPS. None = same as input. |
| `model` | enum: `VDA-Small`, `VDA-Base`, `VDA-Large` | No | `"VDA-Large"` | Depth estimation model size. VDA-Large = best quality, VDA-Small = fastest. |
| `include_raw_depths` | boolean | No | `false` | Export raw float32 depths as .npz file with: 'depths' [N,H,W], 'min_depth', 'max_depth', 'fps', 'model', 'shape'. |
| `max_frames` | integer | null | No |  | Max frames to process. None = all frames. |
| `side_by_side` | boolean | No | `false` | Output original \| depth comparison video. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `raw_depths` | File | null | Raw depth values as .npz (if include_raw_depths=True). |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/depth-anything-video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/depth-anything-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/depth-anything-video", {
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

- API page: https://fal.ai/models/fal-ai/depth-anything-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/depth-anything-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
