---
name: fal-ai-kling-video-video-to-audio
description: >
  Use this skill for the fal.ai Kling Video model (fal-ai/kling-video/video-to-audio). Generate audio from input videos using Kling
---

# Kling Video

Generate audio from input videos using Kling

**Endpoint:** `fal-ai/kling-video/video-to-audio`
**Source:** https://fal.ai/models/fal-ai/kling-video/video-to-audio/api

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

const result = await fal.subscribe("fal-ai/kling-video/video-to-audio", {
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
| `video_url` | string | **Yes** |  | The video URL to extract audio from. Only .mp4/.mov formats are supported. File size does not exceed 100MB. Video dur... |
| `asmr_mode` | boolean | No | `false` | Enable ASMR mode. This mode enhances detailed sound effects and is suitable for highly immersive content scenarios. |
| `background_music_prompt` | string | null | No | `"intense car race"` | Background music prompt. Cannot exceed 200 characters. |
| `sound_effect_prompt` | string | null | No | `"Car tires screech as they accelerate in a drag race"` | Sound effect prompt. Cannot exceed 200 characters. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/video-to-audio", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/video-to-audio", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/video-to-audio", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/video-to-audio/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/video-to-audio
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
