---
name: fal-ai-lcm-sd15-i2i
description: >
  Use this skill for the fal.ai Optimized Latent Consistency (SDv1.5) model (fal-ai/lcm-sd15-i2i). Produce high-quality images with minimal inference steps. Optimized for 512x512 input image size.
---

# Optimized Latent Consistency (SDv1.5)

Produce high-quality images with minimal inference steps. Optimized for 512x512 input image size.

**Endpoint:** `fal-ai/lcm-sd15-i2i`
**Source:** https://fal.ai/models/fal-ai/lcm-sd15-i2i/api

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

const result = await fal.subscribe("fal-ai/lcm-sd15-i2i", {
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
| `num_images` | integer | No | `1` | The number of images to generate. The function will return a list of images             with the same prompt and nega... |
| `guidance_scale` | float | No | `1` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `image_url` | string | **Yes** |  | The image to use as a base. |
| `strength` | float | No | `0.8` | The strength of the image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `enable_safety_checks` | boolean | No | `true` | If set to true, the resulting image will be checked whether it includes any             potentially unsafe content. I... |
| `request_id` | string | No | `""` | An id bound to a request, can be used with response to identify the request             itself. |
| `num_inference_steps` | integer | No | `4` | The number of inference steps to use for generating the image. The more steps             the better the image will b... |
| `mask_url` | string | null | No |  | Mask URL for compatibility with generic LCM processing. |
| `negative_prompt` | string | No | `""` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated image files info. |
| `request_id` | string | An id bound to a request, can be used with response to identify the request             itself. |
| `timings` | Timings |  |
| `num_inference_steps` | integer | Number of inference steps used to generate the image. It will be the same value of the one passed in the             ... |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `nsfw_content_detected` | list<boolean> | A list of booleans indicating whether the generated image contains any             potentially unsafe content. If the... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/lcm-sd15-i2i", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/lcm-sd15-i2i", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/lcm-sd15-i2i", {
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

- API page: https://fal.ai/models/fal-ai/lcm-sd15-i2i/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/lcm-sd15-i2i
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
