---
name: fal-ai-llava-next
description: >
  Use this skill for the fal.ai LLaVA v1.6 34B model (fal-ai/llava-next). Vision
---

# LLaVA v1.6 34B

Vision

**Endpoint:** `fal-ai/llava-next`
**Source:** https://fal.ai/models/fal-ai/llava-next/api

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

const result = await fal.subscribe("fal-ai/llava-next", {
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
| `prompt` | string | **Yes** |  | Prompt to be used for the image |
| `top_p` | float | No | `1` | Top P for sampling |
| `max_tokens` | integer | No | `64` | Maximum number of tokens to generate |
| `temperature` | float | No | `0.2` | Temperature for sampling |
| `image_url` | string | **Yes** |  | URL of the image to be processed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `partial` | boolean | Whether the output is partial |
| `output` | string | Generated output |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/llava-next", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/llava-next", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/llava-next", {
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

- API page: https://fal.ai/models/fal-ai/llava-next/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/llava-next
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
