---
name: fal-ai-bria-fibo-edit-edit-structured_instruction
description: >
  Use this skill for the fal.ai Fibo Edit [Structured Instruction] model (bria/fibo-edit/edit/structured_instruction). Structured Instructions Generation endpoint for Fibo Edit, Bria's newest editing model.
---

# Fibo Edit [Structured Instruction]

Structured Instructions Generation endpoint for Fibo Edit, Bria's newest editing model.

**Endpoint:** `bria/fibo-edit/edit/structured_instruction`
**Source:** https://fal.ai/models/bria/fibo-edit/edit/structured_instruction/api

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

const result = await fal.subscribe("bria/fibo-edit/edit/structured_instruction", {
  input: {
        "prompt": "your prompt here"
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
| `sync_mode` | boolean | No | `false` | If true, returns the image directly in the response (increases latency). |
| `seed` | integer | No | `5555` | Random seed for reproducibility. |
| `mask_url` | string | null | No |  | Reference image mask (file or URL). Optional. |
| `instruction` | string | null | No |  | Instruction for image editing. |
| `image_url` | string | null | No |  | Reference image (file or URL). |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/fibo-edit/edit/structured_instruction", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/fibo-edit/edit/structured_instruction", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/fibo-edit/edit/structured_instruction", {
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

- API page: https://fal.ai/models/bria/fibo-edit/edit/structured_instruction/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/fibo-edit/edit/structured_instruction
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
