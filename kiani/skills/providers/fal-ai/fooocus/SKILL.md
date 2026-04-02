---
name: fal-ai-fooocus
description: >
  Use this skill for the fal.ai Fooocus model (fal-ai/fooocus). Default parameters with automated optimizations and quality improvements.
---

# Fooocus

Default parameters with automated optimizations and quality improvements.

**Endpoint:** `fal-ai/fooocus`
**Source:** https://fal.ai/models/fal-ai/fooocus/api

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

const result = await fal.subscribe("fal-ai/fooocus", {
  input: {
        "prompt": "your prompt here"
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
| `styles` | list<enum (277 values)> | No | `['Fooocus V2', 'Fooocus Sharp', 'Fooocus Enhance']` | The style to use. |
| `performance` | enum: `Speed`, `Quality`, `Extreme Speed`, `Lightning` | No | `"Extreme Speed"` | You can choose Speed or Quality |
| `prompt` | string | No | `""` | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `control_type` | enum: `ImagePrompt`, `PyraCanny`, `CPDS`, `FaceSwap` | No | `"PyraCanny"` | The type of image control |
| `mask_image_url` | string | null | No |  | The image to use as a mask for the generated image. |
| `loras` | list<LoraWeight> | No | `[{'path': 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_offset_example-lora_1.0.safetensors', 'scale': 0.1}]` | The LoRAs to use for the image generation. You can use up to 5 LoRAs             and they will be merged together to ... |
| `mixing_image_prompt_and_inpaint` | boolean | No | `false` |  |
| `sharpness` | float | No | `2` | The sharpness of the generated image. Use it to control how sharp the generated             image should be. Higher v... |
| `guidance_scale` | float | No | `4` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `inpaint_image_url` | string | null | No |  | The image to use as a reference for inpainting. |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `aspect_ratio` | string | No | `"1024x1024"` | The size of the generated image. You can choose between some presets or             custom height and width that **mu... |
| `num_images` | integer | No | `1` | Number of images to generate in one request |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"jpeg"` | The format of the generated image. |
| `refiner_model` | enum: `None`, `realisticVisionV60B1_v51VAE.safetensors` | No | `"None"` | Refiner (SDXL or SD 1.5) |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `control_image_stop_at` | float | No | `1` | The stop at value of the control image. Use it to control how much the generated image             should look like t... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `refiner_switch` | float | No | `0.8` | Use 0.4 for SD1.5 realistic models; 0.667 for SD1.5 anime models             0.8 for XL-refiners; or any value for sw... |
| `control_image_weight` | float | No | `1` | The strength of the control image. Use it to control how much the generated image             should look like the co... |
| `control_image_url` | string | null | No |  | The image to use as a reference for the generated image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated image file info. |
| `timings` | Timings | The time taken for the generation process. |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/fooocus", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fooocus", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fooocus", {
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

- API page: https://fal.ai/models/fal-ai/fooocus/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fooocus
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
