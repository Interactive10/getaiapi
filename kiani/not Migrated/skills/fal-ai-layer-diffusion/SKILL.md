---
name: fal-ai-layer-diffusion
description: >
  Use this skill for the fal.ai Layer Diffusion XL model (fal-ai/layer-diffusion). SDXL with an alpha channel.
---

# Layer Diffusion XL

SDXL with an alpha channel.

**Endpoint:** `fal-ai/layer-diffusion`
**Source:** https://fal.ai/models/fal-ai/layer-diffusion/api

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

const result = await fal.subscribe("fal-ai/layer-diffusion", {
  input: {
        "prompt": "your prompt here"
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
| `prompt` | string | No | `""` | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `guidance_scale` | float | No | `8` | The guidance scale for the model. |
| `num_inference_steps` | integer | No | `20` | The number of inference steps for the model. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `negative_prompt` | string | No | `"text, watermark"` | The prompt to use for generating the negative image. Be as descriptive as possible for best results. |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The URL of the generated image. |
| `seed` | integer | The seed used to generate the image. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/layer-diffusion", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/layer-diffusion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/layer-diffusion", {
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

- API page: https://fal.ai/models/fal-ai/layer-diffusion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/layer-diffusion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
