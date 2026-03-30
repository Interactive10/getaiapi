---
name: fal-ai-bytedance-dreamactor-v2
description: >
  Use this skill for the fal.ai Bytedance model (fal-ai/bytedance/dreamactor/v2). Transfer motion from a video to characters in an image using Dreamactor v2. Great performance for non-human and multiple characters
---

# Bytedance

Transfer motion from a video to characters in an image using Dreamactor v2. Great performance for non-human and multiple characters

**Endpoint:** `fal-ai/bytedance/dreamactor/v2`
**Source:** https://fal.ai/models/fal-ai/bytedance/dreamactor/v2/api

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

const result = await fal.subscribe("fal-ai/bytedance/dreamactor/v2", {
  input: {
        "video_url": "https://example.com/input.png",
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
| `video_url` | string | **Yes** |  | The URL of the driving template video providing motion, facial expressions, and lip movement reference. Max duration:... |
| `trim_first_second` | boolean | No | `true` | Whether to crop the first second of the output video. The output has a 1-second transition at the beginning; enable t... |
| `image_url` | string | **Yes** |  | The URL of the reference image to animate. Supports real people, animation, pets, etc. Format: jpeg, jpg or png. Max ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance/dreamactor/v2", {
  input: {
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance/dreamactor/v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance/dreamactor/v2", {
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

- API page: https://fal.ai/models/fal-ai/bytedance/dreamactor/v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/dreamactor/v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
