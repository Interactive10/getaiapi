---
name: fal-ai-lucidflux
description: >
  Use this skill for the fal.ai Lucidflux model (fal-ai/lucidflux). LucidFlux for upscaling images with very high fidelity
---

# Lucidflux

LucidFlux for upscaling images with very high fidelity

**Endpoint:** `fal-ai/lucidflux`
**Source:** https://fal.ai/models/fal-ai/lucidflux/api

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

const result = await fal.subscribe("fal-ai/lucidflux", {
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
| `guidance` | float | No | `4` | The guidance to use for the diffusion process. |
| `target_height` | integer | No | `1024` | The height of the output image. |
| `image_url` | string | **Yes** |  | The URL of the image to edit. |
| `target_width` | integer | No | `1024` | The width of the output image. |
| `num_inference_steps` | integer | No | `50` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `seed` | integer | No | `42` | Seed used for random number generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Generated image |
| `seed` | integer | Seed used for random number generation |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/lucidflux", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/lucidflux", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/lucidflux", {
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

- API page: https://fal.ai/models/fal-ai/lucidflux/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/lucidflux
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
