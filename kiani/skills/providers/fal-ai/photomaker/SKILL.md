---
name: fal-ai-photomaker
description: >
  Use this skill for the fal.ai PhotoMaker model (fal-ai/photomaker). Customizing Realistic Human Photos via Stacked ID Embedding
---

# PhotoMaker

Customizing Realistic Human Photos via Stacked ID Embedding

**Endpoint:** `fal-ai/photomaker`
**Source:** https://fal.ai/models/fal-ai/photomaker/api

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

const result = await fal.subscribe("fal-ai/photomaker", {
  input: {
        "prompt": "your value here",
        "image_archive_url": "https://example.com/input.png"
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
| `num_images` | integer | No | `1` | Number of images to generate in one request. Note that the higher the batch size,             the longer it will take... |
| `style_strength` | integer | No | `20` |  |
| `style` | enum (11 values) | No | `"Photographic"` |  |
| `guidance_scale` | float | No | `5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `image_archive_url` | string | **Yes** |  | The URL of the image archive containing the images you want to use. |
| `initial_image_url` | string | No |  | Optional initial image for img2img |
| `num_inference_steps` | integer | No | `50` | Increasing the amount of steps tells Stable Diffusion that it should take more steps             to generate your fin... |
| `initial_image_strength` | float | No | `0.5` | How much noise to add to the latent image. O for no noise, 1 for maximum noise. |
| `base_pipeline` | enum: `photomaker`, `photomaker-style` | No | `"photomaker"` | The base pipeline to use for generating the image. |
| `negative_prompt` | string | No | `""` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> |  |
| `seed` | integer |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/photomaker", {
  input: {
        "prompt": "your value here",
        "image_archive_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/photomaker", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/photomaker", {
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

- API page: https://fal.ai/models/fal-ai/photomaker/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/photomaker
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
