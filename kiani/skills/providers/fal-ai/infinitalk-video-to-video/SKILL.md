---
name: fal-ai-infinitalk-video-to-video
description: >
  Use this skill for the fal.ai Infinitalk model (fal-ai/infinitalk/video-to-video). Infinitalk model generates a talking avatar video from an image and audio file. The avatar lip-syncs to the provided audio with natural facial expressions.
---

# Infinitalk

Infinitalk model generates a talking avatar video from an image and audio file. The avatar lip-syncs to the provided audio with natural facial expressions.

**Endpoint:** `fal-ai/infinitalk/video-to-video`
**Source:** https://fal.ai/models/fal-ai/infinitalk/video-to-video/api

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

const result = await fal.subscribe("fal-ai/infinitalk/video-to-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `video_url` | string | **Yes** |  | URL of the input video. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use for generation. |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of the video to generate. Must be either 480p or 720p. |
| `audio_url` | string | **Yes** |  | The URL of the audio file. |
| `seed` | integer | No | `42` | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_frames` | integer | No | `145` | Number of frames to generate. Must be between 81 to 129 (inclusive). If the number of frames is greater than 81, the ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/infinitalk/video-to-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/infinitalk/video-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/infinitalk/video-to-video", {
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

- API page: https://fal.ai/models/fal-ai/infinitalk/video-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/infinitalk/video-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
