---
name: fal-ai-wan-vace-apps-video-edit
description: >
  Use this skill for the fal.ai Wan VACE Video Edit model (fal-ai/wan-vace-apps/video-edit). Edit videos using plain language and Wan VACE
---

# Wan VACE Video Edit

Edit videos using plain language and Wan VACE

**Endpoint:** `fal-ai/wan-vace-apps/video-edit`
**Source:** https://fal.ai/models/fal-ai/wan-vace-apps/video-edit/api

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

const result = await fal.subscribe("fal-ai/wan-vace-apps/video-edit", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | Prompt to edit the video. |
| `return_frames_zip` | boolean | No | `false` | Whether to include a ZIP archive containing all generated frames. |
| `acceleration` | enum: `none`, `low`, `regular` | null | No | `"regular"` | Acceleration to use for inference. Options are 'none' or 'regular'. Accelerated inference will very slightly affect o... |
| `video_url` | string | **Yes** |  | URL of the input video. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the edited video. |
| `resolution` | enum: `auto`, `240p`, `360p`, `480p`, `580p`, `720p` | No | `"auto"` | Resolution of the edited video. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `video_type` | enum: `auto`, `general`, `human` | No | `"auto"` | The type of video you're editing. Use 'general' for most videos, and 'human' for videos emphasizing human subjects an... |
| `auto_downsample_min_fps` | float | No | `15` | The minimum frames per second to downsample the video to. |
| `enable_auto_downsample` | boolean | No | `true` | Whether to enable automatic downsampling. If your video has a high frame rate or is long, enabling longer sequences t... |
| `image_urls` | list<string> | No | `[]` | URLs of the input images to use as a reference for the generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `frames_zip` | File | null | ZIP archive of generated frames if requested. |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-vace-apps/video-edit", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-vace-apps/video-edit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-vace-apps/video-edit", {
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

- API page: https://fal.ai/models/fal-ai/wan-vace-apps/video-edit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-vace-apps/video-edit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
