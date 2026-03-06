---
name: fal-ai-bria-fibo-edit-relight
description: >
  Use this skill for the fal.ai Fibo Edit [Relight] model (bria/fibo-edit/relight). Precise, controllable lighting changes using simple, structured text inputs.
---

# Fibo Edit [Relight]

Precise, controllable lighting changes using simple, structured text inputs.

**Endpoint:** `bria/fibo-edit/relight`
**Source:** https://fal.ai/models/bria/fibo-edit/relight/api

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

const result = await fal.subscribe("bria/fibo-edit/relight", {
  input: {
        "light_type": "midday",
        "light_direction": "...",
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
| `light_type` | enum (13 values) | **Yes** |  | The quality/style/time of day. |
| `light_direction` | enum: `front`, `side`, `bottom`, `top-down` | null | **Yes** |  | Where the light comes from. |
| `image_url` | string | **Yes** |  | The source image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Generated images. |
| `image` | Image | Represents an image file. |
| `structured_instruction` | Structured Instruction | Current instruction. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/fibo-edit/relight", {
  input: {
        "light_type": "midday",
        "light_direction": "...",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/fibo-edit/relight", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/fibo-edit/relight", {
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

- API page: https://fal.ai/models/bria/fibo-edit/relight/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/fibo-edit/relight
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
