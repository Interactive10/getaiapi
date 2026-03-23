---
name: fal-ai-ltx-2.3-image-to-video-fast
description: >
  Use this skill for the fal.ai LTX 2.3 Video Fast model (fal-ai/ltx-2.3/image-to-video/fast). LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video.
---

# LTX 2.3 Video Fast

LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video.

**Endpoint:** `fal-ai/ltx-2.3/image-to-video/fast`
**Source:** https://fal.ai/models/fal-ai/ltx-2.3/image-to-video/fast/api

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

const result = await fal.subscribe("fal-ai/ltx-2.3/image-to-video/fast", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from |
| `duration` | enum (8 values) | No | `6` | The duration of the generated video in seconds. The fast model supports 6-20 seconds. Note: Durations longer than 10 ... |
| `resolution` | enum: `1080p`, `1440p`, `2160p` | No | `"1080p"` | The resolution of the generated video |
| `generate_audio` | boolean | No | `true` | Whether to generate audio for the generated video |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16` | No | `"auto"` | The aspect ratio of the generated video |
| `image_url` | string | **Yes** |  | URL of the image to generate the video from. Must be publicly accessible or base64 data URI. Supports PNG, JPEG, WebP... |
| `fps` | enum: `24`, `25`, `48`, `50` | No | `25` | The frames per second of the generated video |
| `end_image_url` | string | null | No |  | The URL of the end image to use for the generated video. When provided, generates a transition video between start an... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-2.3/image-to-video/fast", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-2.3/image-to-video/fast", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-2.3/image-to-video/fast", {
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

- API page: https://fal.ai/models/fal-ai/ltx-2.3/image-to-video/fast/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-2.3/image-to-video/fast
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
