---
name: fal-ai-fooocus-inpaint
description: >
  Use this skill for the fal.ai Fooocus Inpainting model (fal-ai/fooocus/inpaint). Default parameters with automated optimizations and quality improvements.
---

# Fooocus Inpainting

Default parameters with automated optimizations and quality improvements.

**Endpoint:** `fal-ai/fooocus/inpaint`
**Source:** https://fal.ai/models/fal-ai/fooocus/inpaint/api

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

const result = await fal.subscribe("fal-ai/fooocus/inpaint", {
  input: {
        "inpaint_image_url": "https://example.com/input.png"
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
| `prompt` | string | No | `""` | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `performance` | enum: `Speed`, `Quality`, `Extreme Speed`, `Lightning` | No | `"Extreme Speed"` | You can choose Speed or Quality |
| `styles` | list<enum (277 values)> | No | `['Fooocus V2', 'Fooocus Sharp', 'Fooocus Enhance']` | The style to use. |
| `image_prompt_3` | ImagePrompt | No |  |  |
| `loras` | list<LoraWeight> | No | `[{'path': 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_offset_example-lora_1.0.safetensors', 'scale': 0.1}]` | The LoRAs to use for the image generation. You can use up to 5 LoRAs             and they will be merged together to ... |
| `image_prompt_4` | ImagePrompt | No |  |  |
| `guidance_scale` | float | No | `4` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `sharpness` | float | No | `2` | The sharpness of the generated image. Use it to control how sharp the generated             image should be. Higher v... |
| `mixing_image_prompt_and_inpaint` | boolean | No | `false` | Mixing Image Prompt and Inpaint |
| `outpaint_selections` | list<enum: `Left`, `Right`, `Top`, `Bottom`> | No | `[]` | The directions to outpaint. |
| `inpaint_image_url` | string | **Yes** |  | The image to use as a reference for inpainting. |
| `refiner_model` | enum: `None`, `realisticVisionV60B1_v51VAE.safetensors` | No | `"None"` | Refiner (SDXL or SD 1.5) |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"jpeg"` | The format of the generated image. |
| `inpaint_respective_field` | float | No | `0.618` | The area to inpaint. Value 0 is same as "Only Masked" in A1111. Value 1 is             same as "Whole Image" in A1111... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `inpaint_mode` | enum: `Inpaint or Outpaint (default)`, `Improve Detail (face, hand, eyes, etc.)`, `Modify Content (add objects, change background, etc.)` | No | `"Inpaint or Outpaint (default)"` | The mode to use for inpainting. |
| `image_prompt_2` | ImagePrompt | No |  |  |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `refiner_switch` | float | No | `0.8` | Use 0.4 for SD1.5 realistic models; 0.667 for SD1.5 anime models             0.8 for XL-refiners; or any value for sw... |
| `inpaint_disable_initial_latent` | boolean | No | `false` | If set to true, the initial preprocessing will be disabled. |
| `mask_image_url` | string | null | No |  | The image to use as a mask for the generated image. |
| `invert_mask` | boolean | No | `false` | If set to true, the mask will be inverted. |
| `image_prompt_1` | ImagePrompt | No |  |  |
| `enable_safety_checker` | boolean | No | `true` | If set to false, the safety checker will be disabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `num_images` | integer | No | `1` | Number of images to generate in one request |
| `aspect_ratio` | string | No | `"1024x1024"` | The size of the generated image. You can choose between some presets or             custom height and width that **mu... |
| `inpaint_additional_prompt` | string | No | `""` | Describe what you want to inpaint. |
| `inpaint_strength` | float | No | `1` | Same as the denoising strength in A1111 inpaint. Only used in inpaint, not             used in outpaint. (Outpaint al... |
| `override_inpaint_options` | boolean | No | `false` | If set to true, the advanced inpaint options ('inpaint_disable_initial_latent',             'inpaint_engine', 'inpain... |
| `inpaint_engine` | enum: `None`, `v1`, `v2.5`, `v2.6` | No | `"v2.6"` | Version of Fooocus inpaint model |
| `inpaint_erode_or_dilate` | float | No | `0` | Positive value will make white area in the mask larger, negative value will             make white area smaller. (def... |

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
const { request_id } = await fal.queue.submit("fal-ai/fooocus/inpaint", {
  input: {
        "inpaint_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fooocus/inpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fooocus/inpaint", {
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

- API page: https://fal.ai/models/fal-ai/fooocus/inpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fooocus/inpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
