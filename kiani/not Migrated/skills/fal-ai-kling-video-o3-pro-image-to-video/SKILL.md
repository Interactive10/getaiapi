---
name: fal-ai-kling-video-o3-pro-image-to-video
description: >
  Use this skill for the fal.ai Kling O3 Image to Video [Pro] model (fal-ai/kling-video/o3/pro/image-to-video). Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene guidance.
---

# Kling O3 Image to Video [Pro]

Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene guidance.

**Endpoint:** `fal-ai/kling-video/o3/pro/image-to-video`
**Source:** https://fal.ai/models/fal-ai/kling-video/o3/pro/image-to-video/api

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

const result = await fal.subscribe("fal-ai/kling-video/o3/pro/image-to-video", {
  input: {
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
| `prompt` | string | null | No |  | Text prompt for video generation. Either prompt or multi_prompt must be provided, but not both. |
| `duration` | enum (13 values) | No | `"5"` | Video duration in seconds (3-15s). |
| `generate_audio` | boolean | No | `false` | Whether to generate native audio for the video. |
| `multi_prompt` | list<KlingV3MultiPromptElement> | null | No |  | List of prompts for multi-shot video generation. |
| `image_url` | string | **Yes** |  | URL of the start frame image. |
| `shot_type` | string | No | `"customize"` | The type of multi-shot video generation. |
| `end_image_url` | string | null | No |  | URL of the end frame image (optional). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/o3/pro/image-to-video", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/o3/pro/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/o3/pro/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/o3/pro/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/o3/pro/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
