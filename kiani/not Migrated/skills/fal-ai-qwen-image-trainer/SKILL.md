---
name: fal-ai-qwen-image-trainer
description: >
  Use this skill for the fal.ai Qwen Image Trainer model (fal-ai/qwen-image-trainer). Qwen Image LoRA training
---

# Qwen Image Trainer

Qwen Image LoRA training

**Endpoint:** `fal-ai/qwen-image-trainer`
**Source:** https://fal.ai/models/fal-ai/qwen-image-trainer/api

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

const result = await fal.subscribe("fal-ai/qwen-image-trainer", {
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
| `steps` | integer | No | `1000` | Total number of training steps to perform. Default is 4000. |
| `image_data_url` | string | **Yes** |  | URL to zip archive with images for training. The archive should contain images and corresponding text files with capt... |
| `learning_rate` | float | No | `0.0005` | Learning rate for training. Default is 5e-4 |
| `trigger_phrase` | string | No | `""` | Default caption to use for images that don't have corresponding text files. If provided, missing .txt files will be c... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `lora_file` | File |  |
| `config_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-image-trainer", {
  input: {
        "image_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-image-trainer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-image-trainer", {
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

- API page: https://fal.ai/models/fal-ai/qwen-image-trainer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-image-trainer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
