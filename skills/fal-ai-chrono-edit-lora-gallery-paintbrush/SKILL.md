---
name: fal-ai-chrono-edit-lora-gallery-paintbrush
description: >
  Use this skill for the fal.ai Chrono Edit Lora Gallery model (fal-ai/chrono-edit-lora-gallery/paintbrush). You can make edits simply by drawing a quick sketch on the input image.
---

# Chrono Edit Lora Gallery

You can make edits simply by drawing a quick sketch on the input image.

**Endpoint:** `fal-ai/chrono-edit-lora-gallery/paintbrush`
**Source:** https://fal.ai/models/fal-ai/chrono-edit-lora-gallery/paintbrush/api

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

const result = await fal.subscribe("fal-ai/chrono-edit-lora-gallery/paintbrush", {
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
| `prompt` | string | **Yes** |  | Describe how to transform the sketched regions. |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | The resolution of the output image. |
| `lora_scale` | float | No | `1` | The scale factor for the LoRA adapter. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the output image. |
| `image_url` | string | **Yes** |  | The image to edit. |
| `sync_mode` | boolean | No | `false` | Whether to return the image in sync mode. |
| `turbo_mode` | boolean | No | `true` | Enable turbo mode to use faster inference. |
| `loras` | list<ChronoLoraWeight> | No | `[]` | Optional additional LoRAs to merge (max 3). |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `num_inference_steps` | integer | No | `8` | Number of denoising steps to run. |
| `mask_url` | string | null | No |  | Optional mask image where black areas indicate regions to sketch/paint. |
| `guidance_scale` | float | No | `1` | Classifier-free guidance scale. |
| `seed` | integer | null | No |  | The seed for the inference. |

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
const { request_id } = await fal.queue.submit("fal-ai/chrono-edit-lora-gallery/paintbrush", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chrono-edit-lora-gallery/paintbrush", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chrono-edit-lora-gallery/paintbrush", {
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

- API page: https://fal.ai/models/fal-ai/chrono-edit-lora-gallery/paintbrush/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chrono-edit-lora-gallery/paintbrush
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
