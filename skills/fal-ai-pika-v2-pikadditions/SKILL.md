---
name: fal-ai-pika-v2-pikadditions
description: >
  Use this skill for the fal.ai Pikadditions (v2) model (fal-ai/pika/v2/pikadditions). Pikadditions is a powerful video-to-video AI model that allows you to add anyone or anything to any video with seamless integration.
---

# Pikadditions (v2)

Pikadditions is a powerful video-to-video AI model that allows you to add anyone or anything to any video with seamless integration.

**Endpoint:** `fal-ai/pika/v2/pikadditions`
**Source:** https://fal.ai/models/fal-ai/pika/v2/pikadditions/api

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

const result = await fal.subscribe("fal-ai/pika/v2/pikadditions", {
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
| `prompt` | string | null | No |  | Text prompt describing what to add |
| `video_url` | string | **Yes** |  | URL of the input video |
| `seed` | integer | null | No |  | The seed for the random number generator |
| `negative_prompt` | string | null | No |  | Negative prompt to guide the model |
| `image_url` | string | **Yes** |  | URL of the image to add |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pika/v2/pikadditions", {
  input: {
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pika/v2/pikadditions", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pika/v2/pikadditions", {
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

- API page: https://fal.ai/models/fal-ai/pika/v2/pikadditions/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pika/v2/pikadditions
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
