---
name: fal-ai-minimax-hailuo-02-standard-image-to-video
description: >
  Use this skill for the fal.ai MiniMax Hailuo 02 [Standard] (Image to Video) model (fal-ai/minimax/hailuo-02/standard/image-to-video). MiniMax Hailuo-02 Image To Video API (Standard, 768p, 512p): Advanced image-to-video generation model with 768p and 512p resolutions
---

# MiniMax Hailuo 02 [Standard] (Image to Video)

MiniMax Hailuo-02 Image To Video API (Standard, 768p, 512p): Advanced image-to-video generation model with 768p and 512p resolutions

**Endpoint:** `fal-ai/minimax/hailuo-02/standard/image-to-video`
**Source:** https://fal.ai/models/fal-ai/minimax/hailuo-02/standard/image-to-video/api

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

const result = await fal.subscribe("fal-ai/minimax/hailuo-02/standard/image-to-video", {
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
| `prompt` | string | **Yes** |  |  |
| `resolution` | enum: `512P`, `768P` | No | `"768P"` | The resolution of the generated video. |
| `duration` | enum: `6`, `10` | No | `"6"` | The duration of the video in seconds. 10 seconds videos are not supported for 1080p resolution. |
| `prompt_optimizer` | boolean | No | `true` | Whether to use the model's prompt optimizer |
| `end_image_url` | string | null | No |  | Optional URL of the image to use as the last frame of the video |
| `image_url` | string | **Yes** |  |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/hailuo-02/standard/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/hailuo-02/standard/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/hailuo-02/standard/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/minimax/hailuo-02/standard/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/hailuo-02/standard/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
