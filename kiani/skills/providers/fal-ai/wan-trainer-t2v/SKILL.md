---
name: fal-ai-wan-trainer-t2v
description: >
  Use this skill for the fal.ai Wan-2.1 LoRA Trainer model (fal-ai/wan-trainer/t2v). Train custom LoRAs for Wan-2.1 T2V 1.3B
---

# Wan-2.1 LoRA Trainer

Train custom LoRAs for Wan-2.1 T2V 1.3B

**Endpoint:** `fal-ai/wan-trainer/t2v`
**Source:** https://fal.ai/models/fal-ai/wan-trainer/t2v/api

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

const result = await fal.subscribe("fal-ai/wan-trainer/t2v", {
  input: {
        "training_data_url": "https://example.com/input.png"
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
| `number_of_steps` | integer | No | `400` | The number of steps to train for. |
| `training_data_url` | string | **Yes** |  | URL to zip archive with images of a consistent style. Try to use at least 10 images and/or videos, although more is b... |
| `trigger_phrase` | string | No | `""` | The phrase that will trigger the model to generate an image. |
| `learning_rate` | float | No | `0.0002` | The rate at which the model learns. Higher values can lead to faster training, but over-fitting. |
| `auto_scale_input` | boolean | No | `false` | If true, the input will be automatically scale the video to 81 frames at 16fps. |

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
const { request_id } = await fal.queue.submit("fal-ai/wan-trainer/t2v", {
  input: {
        "training_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-trainer/t2v", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-trainer/t2v", {
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

- API page: https://fal.ai/models/fal-ai/wan-trainer/t2v/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-trainer/t2v
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
