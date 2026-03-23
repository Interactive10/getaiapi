---
name: fal-ai-kling-video-v1-standard-ai-avatar
description: >
  Use this skill for the fal.ai Kling AI Avatar model (fal-ai/kling-video/v1/standard/ai-avatar). Kling AI Avatar Standard:  Endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters
---

# Kling AI Avatar

Kling AI Avatar Standard:  Endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters

**Endpoint:** `fal-ai/kling-video/v1/standard/ai-avatar`
**Source:** https://fal.ai/models/fal-ai/kling-video/v1/standard/ai-avatar/api

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

const result = await fal.subscribe("fal-ai/kling-video/v1/standard/ai-avatar", {
  input: {
        "audio_url": "https://example.com/input.png",
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
| `prompt` | string | No | `"."` | The prompt to use for the video generation. |
| `audio_url` | string | **Yes** |  | The URL of the audio file. |
| `image_url` | string | **Yes** |  | The URL of the image to use as your avatar |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `duration` | float | Duration of the output video in seconds. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/v1/standard/ai-avatar", {
  input: {
        "audio_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/v1/standard/ai-avatar", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/v1/standard/ai-avatar", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/v1/standard/ai-avatar/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/v1/standard/ai-avatar
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
