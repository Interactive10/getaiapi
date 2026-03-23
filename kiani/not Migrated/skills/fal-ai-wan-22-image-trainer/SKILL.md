---
name: fal-ai-wan-22-image-trainer
description: >
  Use this skill for the fal.ai Wan 2.2 14B Image Trainer model (fal-ai/wan-22-image-trainer). Wan 2.2 text to image LoRA trainer. Fine-tune Wan 2.2 for subjects and styles with unprecedented detail.
---

# Wan 2.2 14B Image Trainer

Wan 2.2 text to image LoRA trainer. Fine-tune Wan 2.2 for subjects and styles with unprecedented detail.

**Endpoint:** `fal-ai/wan-22-image-trainer`
**Source:** https://fal.ai/models/fal-ai/wan-22-image-trainer/api

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

const result = await fal.subscribe("fal-ai/wan-22-image-trainer", {
  input: {
        "trigger_phrase": "your value here",
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
| `trigger_phrase` | string | **Yes** |  | Trigger phrase for the model. |
| `use_masks` | boolean | No | `true` | Whether to use masks for the training data. |
| `learning_rate` | float | No | `0.0007` | Learning rate for training. |
| `use_face_cropping` | boolean | No | `false` | Whether to use face cropping for the training data. When enabled, images will be cropped to the face before resizing. |
| `training_data_url` | string | **Yes** |  | URL to the training data. |
| `include_synthetic_captions` | boolean | No | `false` | Whether to include synthetic captions. |
| `steps` | integer | No | `1000` | Number of training steps. |
| `is_style` | boolean | No | `false` | Whether the training data is style data. If true, face specific options like masking and face detection will be disab... |
| `use_face_detection` | boolean | No | `true` | Whether to use face detection for the training data. When enabled, images will use the center of the face as the cent... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `config_file` | File |  |
| `high_noise_lora` | File |  |
| `diffusers_lora_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-22-image-trainer", {
  input: {
        "trigger_phrase": "your value here",
        "training_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-22-image-trainer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-22-image-trainer", {
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

- API page: https://fal.ai/models/fal-ai/wan-22-image-trainer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-22-image-trainer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
