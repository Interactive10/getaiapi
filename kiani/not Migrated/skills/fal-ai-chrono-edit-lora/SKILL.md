---
name: fal-ai-chrono-edit-lora
description: >
  Use this skill for the fal.ai Chrono Edit Lora model (fal-ai/chrono-edit-lora). LoRA endpoint for the Chrono Edit model.
---

# Chrono Edit Lora

LoRA endpoint for the Chrono Edit model.

**Endpoint:** `fal-ai/chrono-edit-lora`
**Source:** https://fal.ai/models/fal-ai/chrono-edit-lora/api

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

const result = await fal.subscribe("fal-ai/chrono-edit-lora", {
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
| `prompt` | string | **Yes** |  | The prompt to edit the image. |
| `loras` | list<ChronoLoraWeight> | No | `[]` | Optional additional LoRAs to merge for this request (max 3). |
| `turbo_mode` | boolean | No | `true` | Enable turbo mode to use for faster inference. |
| `enable_temporal_reasoning` | boolean | No | `false` | Whether to enable temporal reasoning. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `guidance_scale` | float | No | `1` | The guidance scale for the inference. |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | The resolution of the output image. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"jpeg"` | The format of the output image. |
| `num_temporal_reasoning_steps` | integer | No | `8` | The number of temporal reasoning steps to perform. |
| `sync_mode` | boolean | No | `false` | Whether to return the image in sync mode. |
| `image_url` | string | **Yes** |  | The image to edit. |
| `enable_prompt_expansion` | boolean | No | `true` | Whether to enable prompt expansion. |
| `num_inference_steps` | integer | No | `8` | The number of inference steps to perform. |
| `seed` | integer | No |  | The seed for the inference. |

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
const { request_id } = await fal.queue.submit("fal-ai/chrono-edit-lora", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chrono-edit-lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chrono-edit-lora", {
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

- API page: https://fal.ai/models/fal-ai/chrono-edit-lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chrono-edit-lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
