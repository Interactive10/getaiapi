---
name: fal-ai-perceptron-isaac-01
description: >
  Use this skill for the fal.ai Isaac 0.1 model (perceptron/isaac-01). Isaac-01 is a multimodal vision-language model from Perceptron for various vision language tasks.
---

# Isaac 0.1

Isaac-01 is a multimodal vision-language model from Perceptron for various vision language tasks.

**Endpoint:** `perceptron/isaac-01`
**Source:** https://fal.ai/models/perceptron/isaac-01/api

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

const result = await fal.subscribe("perceptron/isaac-01", {
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
| `response_style` | enum: `text`, `box`, `point`, `polygon` | No | `"text"` | Response style to be used for the image.  - text: Model will output text. Good for descriptions and captioning. - box... |
| `image_url` | string | **Yes** |  | Image URL to be processed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `usage` | CompletionUsage | null | Usage information |
| `error` | string | null | Error message if an error occurred |
| `partial` | boolean | Whether the output is partial |
| `output` | string | Generated output |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("perceptron/isaac-01", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("perceptron/isaac-01", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("perceptron/isaac-01", {
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

- API page: https://fal.ai/models/perceptron/isaac-01/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=perceptron/isaac-01
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
