---
name: fal-ai-kling-video-lipsync-text-to-video
description: >
  Use this skill for the fal.ai Kling LipSync Text-to-Video model (fal-ai/kling-video/lipsync/text-to-video). Kling LipSync is a text-to-video model that generates realistic lip movements from text input.
---

# Kling LipSync Text-to-Video

Kling LipSync is a text-to-video model that generates realistic lip movements from text input.

**Endpoint:** `fal-ai/kling-video/lipsync/text-to-video`
**Source:** https://fal.ai/models/fal-ai/kling-video/lipsync/text-to-video/api

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

const result = await fal.subscribe("fal-ai/kling-video/lipsync/text-to-video", {
  input: {
        "text": "your value here",
        "video_url": "https://example.com/input.png",
        "voice_id": "genshin_vindi2"
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
| `text` | string | **Yes** |  | Text content for lip-sync video generation. Max 120 characters. |
| `video_url` | string | **Yes** |  | The URL of the video to generate the lip sync for. Supports .mp4/.mov, ≤100MB, 2-60s, 720p/1080p only, width/height 7... |
| `voice_id` | enum (46 values) | **Yes** |  | Voice ID to use for speech synthesis |
| `voice_language` | enum: `zh`, `en` | No | `"en"` | The voice language corresponding to the Voice ID |
| `voice_speed` | float | No | `1` | Speech rate for Text to Video generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/lipsync/text-to-video", {
  input: {
        "text": "your value here",
        "video_url": "https://example.com/input.png",
        "voice_id": "genshin_vindi2"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/lipsync/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/lipsync/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/lipsync/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/lipsync/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
