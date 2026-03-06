---
name: fal-ai-rundiffusion-fal-juggernaut-flux-pro
description: >
  Use this skill for the fal.ai Juggernaut Flux Pro model (rundiffusion-fal/juggernaut-flux/pro). Juggernaut Pro Flux by RunDiffusion is the flagship Juggernaut model rivaling some of the most advanced image models available, often surpassing them in realism. It combines Juggernaut Base with RunDi
---

# Juggernaut Flux Pro

Juggernaut Pro Flux by RunDiffusion is the flagship Juggernaut model rivaling some of the most advanced image models available, often surpassing them in realism. It combines Juggernaut Base with RunDiffusion Photo and features enhancements like reduced background blurriness.

**Endpoint:** `rundiffusion-fal/juggernaut-flux/pro`
**Source:** https://fal.ai/models/rundiffusion-fal/juggernaut-flux/pro/api

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

const result = await fal.subscribe("rundiffusion-fal/juggernaut-flux/pro", {
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"landscape_4_3"` | The size of the generated image. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `3.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |

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
const { request_id } = await fal.queue.submit("rundiffusion-fal/juggernaut-flux/pro", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("rundiffusion-fal/juggernaut-flux/pro", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("rundiffusion-fal/juggernaut-flux/pro", {
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

- API page: https://fal.ai/models/rundiffusion-fal/juggernaut-flux/pro/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=rundiffusion-fal/juggernaut-flux/pro
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
