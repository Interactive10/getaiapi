---
name: fal-ai-moondream-next-batch
description: >
  Use this skill for the fal.ai MoonDreamNext Batch model (fal-ai/moondream-next/batch). MoonDreamNext Batch is a multimodal vision-language model for batch captioning.
---

# MoonDreamNext Batch

MoonDreamNext Batch is a multimodal vision-language model for batch captioning.

**Endpoint:** `fal-ai/moondream-next/batch`
**Source:** https://fal.ai/models/fal-ai/moondream-next/batch/api

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

const result = await fal.subscribe("fal-ai/moondream-next/batch", {
  input: {
        "prompt": "your value here",
        "images_data_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | Single prompt to apply to all images |
| `images_data_url` | string | **Yes** |  | List of image URLs to be processed (maximum 32 images) |
| `max_tokens` | integer | No | `64` | Maximum number of tokens to generate |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `outputs` | list<string> | List of generated captions |
| `captions_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/moondream-next/batch", {
  input: {
        "prompt": "your value here",
        "images_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/moondream-next/batch", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/moondream-next/batch", {
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

- API page: https://fal.ai/models/fal-ai/moondream-next/batch/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/moondream-next/batch
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
