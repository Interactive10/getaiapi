---
name: fal-ai-wan-v2.2-5b-text-to-image
description: >
  Use this skill for the fal.ai Wan model (fal-ai/wan/v2.2-5b/text-to-image). Wan 2.2's 5B model generates high-resolution, photorealistic images with powerful prompt understanding and fine-grained visual detail
---

# Wan

Wan 2.2's 5B model generates high-resolution, photorealistic images with powerful prompt understanding and fine-grained visual detail

**Endpoint:** `fal-ai/wan/v2.2-5b/text-to-image`
**Source:** https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-image/api

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

const result = await fal.subscribe("fal-ai/wan/v2.2-5b/text-to-image", {
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
| `prompt` | string | **Yes** |  | The text prompt to guide image generation. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. |
| `image_format` | enum: `png`, `jpeg` | No | `"jpeg"` | The format of the output image. |
| `shift` | float | No | `2` | Shift value for the image. Must be between 1.0 and 10.0. |
| `enable_output_safety_checker` | boolean | No | `false` | If set to true, output video will be checked for safety after generation. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `num_inference_steps` | integer | No | `40` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, input data will be checked for safety before processing. |
| `negative_prompt` | string | No | `""` | Negative prompt for video generation. |
| `guidance_scale` | float | No | `3.5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | File |  |
| `seed` | integer | The seed used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan/v2.2-5b/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan/v2.2-5b/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan/v2.2-5b/text-to-image", {
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

- API page: https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan/v2.2-5b/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
