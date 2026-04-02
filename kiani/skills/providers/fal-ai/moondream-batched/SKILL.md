---
name: fal-ai-moondream-batched
description: >
  Use this skill for the fal.ai Moondream model (fal-ai/moondream/batched). Answer questions from the images.
---

# Moondream

Answer questions from the images.

**Endpoint:** `fal-ai/moondream/batched`
**Source:** https://fal.ai/models/fal-ai/moondream/batched/api

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

const result = await fal.subscribe("fal-ai/moondream/batched", {
  input: {
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
| `model_id` | enum: `vikhyatk/moondream2`, `fal-ai/moondream2-docci` | No | `"vikhyatk/moondream2"` | Model ID to use for inference |
| `repetition_penalty` | float | No | `1` | Repetition penalty for sampling |
| `inputs` | list<MoondreamInputParam> | **Yes** |  | List of input prompts and image URLs |
| `max_tokens` | integer | No | `64` | Maximum number of new tokens to generate |
| `temperature` | float | No | `0.2` | Temperature for sampling |
| `top_p` | float | No | `1` | Top P for sampling |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `filenames` | list<string> | Filenames of the images processed |
| `outputs` | list<string> | List of generated outputs |
| `partial` | boolean | Whether the output is partial |
| `timings` | Timings | Timings for different parts of the process |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/moondream/batched", {
  input: {
        "inputs": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/moondream/batched", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/moondream/batched", {
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

- API page: https://fal.ai/models/fal-ai/moondream/batched/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/moondream/batched
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
