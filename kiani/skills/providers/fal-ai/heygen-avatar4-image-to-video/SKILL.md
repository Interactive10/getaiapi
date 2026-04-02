---
name: fal-ai-heygen-avatar4-image-to-video
description: >
  Use this skill for the fal.ai Heygen model (fal-ai/heygen/avatar4/image-to-video). Heygen Photo Avatar 4 Model
---

# Heygen

Heygen Photo Avatar 4 Model

**Endpoint:** `fal-ai/heygen/avatar4/image-to-video`
**Source:** https://fal.ai/models/fal-ai/heygen/avatar4/image-to-video/api

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

const result = await fal.subscribe("fal-ai/heygen/avatar4/image-to-video", {
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
| `prompt` | string | null | No |  | The text the avatar will speak |
| `resolution` | enum: `360p`, `480p`, `540p`, `720p`, `1080p` | No | `"720p"` | Video resolution preset. Options: 360p, 480p, 540p, 720p, 1080p |
| `background` | AvatarIVBackground | No |  |  |
| `expression` | string | null | No |  | Facial expression |
| `image_url` | string | **Yes** |  | URL of the image to animate. The image should contain a clear face. |
| `voice` | enum (102 values) | No |  | Name of the voice to use for the avatar |
| `caption` | boolean | No | `false` | Whether to add captions to the video |
| `audio_url` | string | null | No |  | URL of an audio file for the avatar to lip-sync to. When provided, overrides prompt and voice. |
| `talking_style` | enum: `stable`, `expressive` | No | `"stable"` | Talking style - 'stable' for minimal movement, 'expressive' for more animation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/heygen/avatar4/image-to-video", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/heygen/avatar4/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/heygen/avatar4/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/heygen/avatar4/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/heygen/avatar4/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
