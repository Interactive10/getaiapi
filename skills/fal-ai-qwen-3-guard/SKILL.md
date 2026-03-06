---
name: fal-ai-qwen-3-guard
description: >
  Use this skill for the fal.ai Qwen 3 Guard [8B] model (fal-ai/qwen-3-guard). Use Qwen 3 Guard [8B] to detect and  classify text as safe or harmful, delivering precise and reliable safety categorization.
---

# Qwen 3 Guard [8B]

Use Qwen 3 Guard [8B] to detect and  classify text as safe or harmful, delivering precise and reliable safety categorization.

**Endpoint:** `fal-ai/qwen-3-guard`
**Source:** https://fal.ai/models/fal-ai/qwen-3-guard/api

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

const result = await fal.subscribe("fal-ai/qwen-3-guard", {
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
| `prompt` | string | **Yes** |  | The input text to be classified |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `categories` | list<enum (10 values)> | The confidence score of the classification |
| `label` | enum: `Safe`, `Unsafe`, `Controversial` | The classification label |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-3-guard", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-3-guard", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-3-guard", {
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

- API page: https://fal.ai/models/fal-ai/qwen-3-guard/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-3-guard
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
