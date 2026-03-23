---
name: fal-ai-lcm
description: >
  Use this skill for the fal.ai Latent Consistency (SDXL & SDv1.5) model (fal-ai/lcm). Produce high-quality images with minimal inference steps.
---

# Latent Consistency (SDXL & SDv1.5)

Produce high-quality images with minimal inference steps.

**Endpoint:** `fal-ai/lcm`
**Source:** https://fal.ai/models/fal-ai/lcm/api

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

const result = await fal.subscribe("fal-ai/lcm", {
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
| `controlnet_inpaint` | boolean | No | `false` | If set to true, the inpainting pipeline will use controlnet inpainting.             Only effective for inpainting pip... |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. You can choose between some presets or             custom height and width that **mu... |
| `enable_safety_checks` | boolean | No | `true` | If set to true, the resulting image will be checked whether it includes any             potentially unsafe content. I... |
| `model` | enum: `sdxl`, `sdv1-5` | No | `"sdv1-5"` | The model to use for generating the image. |
| `lora_url` | string | No |  | The url of the lora server to use for image generation. |
| `guidance_scale` | float | No | `1` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `negative_prompt` | string | No | `""` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `inpaint_mask_only` | boolean | No | `false` | If set to true, the inpainting pipeline will only inpaint the provided mask             area. Only effective for inpa... |
| `num_images` | integer | No | `1` | The number of images to generate. The function will return a list of images             with the same prompt and nega... |
| `lora_scale` | float | No | `1` | The scale of the lora server to use for image generation. |
| `image_url` | string | No |  | The base image to use for guiding the image generation on image-to-image         generations. If the either width or ... |
| `strength` | float | No | `0.8` | The strength of the image that is passed as `image_url`. The strength         determines how much the generated image... |
| `sync_mode` | boolean | No | `false` | If set to true, the function will wait for the image to be generated and uploaded             before returning the re... |
| `request_id` | string | No | `""` | An id bound to a request, can be used with response to identify the request             itself. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `mask_url` | string | No |  | The mask to use for guiding the image generation on image         inpainting. The model will focus on the mask area a... |
| `num_inference_steps` | integer | No | `4` | The number of inference steps to use for generating the image. The more steps             the better the image will b... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated image files info. |
| `request_id` | string | An id bound to a request, can be used with response to identify the request             itself. |
| `timings` | Timings |  |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `num_inference_steps` | integer | Number of inference steps used to generate the image. It will be the same value of the one passed in the             ... |
| `nsfw_content_detected` | list<boolean> | A list of booleans indicating whether the generated image contains any             potentially unsafe content. If the... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/lcm", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/lcm", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/lcm", {
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

- API page: https://fal.ai/models/fal-ai/lcm/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/lcm
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
