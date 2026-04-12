---
name: fal-ai-image-editing-youtube-thumbnails
description: >
  Use this skill for the fal.ai Image Editing model (fal-ai/image-editing/youtube-thumbnails). Generate YouTube thumbnails with custom text
---

# Image Editing

Generate YouTube thumbnails with custom text

**Endpoint:** `fal-ai/image-editing/youtube-thumbnails`
**Source:** https://fal.ai/models/fal-ai/image-editing/youtube-thumbnails/api

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

const result = await fal.subscribe("fal-ai/image-editing/youtube-thumbnails", {
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
| `prompt` | string | No | `"Generate youtube thumbnails"` | The text to include in the YouTube thumbnail. |
| `lora_scale` | float | No | `0.5` | The scale factor for the LoRA model. Controls the strength of the LoRA effect. |
| `image_url` | string | **Yes** |  | URL of the image to convert to YouTube thumbnail style. |
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
const { request_id } = await fal.queue.submit("fal-ai/image-editing/youtube-thumbnails", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image-editing/youtube-thumbnails", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image-editing/youtube-thumbnails", {
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

- API page: https://fal.ai/models/fal-ai/image-editing/youtube-thumbnails/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image-editing/youtube-thumbnails
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
