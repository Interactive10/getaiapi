---
name: fal-ai-face-to-sticker
description: >
  Use this skill for the fal.ai Face to Sticker model (fal-ai/face-to-sticker). Create stickers from faces.
---

# Face to Sticker

Create stickers from faces.

**Endpoint:** `fal-ai/face-to-sticker`
**Source:** https://fal.ai/models/fal-ai/face-to-sticker/api

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

const result = await fal.subscribe("fal-ai/face-to-sticker", {
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
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. |
| `ip_adapter_weight` | float | No | `0.2` | The weight of the IP adapter. |
| `image_url` | string | **Yes** |  | URL of the video. |
| `upscale_steps` | integer | No | `10` | The number of steps to use for upscaling. Only used if `upscale` is `true`. |
| `instant_id_strength` | float | No | `0.7` | The strength of the instant ID. |
| `upscale` | boolean | No | `false` | Whether to upscale the image 2x. |
| `guidance_scale` | float | No | `4.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_inference_steps` | integer | No | `20` | Increasing the amount of steps tells Stable Diffusion that it should take more steps             to generate your fin... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `ip_adapter_noise` | float | No | `0.5` | The amount of noise to add to the IP adapter. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated images. |
| `sticker_image` | Image | The generated face sticker image. |
| `sticker_image_background_removed` | Image | The generated face sticker image with the background removed. |
| `seed` | integer | Seed used during the inference. |
| `has_nsfw_concepts` | Has Nsfw Concepts | Whether the generated images contain NSFW concepts.             The key is the image type and the value is a boolean. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/face-to-sticker", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/face-to-sticker", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/face-to-sticker", {
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

- API page: https://fal.ai/models/fal-ai/face-to-sticker/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/face-to-sticker
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
