---
name: fal-ai-pixverse-extend-fast
description: >
  Use this skill for the fal.ai Pixverse model (fal-ai/pixverse/extend/fast). PixVerse Extend model is a video extending tool for your videos using with high-quality video extending techniques
---

# Pixverse

PixVerse Extend model is a video extending tool for your videos using with high-quality video extending techniques

**Endpoint:** `fal-ai/pixverse/extend/fast`
**Source:** https://fal.ai/models/fal-ai/pixverse/extend/fast/api

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

const result = await fal.subscribe("fal-ai/pixverse/extend/fast", {
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
| `prompt` | string | **Yes** |  | Prompt describing how to extend the video |
| `video_url` | string | **Yes** |  | URL of the input video to extend |
| `resolution` | enum: `360p`, `540p`, `720p` | No | `"720p"` | The resolution of the generated video. Fast mode doesn't support 1080p |
| `style` | enum: `anime`, `3d_animation`, `clay`, `comic`, `cyberpunk` | null | No |  | The style of the extended video |
| `model` | enum: `v3.5`, `v4`, `v4.5`, `v5`, `v5.5`, `v5.6` | No | `"v4.5"` | The model version to use for generation |
| `seed` | integer | null | No |  | Random seed for generation |
| `negative_prompt` | string | No | `""` | Negative prompt to be used for the generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pixverse/extend/fast", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pixverse/extend/fast", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pixverse/extend/fast", {
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

- API page: https://fal.ai/models/fal-ai/pixverse/extend/fast/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pixverse/extend/fast
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
