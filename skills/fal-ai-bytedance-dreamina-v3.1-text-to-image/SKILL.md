---
name: fal-ai-bytedance-dreamina-v3.1-text-to-image
description: >
  Use this skill for the fal.ai Bytedance model (fal-ai/bytedance/dreamina/v3.1/text-to-image). Dreamina showcases superior picture effects, with significant improvements in picture aesthetics, precise and diverse styles, and rich details.
---

# Bytedance

Dreamina showcases superior picture effects, with significant improvements in picture aesthetics, precise and diverse styles, and rich details.

**Endpoint:** `fal-ai/bytedance/dreamina/v3.1/text-to-image`
**Source:** https://fal.ai/models/fal-ai/bytedance/dreamina/v3.1/text-to-image/api

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

const result = await fal.subscribe("fal-ai/bytedance/dreamina/v3.1/text-to-image", {
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
| `prompt` | string | **Yes** |  | The text prompt used to generate the image |
| `num_images` | integer | No | `1` | Number of images to generate |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 1536, 'width': 2048}` | The size of the generated image. Width and height must be between 512 and 2048. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `seed` | integer | null | No |  | Random seed to control the stochasticity of image generation. |
| `enhance_prompt` | boolean | No | `false` | Whether to use an LLM to enhance the prompt |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Generated images |
| `seed` | integer | Seed used for generation |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance/dreamina/v3.1/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance/dreamina/v3.1/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance/dreamina/v3.1/text-to-image", {
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

- API page: https://fal.ai/models/fal-ai/bytedance/dreamina/v3.1/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/dreamina/v3.1/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
