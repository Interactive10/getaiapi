---
name: fal-ai-vidu-q2-reference-to-video-pro
description: >
  Use this skill for the fal.ai Vidu model (fal-ai/vidu/q2/reference-to-video/pro). Use the latest Vidu Q2 Pro models which much more better quality and control on your videos.
---

# Vidu

Use the latest Vidu Q2 Pro models which much more better quality and control on your videos.

**Endpoint:** `fal-ai/vidu/q2/reference-to-video/pro`
**Source:** https://fal.ai/models/fal-ai/vidu/q2/reference-to-video/pro/api

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

const result = await fal.subscribe("fal-ai/vidu/q2/reference-to-video/pro", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Text prompt for video generation, max 2000 characters |
| `duration` | integer | No | `4` | Duration of the video in seconds (0 for automatic duration) |
| `resolution` | enum: `540p`, `720p`, `1080p` | No | `"720p"` | Output video resolution |
| `aspect_ratio` | string | No | `"16:9"` | Aspect ratio of the output video (e.g., auto, 16:9, 9:16, 1:1, or any W:H) |
| `reference_video_urls` | list<string> | No |  | URLs of the reference videos for video editing or motion reference. Supports up to 2 videos. |
| `bgm` | boolean | No | `false` | Whether to add background music to the generated video |
| `reference_image_urls` | list<string> | No |  | URLs of the reference images for subject appearance. If videos are provided, up to 4 images are allowed; otherwise up... |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `movement_amplitude` | enum: `auto`, `small`, `medium`, `large` | No | `"auto"` | The movement amplitude of objects in the frame |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/vidu/q2/reference-to-video/pro", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/vidu/q2/reference-to-video/pro", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/vidu/q2/reference-to-video/pro", {
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

- API page: https://fal.ai/models/fal-ai/vidu/q2/reference-to-video/pro/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/vidu/q2/reference-to-video/pro
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
