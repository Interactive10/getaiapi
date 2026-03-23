---
name: fal-ai-moonvalley-marey-pose-transfer
description: >
  Use this skill for the fal.ai Marey Realism V1.5 model (moonvalley/marey/pose-transfer). Ideal for matching human movement. Your input video determines human poses, gestures, and body movements that will appear in the generated video.
---

# Marey Realism V1.5

Ideal for matching human movement. Your input video determines human poses, gestures, and body movements that will appear in the generated video.

**Endpoint:** `moonvalley/marey/pose-transfer`
**Source:** https://fal.ai/models/moonvalley/marey/pose-transfer/api

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

const result = await fal.subscribe("moonvalley/marey/pose-transfer", {
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
| `prompt` | string | **Yes** |  | The prompt to generate a video from |
| `video_url` | string | **Yes** |  | The URL of the video to use as the control video. |
| `seed` | integer | null | No | `-1` | Seed for random number generation. Use -1 for random seed each run. |
| `reference_image_url` | string | null | No |  | Optional reference image URL to use for pose control or as a starting frame |
| `negative_prompt` | string | null | No | `"<synthetic> <scene cut> low-poly, flat shader, bad rigging, stiff animation, uncanny eyes, low-quality textures, looping glitch, cheap effect, overbloom, bloom spam, default lighting, game asset, stiff face, ugly specular, AI artifacts"` | Negative prompt used to guide the model away from undesirable features. |
| `first_frame_image_url` | string | null | No |  | Optional first frame image URL to use as the first frame of the generated video |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("moonvalley/marey/pose-transfer", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("moonvalley/marey/pose-transfer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("moonvalley/marey/pose-transfer", {
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

- API page: https://fal.ai/models/moonvalley/marey/pose-transfer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=moonvalley/marey/pose-transfer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
