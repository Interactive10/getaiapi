---
name: fal-ai-illusion-diffusion
description: >
  Use this skill for the fal.ai Illusion Diffusion model (fal-ai/illusion-diffusion). Create illusions conditioned on image.
---

# Illusion Diffusion

Create illusions conditioned on image.

**Endpoint:** `fal-ai/illusion-diffusion`
**Source:** https://fal.ai/models/fal-ai/illusion-diffusion/api

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

const result = await fal.subscribe("fal-ai/illusion-diffusion", {
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. You can choose between some presets or             custom height and width that **mu... |
| `controlnet_conditioning_scale` | float | No | `1` | The scale of the ControlNet. |
| `image_url` | string | **Yes** |  | Input image url. |
| `scheduler` | enum: `DPM++ Karras SDE`, `Euler` | No | `"Euler"` | Scheduler / sampler to use for the image denoising process. |
| `control_guidance_start` | float | No | `0` |  |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | null | No |  | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `control_guidance_end` | float | No | `1` |  |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `num_inference_steps` | integer | No | `40` | Increasing the amount of steps tells Stable Diffusion that it should take more steps             to generate your fin... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/illusion-diffusion", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/illusion-diffusion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/illusion-diffusion", {
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

- API page: https://fal.ai/models/fal-ai/illusion-diffusion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/illusion-diffusion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
