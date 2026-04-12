---
name: fal-ai-arbiter-image-text
description: >
  Use this skill for the fal.ai Arbiter model (fal-ai/arbiter/image/text). Semantic image alignment measurements
---

# Arbiter

Semantic image alignment measurements

**Endpoint:** `fal-ai/arbiter/image/text`
**Source:** https://fal.ai/models/fal-ai/arbiter/image/text/api

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

const result = await fal.subscribe("fal-ai/arbiter/image/text", {
  input: {
        "measurements": [],
        "inputs": []
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
| `measurements` | list<enum: `clip_score`> | **Yes** |  | The measurements to use for the measurement. |
| `inputs` | list<SemanticImageInput> | **Yes** |  | The inputs to use for the measurement. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `values` | list<object> | The values of the measurements. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/arbiter/image/text", {
  input: {
        "measurements": [],
        "inputs": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/arbiter/image/text", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/arbiter/image/text", {
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

- API page: https://fal.ai/models/fal-ai/arbiter/image/text/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/arbiter/image/text
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
