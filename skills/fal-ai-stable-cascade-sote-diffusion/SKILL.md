---
name: fal-ai-stable-cascade-sote-diffusion
description: >
  Use this skill for the fal.ai SoteDiffusion model (fal-ai/stable-cascade/sote-diffusion). Anime finetune of Würstchen V3.
---

# SoteDiffusion

Anime finetune of Würstchen V3.

**Endpoint:** `fal-ai/stable-cascade/sote-diffusion`
**Source:** https://fal.ai/models/fal-ai/stable-cascade/sote-diffusion/api

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

const result = await fal.subscribe("fal-ai/stable-cascade/sote-diffusion", {
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 1536, 'width': 1024}` | The size of the generated image. |
| `second_stage_guidance_scale` | float | No | `2` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `sync_mode` | boolean | No | `false` | If set to true, the image will be returned as base64 encoded string. |
| `first_stage_steps` | integer | No | `25` | Number of steps to run the first stage for. |
| `guidance_scale` | float | No | `8` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Cascade             will output the same image ... |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `second_stage_steps` | integer | No | `10` | Number of steps to run the second stage for. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated image files info. |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/stable-cascade/sote-diffusion", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/stable-cascade/sote-diffusion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/stable-cascade/sote-diffusion", {
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

- API page: https://fal.ai/models/fal-ai/stable-cascade/sote-diffusion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/stable-cascade/sote-diffusion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
