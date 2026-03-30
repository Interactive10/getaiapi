---
name: fal-ai-bytedance-seedream-v5-lite-text-to-image
description: >
  Use this skill for the fal.ai Bytedance model (fal-ai/bytedance/seedream/v5/lite/text-to-image). Text to Image endpoint for the fast Lite version of Seedream 5.0, supporting high quality intelligent text-to-image generation.
---

# Bytedance

Text to Image endpoint for the fast Lite version of Seedream 5.0, supporting high quality intelligent text-to-image generation.

**Endpoint:** `fal-ai/bytedance/seedream/v5/lite/text-to-image`
**Source:** https://fal.ai/models/fal-ai/bytedance/seedream/v5/lite/text-to-image/api

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

const result = await fal.subscribe("fal-ai/bytedance/seedream/v5/lite/text-to-image", {
  input: {
        "prompt": "your value here"
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
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `num_images` | integer | No | `1` | Number of separate model generations to be run with the prompt. |
| `image_size` | ImageSize | enum (8 values) | No | `"auto_2K"` | The size of the generated image. Total pixels must be between 2560x1440 and 3072x3072. In case the image size does no... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `prompt` | string | **Yes** |  | The text prompt used to generate the image |
| `max_images` | integer | No | `1` | If set to a number greater than one, enables multi-image generation. The model will potentially return up to `max_ima... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Generated images |
| `seed` | integer | Seed used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance/seedream/v5/lite/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance/seedream/v5/lite/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance/seedream/v5/lite/text-to-image", {
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

- API page: https://fal.ai/models/fal-ai/bytedance/seedream/v5/lite/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/seedream/v5/lite/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
