---
name: fal-ai-moondream3-preview-query
description: >
  Use this skill for the fal.ai Moondream 3 Preview [Query] model (fal-ai/moondream3-preview/query). Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilities to real-world applications requiring fast, inexpensive i
---

# Moondream 3 Preview [Query]

Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilities to real-world applications requiring fast, inexpensive inference at scale.

**Endpoint:** `fal-ai/moondream3-preview/query`
**Source:** https://fal.ai/models/fal-ai/moondream3-preview/query/api

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

const result = await fal.subscribe("fal-ai/moondream3-preview/query", {
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
| `prompt` | string | **Yes** |  | Query to be asked in the image |
| `top_p` | float | null | No |  | Nucleus sampling probability mass to use, between 0 and 1. |
| `temperature` | float | null | No |  | Sampling temperature to use, between 0 and 1. Higher values like 0.8 will make the output more random, while lower va... |
| `reasoning` | boolean | No | `true` | Whether to include detailed reasoning behind the answer |
| `image_url` | string | **Yes** |  | URL of the image to be processed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `finish_reason` | string | Reason for finishing the output generation |
| `output` | string | Answer to the query about the image |
| `reasoning` | string | null | Detailed reasoning behind the answer, if enabled |
| `usage_info` | UsageInfo |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/moondream3-preview/query", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/moondream3-preview/query", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/moondream3-preview/query", {
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

- API page: https://fal.ai/models/fal-ai/moondream3-preview/query/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/moondream3-preview/query
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
