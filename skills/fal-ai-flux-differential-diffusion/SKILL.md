---
name: fal-ai-flux-differential-diffusion
description: >
  Use this skill for the fal.ai FLUX.1 [dev] Differential Diffusion model (fal-ai/flux-differential-diffusion). FLUX.1 Differential Diffusion is a rapid endpoint that enables swift, granular control over image transformations through change maps, delivering fast and precise region-specific modifications while m
---

# FLUX.1 [dev] Differential Diffusion

FLUX.1 Differential Diffusion is a rapid endpoint that enables swift, granular control over image transformations through change maps, delivering fast and precise region-specific modifications while maintaining FLUX.1 [dev]'s high-quality output.

**Endpoint:** `fal-ai/flux-differential-diffusion`
**Source:** https://fal.ai/models/fal-ai/flux-differential-diffusion/api

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

const result = await fal.subscribe("fal-ai/flux-differential-diffusion", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "change_map_image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_url` | string | **Yes** |  | URL of image to use as initial image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `strength` | float | No | `0.85` | The strength to use for image-to-image. 1.0 is completely remakes the image while 0.0 preserves the original. |
| `guidance_scale` | float | No | `3.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `change_map_image_url` | string | **Yes** |  | URL of change map. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated image files info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `timings` | Timings |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-differential-diffusion", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "change_map_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-differential-diffusion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-differential-diffusion", {
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

- API page: https://fal.ai/models/fal-ai/flux-differential-diffusion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-differential-diffusion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
