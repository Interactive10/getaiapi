---
name: fal-ai-qwen-image-2512-trainer-v2
description: >
  Use this skill for the fal.ai Qwen Image 2512 Trainer V2 model (fal-ai/qwen-image-2512-trainer-v2). Fast LoRA trainer for Qwen-Image-2512
---

# Qwen Image 2512 Trainer V2

Fast LoRA trainer for Qwen-Image-2512

**Endpoint:** `fal-ai/qwen-image-2512-trainer-v2`
**Source:** https://fal.ai/models/fal-ai/qwen-image-2512-trainer-v2/api

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

const result = await fal.subscribe("fal-ai/qwen-image-2512-trainer-v2", {
  input: {
        "image_data_url": "https://example.com/input.png"
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
| `steps` | integer | No | `2000` | Number of steps to train for |
| `image_data_url` | string | **Yes** |  | URL to the input data zip archive.          The zip should contain pairs of images and corresponding captions.       ... |
| `learning_rate` | float | No | `0.0005` | Learning rate. |
| `default_caption` | string | null | No |  | Default caption to use when caption files are missing. If None, missing captions will cause an error. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `config_file` | File |  |
| `diffusers_lora_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-image-2512-trainer-v2", {
  input: {
        "image_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-image-2512-trainer-v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-image-2512-trainer-v2", {
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

- API page: https://fal.ai/models/fal-ai/qwen-image-2512-trainer-v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-image-2512-trainer-v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
