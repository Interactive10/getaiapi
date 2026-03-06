---
name: fal-ai-turbo-flux-trainer
description: >
  Use this skill for the fal.ai Turbo Flux Trainer model (fal-ai/turbo-flux-trainer). A blazing fast FLUX dev LoRA trainer for subjects and styles.
---

# Turbo Flux Trainer

A blazing fast FLUX dev LoRA trainer for subjects and styles.

**Endpoint:** `fal-ai/turbo-flux-trainer`
**Source:** https://fal.ai/models/fal-ai/turbo-flux-trainer/api

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

const result = await fal.subscribe("fal-ai/turbo-flux-trainer", {
  input: {
        "images_data_url": "https://example.com/input.png"
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
| `images_data_url` | string | **Yes** |  | URL to zip archive with images of a consistent style. Try to use at least 10 images, although more is better. |
| `face_crop` | boolean | No | `true` | Whether to try to detect the face and crop the images to the face. |
| `trigger_phrase` | string | null | No | `"ohwx"` | Trigger phrase to be used in the captions. If None, a trigger word will not be used.         If no captions are provi... |
| `learning_rate` | float | No | `0.00115` | Learning rate for the training. |
| `steps` | integer | No | `1000` | Number of steps to train the LoRA on. |
| `training_style` | enum: `subject`, `style` | null | No | `"subject"` | Training style to use. |

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
const { request_id } = await fal.queue.submit("fal-ai/turbo-flux-trainer", {
  input: {
        "images_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/turbo-flux-trainer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/turbo-flux-trainer", {
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

- API page: https://fal.ai/models/fal-ai/turbo-flux-trainer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/turbo-flux-trainer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
