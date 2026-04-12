---
name: fal-ai-argil-avatars-audio-to-video
description: >
  Use this skill for the fal.ai Avatars Audio to Video model (argil/avatars/audio-to-video). High-quality avatar videos that feel real, generated from your audio
---

# Avatars Audio to Video

High-quality avatar videos that feel real, generated from your audio

**Endpoint:** `argil/avatars/audio-to-video`
**Source:** https://fal.ai/models/argil/avatars/audio-to-video/api

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

const result = await fal.subscribe("argil/avatars/audio-to-video", {
  input: {
        "avatar": "Mia outdoor (UGC)",
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
| `avatar` | enum (28 values) | **Yes** |  |  |
| `remove_background` | boolean | No | `false` | Enabling the remove background feature will result in a 50% increase in the price. |
| `audio_url` | string | **Yes** |  |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `moderation_transcription` | string | null |  |
| `moderation_error` | string | null |  |
| `moderation_flagged` | boolean |  |
| `video` | Video | null |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("argil/avatars/audio-to-video", {
  input: {
        "avatar": "Mia outdoor (UGC)",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("argil/avatars/audio-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("argil/avatars/audio-to-video", {
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

- API page: https://fal.ai/models/argil/avatars/audio-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=argil/avatars/audio-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
