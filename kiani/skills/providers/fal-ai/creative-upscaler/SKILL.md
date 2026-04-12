---
name: fal-ai-creative-upscaler
description: >
  Use this skill for the fal.ai Creative Upscaler model (fal-ai/creative-upscaler). Create creative upscaled images.
---

# Creative Upscaler

Create creative upscaled images.

**Endpoint:** `fal-ai/creative-upscaler`
**Source:** https://fal.ai/models/fal-ai/creative-upscaler/api

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

const result = await fal.subscribe("fal-ai/creative-upscaler", {
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
| `shape_preservation` | float | No | `0.25` | How much to preserve the shape of the original image |
| `prompt` | string | No |  | The prompt to use for generating the image. Be as descriptive as possible for best results. If no prompt is provide B... |
| `additional_embedding_url` | string | No |  | The URL to the additional embeddings to use for the upscaling. Default is None |
| `enable_safety_checks` | boolean | No | `true` | If set to true, the resulting image will be checked whether it includes any             potentially unsafe content. I... |
| `additional_lora_url` | string | No |  | The URL to the additional LORA model to use for the upscaling. Default is None |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `scale` | float | No | `2` | The scale of the output image. The higher the scale, the bigger the output image will be. |
| `negative_prompt` | string | No | `"blurry, low resolution, bad, ugly, low quality, pixelated, interpolated, compression artifacts, noisey, grainy"` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `skip_ccsr` | boolean | No | `false` | If set to true, the image will not be processed by the CCSR model before             being processed by the creativit... |
| `additional_lora_scale` | float | No | `1` | The scale of the additional LORA model to use for the upscaling. Default is 1.0 |
| `detail` | float | No | `1` | How much detail to add |
| `base_model_url` | string | No |  | The URL to the base model to use for the upscaling |
| `image_url` | string | **Yes** |  | The image to upscale. |
| `creativity` | float | No | `0.5` | How much the output can deviate from the original |
| `override_size_limits` | boolean | No | `false` | Allow for large uploads that could take a very long time. |
| `prompt_suffix` | string | No | `" high quality, highly detailed, high resolution, sharp"` | The suffix to add to the prompt. This is useful to add a common ending to all prompts such as 'high quality' etc or e... |
| `num_inference_steps` | integer | No | `20` | The number of inference steps to use for generating the image. The more steps             the better the image will b... |
| `model_type` | enum: `SD_1_5`, `SDXL` | No | `"SD_1_5"` | The type of model to use for the upscaling. Default is SD_1_5 |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The generated image file info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/creative-upscaler", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/creative-upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/creative-upscaler", {
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

- API page: https://fal.ai/models/fal-ai/creative-upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/creative-upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
