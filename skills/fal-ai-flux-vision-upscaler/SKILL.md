---
name: fal-ai-flux-vision-upscaler
description: >
  Use this skill for the fal.ai Flux Vision Upscaler model (fal-ai/flux-vision-upscaler). Flux Vision Upscaler for magnify/upscaling images with high fidelity and creativity.
---

# Flux Vision Upscaler

Flux Vision Upscaler for magnify/upscaling images with high fidelity and creativity.

**Endpoint:** `fal-ai/flux-vision-upscaler`
**Source:** https://fal.ai/models/fal-ai/flux-vision-upscaler/api

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

const result = await fal.subscribe("fal-ai/flux-vision-upscaler", {
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
| `guidance` | float | No | `1` | CFG/guidance scale (1-4). Controls how closely the model follows the prompt. |
| `creativity` | float | No | `0.3` | The creativity of the model. The higher the creativity, the more the model will deviate from the original. Refers to ... |
| `image_url` | string | **Yes** |  | The URL of the image to upscale. |
| `upscale_factor` | float | No | `2` | The upscale factor (1-4x). |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `seed` | integer | null | No |  | The seed to use for the upscale. If not provided, a random seed will be used. |
| `steps` | integer | No | `20` | Number of inference steps (4-50). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The URL of the generated image. |
| `caption` | string | The VLM-generated caption describing the upscaled image. |
| `seed` | integer | The seed used to generate the image. |
| `timings` | Timings | The timings of the different steps in the workflow. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-vision-upscaler", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-vision-upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-vision-upscaler", {
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

- API page: https://fal.ai/models/fal-ai/flux-vision-upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-vision-upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
