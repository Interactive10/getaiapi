---
name: fal-ai-kling-video-o3-pro-video-to-video-edit
description: >
  Use this skill for the fal.ai Kling O3 Edit Video [Pro] model (fal-ai/kling-video/o3/pro/video-to-video/edit). Edit videos using Kling O3 from Kling Team!
---

# Kling O3 Edit Video [Pro]

Edit videos using Kling O3 from Kling Team!

**Endpoint:** `fal-ai/kling-video/o3/pro/video-to-video/edit`
**Source:** https://fal.ai/models/fal-ai/kling-video/o3/pro/video-to-video/edit/api

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

const result = await fal.subscribe("fal-ai/kling-video/o3/pro/video-to-video/edit", {
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
| `prompt` | string | **Yes** |  | Text prompt for video generation. Reference video as @Video1. |
| `video_url` | string | **Yes** |  | Reference video URL. Only .mp4/.mov formats, 3-10s duration, 720-2160px resolution, max 200MB. |
| `elements` | list<KlingV3ImageElementInput> | null | No |  | Elements (characters/objects) to include. Reference in prompt as @Element1, @Element2. |
| `image_urls` | list<string> | null | No |  | Reference images for style/appearance. Reference in prompt as @Image1, @Image2, etc. Maximum 4 total (elements + refe... |
| `keep_audio` | boolean | No | `true` | Whether to keep the original audio from the reference video. |
| `shot_type` | string | No | `"customize"` | The type of multi-shot video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/o3/pro/video-to-video/edit", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/o3/pro/video-to-video/edit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/o3/pro/video-to-video/edit", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/o3/pro/video-to-video/edit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/o3/pro/video-to-video/edit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
