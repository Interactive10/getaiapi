---
name: fal-ai-clarity-upscaler
description: >
  Use this skill for the fal.ai Clarity Upscaler model (fal-ai/clarity-upscaler). Clarity upscaler for upscaling images with high very fidelity.
---

# Clarity Upscaler

Clarity upscaler for upscaling images with high very fidelity.

**Endpoint:** `fal-ai/clarity-upscaler`
**Source:** https://fal.ai/models/fal-ai/clarity-upscaler/api

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

const result = await fal.subscribe("fal-ai/clarity-upscaler", {
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
| `prompt` | string | No | `"masterpiece, best quality, highres"` | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `resemblance` | float | No | `0.6` | The resemblance of the upscaled image to the original image. The higher the resemblance, the more the model will try ... |
| `creativity` | float | No | `0.35` | The creativity of the model. The higher the creativity, the more the model will deviate from the prompt.             ... |
| `image_url` | string | **Yes** |  | The URL of the image to upscale. |
| `upscale_factor` | float | No | `2` | The upscale factor |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `num_inference_steps` | integer | No | `18` | The number of inference steps to perform. |
| `guidance_scale` | float | No | `4` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `negative_prompt` | string | No | `"(worst quality, low quality, normal quality:2)"` | The negative prompt to use. Use it to address details that you don't want in the image. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The URL of the generated image. |
| `timings` | Timings | The timings of the different steps in the workflow. |
| `seed` | integer | The seed used to generate the image. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/clarity-upscaler", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/clarity-upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/clarity-upscaler", {
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

- API page: https://fal.ai/models/fal-ai/clarity-upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/clarity-upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
