---
name: fal-ai-hunyuan-video-video-to-video
description: >
  Use this skill for the fal.ai Hunyuan Video (Video-to-Video) model (fal-ai/hunyuan-video/video-to-video). Hunyuan Video is an Open video generation model with high visual quality, motion diversity, text-video alignment, and generation stability. Use this endpoint to generate videos from videos.
---

# Hunyuan Video (Video-to-Video)

Hunyuan Video is an Open video generation model with high visual quality, motion diversity, text-video alignment, and generation stability. Use this endpoint to generate videos from videos.

**Endpoint:** `fal-ai/hunyuan-video/video-to-video`
**Source:** https://fal.ai/models/fal-ai/hunyuan-video/video-to-video/api

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

const result = await fal.subscribe("fal-ai/hunyuan-video/video-to-video", {
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"720p"` | The resolution of the video to generate. |
| `video_url` | string | **Yes** |  | URL of the video input. |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | The aspect ratio of the video to generate. |
| `strength` | float | No | `0.85` | Strength for Video-to-Video |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | The seed to use for generating the video. |
| `num_frames` | enum: `129`, `85` | No | `129` | The number of frames to generate. |
| `pro_mode` | boolean | No | `false` | By default, generations are done with 35 steps. Pro mode does 55 steps which results in higher quality videos but wil... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generating the video. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video/video-to-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-video/video-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-video/video-to-video", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-video/video-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-video/video-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
