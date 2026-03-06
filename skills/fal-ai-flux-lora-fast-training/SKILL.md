---
name: fal-ai-flux-lora-fast-training
description: >
  Use this skill for the fal.ai Train Flux LoRA model (fal-ai/flux-lora-fast-training). Train styles, people and other subjects at blazing speeds.
---

# Train Flux LoRA

Train styles, people and other subjects at blazing speeds.

**Endpoint:** `fal-ai/flux-lora-fast-training`
**Source:** https://fal.ai/models/fal-ai/flux-lora-fast-training/api

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

const result = await fal.subscribe("fal-ai/flux-lora-fast-training", {
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
| `images_data_url` | string | **Yes** |  | URL to zip archive with images. Try to use at least 4 images in general the more the better.          In addition to ... |
| `is_input_format_already_preprocessed` | boolean | No | `false` | Specifies whether the input data is already in a processed format. When set to False (default), the system expects ra... |
| `trigger_word` | string | null | No |  | Trigger word to be used in the captions. If None, a trigger word will not be used.         If no captions are provide... |
| `steps` | integer | null | No |  | Number of steps to train the LoRA on. |
| `data_archive_format` | string | null | No |  | The format of the archive. If not specified, the format will be inferred from the URL. |
| `is_style` | boolean | No | `false` | If True, the training will be for a style. This will deactivate segmentation, captioning and will use trigger word in... |
| `create_masks` | boolean | No | `true` | If True segmentation masks will be used in the weight the training loss. For people a face mask is used if possible. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `config_file` | File |  |
| `debug_preprocessed_output` | File | null | URL to the preprocessed images. |
| `diffusers_lora_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
  input: {
        "images_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-lora-fast-training", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-lora-fast-training", {
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

- API page: https://fal.ai/models/fal-ai/flux-lora-fast-training/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-lora-fast-training
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
