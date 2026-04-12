---
name: fal-ai-flux-2-trainer-edit
description: >
  Use this skill for the fal.ai Flux 2 Trainer model (fal-ai/flux-2-trainer/edit). Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks.
---

# Flux 2 Trainer

Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks.

**Endpoint:** `fal-ai/flux-2-trainer/edit`
**Source:** https://fal.ai/models/fal-ai/flux-2-trainer/edit/api

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

const result = await fal.subscribe("fal-ai/flux-2-trainer/edit", {
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
| `steps` | integer | No | `1000` | Total number of training steps. |
| `image_data_url` | string | **Yes** |  | URL to the input data zip archive.      The zip should contain pairs of images. The images should be named:      ROOT... |
| `learning_rate` | float | No | `5e-05` | Learning rate applied to trainable parameters. |
| `default_caption` | string | null | No |  | Default caption to use when caption files are missing. If None, missing captions will cause an error. |
| `output_lora_format` | enum: `fal`, `comfy` | No | `"fal"` | Dictates the naming scheme for the output weights |

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
const { request_id } = await fal.queue.submit("fal-ai/flux-2-trainer/edit", {
  input: {
        "image_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-2-trainer/edit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-2-trainer/edit", {
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

- API page: https://fal.ai/models/fal-ai/flux-2-trainer/edit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-2-trainer/edit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
