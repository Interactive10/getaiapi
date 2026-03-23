---
name: fal-ai-kling-video-v2.6-standard-motion-control
description: >
  Use this skill for the fal.ai Kling Video v2.6 Motion Control [Standard] model (fal-ai/kling-video/v2.6/standard/motion-control). Transfer movements from a reference video to any character image. Cost-effective mode for motion transfer, perfect for portraits and simple animations.
---

# Kling Video v2.6 Motion Control [Standard]

Transfer movements from a reference video to any character image. Cost-effective mode for motion transfer, perfect for portraits and simple animations.

**Endpoint:** `fal-ai/kling-video/v2.6/standard/motion-control`
**Source:** https://fal.ai/models/fal-ai/kling-video/v2.6/standard/motion-control/api

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

const result = await fal.subscribe("fal-ai/kling-video/v2.6/standard/motion-control", {
  input: {
        "video_url": "https://example.com/input.png",
        "character_orientation": "image",
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
| `prompt` | string | null | No |  |  |
| `video_url` | string | **Yes** |  | Reference video URL. The character actions in the generated video will be consistent with this reference video. Shoul... |
| `character_orientation` | enum: `image`, `video` | **Yes** |  | Controls whether the output character's orientation matches the reference image or video. 'video': orientation matche... |
| `keep_original_sound` | boolean | No | `true` | Whether to keep the original sound from the reference video. |
| `image_url` | string | **Yes** |  | Reference image URL. The characters, backgrounds, and other elements in the generated video are based on this referen... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/v2.6/standard/motion-control", {
  input: {
        "video_url": "https://example.com/input.png",
        "character_orientation": "image",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/v2.6/standard/motion-control", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/v2.6/standard/motion-control", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/v2.6/standard/motion-control/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/v2.6/standard/motion-control
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
