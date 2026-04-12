---
name: fal-ai-fooocus-upscale-or-vary
description: >
  Use this skill for the fal.ai Fooocus Upscale or Vary model (fal-ai/fooocus/upscale-or-vary). Default parameters with automated optimizations and quality improvements.
---

# Fooocus Upscale or Vary

Default parameters with automated optimizations and quality improvements.

**Endpoint:** `fal-ai/fooocus/upscale-or-vary`
**Source:** https://fal.ai/models/fal-ai/fooocus/upscale-or-vary/api

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

const result = await fal.subscribe("fal-ai/fooocus/upscale-or-vary", {
  input: {
        "uov_image_url": "https://example.com/input.png"
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
| `uov_image_url` | string | **Yes** |  | The image to upscale or vary. |
| `prompt` | string | No | `""` | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `image_prompt_3` | ImagePrompt | No |  |  |
| `mixing_image_prompt_and_vary_upscale` | boolean | No | `false` | Mixing Image Prompt and Vary/Upscale |
| `performance` | enum: `Speed`, `Quality`, `Extreme Speed`, `Lightning` | No | `"Extreme Speed"` | You can choose Speed or Quality |
| `loras` | list<LoraWeight> | No | `[{'path': 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_offset_example-lora_1.0.safetensors', 'scale': 0.1}]` | The LoRAs to use for the image generation. You can use up to 5 LoRAs             and they will be merged together to ... |
| `image_prompt_4` | ImagePrompt | No |  |  |
| `image_prompt_1` | ImagePrompt | No |  |  |
| `guidance_scale` | float | No | `4` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `sharpness` | float | No | `2` | The sharpness of the generated image. Use it to control how sharp the generated             image should be. Higher v... |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `aspect_ratio` | string | No | `"1024x1024"` | The size of the generated image. You can choose between some presets or             custom height and width that **mu... |
| `num_images` | integer | No | `1` | Number of images to generate in one request |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"jpeg"` | The format of the generated image. |
| `refiner_model` | enum: `None`, `realisticVisionV60B1_v51VAE.safetensors` | No | `"None"` | Refiner (SDXL or SD 1.5) |
| `image_prompt_2` | ImagePrompt | No |  |  |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `uov_method` | enum: `Disabled`, `Vary (Subtle)`, `Vary (Strong)`, `Upscale (1.5x)`, `Upscale (2x)`, `Upscale (Fast 2x)` | No | `"Vary (Strong)"` | The method to use for upscaling or varying. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `refiner_switch` | float | No | `0.8` | Use 0.4 for SD1.5 realistic models; 0.667 for SD1.5 anime models             0.8 for XL-refiners; or any value for sw... |

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
const { request_id } = await fal.queue.submit("fal-ai/fooocus/upscale-or-vary", {
  input: {
        "uov_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fooocus/upscale-or-vary", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fooocus/upscale-or-vary", {
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

- API page: https://fal.ai/models/fal-ai/fooocus/upscale-or-vary/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fooocus/upscale-or-vary
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
