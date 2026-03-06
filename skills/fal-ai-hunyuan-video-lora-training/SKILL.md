---
name: fal-ai-hunyuan-video-lora-training
description: >
  Use this skill for the fal.ai Train Hunyuan LoRA model (fal-ai/hunyuan-video-lora-training). Train Hunyuan Video lora on people, objects, characters and more!
---

# Train Hunyuan LoRA

Train Hunyuan Video lora on people, objects, characters and more!

**Endpoint:** `fal-ai/hunyuan-video-lora-training`
**Source:** https://fal.ai/models/fal-ai/hunyuan-video-lora-training/api

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

const result = await fal.subscribe("fal-ai/hunyuan-video-lora-training", {
  input: {
        "images_data_url": "https://example.com/input.png",
        "steps": 1
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
| `trigger_word` | string | No | `""` | The trigger word to use. |
| `images_data_url` | string | **Yes** |  | URL to zip archive with images. Try to use at least 4 images in general the more the better.          In addition to ... |
| `steps` | integer | **Yes** |  | Number of steps to train the LoRA on. |
| `data_archive_format` | string | null | No |  | The format of the archive. If not specified, the format will be inferred from the URL. |
| `learning_rate` | float | No | `0.0001` | Learning rate to use for training. |
| `do_caption` | boolean | No | `true` | Whether to generate captions for the images. |

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
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video-lora-training", {
  input: {
        "images_data_url": "https://example.com/input.png",
        "steps": 1
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-video-lora-training", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-video-lora-training", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-video-lora-training/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-video-lora-training
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
