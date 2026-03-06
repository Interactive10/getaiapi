---
name: fal-ai-minimax-hailuo-2.3-standard-text-to-video
description: >
  Use this skill for the fal.ai MiniMax Hailuo 2.3 [Standard] (Text to Video) model (fal-ai/minimax/hailuo-2.3/standard/text-to-video). MiniMax Hailuo-2.3 Text To Video API (Standard, 768p): Advanced text-to-video generation model with 768p resolution
---

# MiniMax Hailuo 2.3 [Standard] (Text to Video)

MiniMax Hailuo-2.3 Text To Video API (Standard, 768p): Advanced text-to-video generation model with 768p resolution

**Endpoint:** `fal-ai/minimax/hailuo-2.3/standard/text-to-video`
**Source:** https://fal.ai/models/fal-ai/minimax/hailuo-2.3/standard/text-to-video/api

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

const result = await fal.subscribe("fal-ai/minimax/hailuo-2.3/standard/text-to-video", {
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
| `prompt` | string | **Yes** |  |  |
| `duration` | enum: `6`, `10` | No | `"6"` | The duration of the video in seconds. |
| `prompt_optimizer` | boolean | No | `true` | Whether to use the model's prompt optimizer |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/hailuo-2.3/standard/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/hailuo-2.3/standard/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/hailuo-2.3/standard/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/minimax/hailuo-2.3/standard/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/hailuo-2.3/standard/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
