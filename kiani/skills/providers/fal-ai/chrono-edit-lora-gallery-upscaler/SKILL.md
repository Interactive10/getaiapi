---
name: fal-ai-chrono-edit-lora-gallery-upscaler
description: >
  Use this skill for the fal.ai Chrono Edit Lora Gallery model (fal-ai/chrono-edit-lora-gallery/upscaler). Upscales and cleans up the image.
---

# Chrono Edit Lora Gallery

Upscales and cleans up the image.

**Endpoint:** `fal-ai/chrono-edit-lora-gallery/upscaler`
**Source:** https://fal.ai/models/fal-ai/chrono-edit-lora-gallery/upscaler/api

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

const result = await fal.subscribe("fal-ai/chrono-edit-lora-gallery/upscaler", {
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
| `lora_scale` | float | No | `1` | The scale factor for the LoRA adapter. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"jpeg"` | The format of the output image. |
| `image_url` | string | **Yes** |  | The image to upscale. |
| `sync_mode` | boolean | No | `false` | Whether to return the image in sync mode. |
| `loras` | list<ChronoLoraWeight> | No | `[]` | Optional additional LoRAs to merge (max 3). |
| `upscale_factor` | float | No | `2` | Target scale factor for the output resolution. |
| `guidance_scale` | float | No | `1` | The guidance scale for the inference. |
| `seed` | integer | null | No |  | The seed for the inference. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for the upscaling pass. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for the inference. |
| `images` | list<ImageFile> | The edited image. |
| `seed` | integer | The seed for the inference. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/chrono-edit-lora-gallery/upscaler", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chrono-edit-lora-gallery/upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chrono-edit-lora-gallery/upscaler", {
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

- API page: https://fal.ai/models/fal-ai/chrono-edit-lora-gallery/upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chrono-edit-lora-gallery/upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
