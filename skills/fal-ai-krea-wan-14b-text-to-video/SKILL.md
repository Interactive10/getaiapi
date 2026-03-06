---
name: fal-ai-krea-wan-14b-text-to-video
description: >
  Use this skill for the fal.ai Krea Wan 14b- Text to Video model (fal-ai/krea-wan-14b/text-to-video). Fast Text-to-Video endpoint for Krea's Wan 14b model.
---

# Krea Wan 14b- Text to Video

Fast Text-to-Video endpoint for Krea's Wan 14b model.

**Endpoint:** `fal-ai/krea-wan-14b/text-to-video`
**Source:** https://fal.ai/models/fal-ai/krea-wan-14b/text-to-video/api

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

const result = await fal.subscribe("fal-ai/krea-wan-14b/text-to-video", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Prompt for the video-to-video generation. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `num_frames` | integer | No | `78` | Number of frames to generate. Must be a multiple of 12 plus 6, for example 6, 18, 30, 42, etc. |
| `seed` | integer | null | No |  | Seed for the video-to-video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/krea-wan-14b/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/krea-wan-14b/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/krea-wan-14b/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/krea-wan-14b/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/krea-wan-14b/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
