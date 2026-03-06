---
name: fal-ai-image-editing-broccoli-haircut
description: >
  Use this skill for the fal.ai Image Editing model (fal-ai/image-editing/broccoli-haircut). Transform your character's hair into broccoli style while keeping the original characters likeness
---

# Image Editing

Transform your character's hair into broccoli style while keeping the original characters likeness

**Endpoint:** `fal-ai/image-editing/broccoli-haircut`
**Source:** https://fal.ai/models/fal-ai/image-editing/broccoli-haircut/api

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

const result = await fal.subscribe("fal-ai/image-editing/broccoli-haircut", {
  input: {
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
| `lora_scale` | float | No | `1` | The scale factor for the LoRA model. Controls the strength of the LoRA effect. |
| `image_url` | string | **Yes** |  | URL of the image to apply broccoli haircut style. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `3.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when lo... |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model will output the same image every time. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker for the generated image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> |  |
| `seed` | integer |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/image-editing/broccoli-haircut", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image-editing/broccoli-haircut", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image-editing/broccoli-haircut", {
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

- API page: https://fal.ai/models/fal-ai/image-editing/broccoli-haircut/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image-editing/broccoli-haircut
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
