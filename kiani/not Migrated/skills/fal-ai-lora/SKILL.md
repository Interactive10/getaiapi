---
name: fal-ai-lora
description: >
  Use this skill for the fal.ai Stable Diffusion with LoRAs model (fal-ai/lora). Run Any Stable Diffusion model with customizable LoRA weights.
---

# Stable Diffusion with LoRAs

Run Any Stable Diffusion model with customizable LoRA weights.

**Endpoint:** `fal-ai/lora`
**Source:** https://fal.ai/models/fal-ai/lora/api

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

const result = await fal.subscribe("fal-ai/lora", {
  input: {
        "prompt": "your value here",
        "model_name": "your value here"
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
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. You can choose between some presets or custom height and width             that **mu... |
| `tile_height` | integer | No | `4096` | The size of the tiles to be used for the image generation. |
| `embeddings` | list<Embedding> | No | `[]` | The embeddings to use for the image generation. Only a single embedding is supported at the moment.             The e... |
| `ic_light_model_url` | string | No |  | The URL of the IC Light model to use for the image generation. |
| `image_encoder_weight_name` | string | No | `"pytorch_model.bin"` | The weight name of the image encoder model to use for the image generation. |
| `ip_adapter` | list<IPAdapter> | No | `[]` | The IP adapter to use for the image generation. |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. You can use any number of LoRAs             and they will be merged togeth... |
| `scheduler` | enum (11 values) | No |  | Scheduler / sampler to use for the image denoising process. |
| `sigmas` | SigmasInput | No | `{'method': 'default', 'array': []}` | Optionally override the sigmas to use for the denoising process. Only works with schedulers which support the `sigmas... |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `tile_stride_width` | integer | No | `2048` | The stride of the tiles to be used for the image generation. |
| `debug_per_pass_latents` | boolean | No | `false` | If set to true, the latents will be saved for debugging per pass. |
| `timesteps` | TimestepsInput | No | `{'method': 'default', 'array': []}` | Optionally override the timesteps to use for the denoising process. Only works with schedulers which support the `tim... |
| `image_encoder_subfolder` | string | No |  | The subfolder of the image encoder model to use for the image generation. |
| `prompt_weighting` | boolean | No | `false` | If set to true, the prompt weighting syntax will be used.             Additionally, this will lift the 77 token limit... |
| `variant` | string | No |  | The variant of the model to use for huggingface models, e.g. 'fp16'. |
| `model_name` | string | **Yes** |  | URL or HuggingFace ID of the base model to generate the image. |
| `controlnet_guess_mode` | boolean | No | `false` | If set to true, the controlnet will be applied to only the conditional predictions. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `ic_light_model_background_image_url` | string | No |  | The URL of the IC Light model background image to use for the image generation.             Make sure to use a backgr... |
| `rescale_betas_snr_zero` | boolean | No | `false` | Whether to set the rescale_betas_snr_zero option or not for the sampler |
| `tile_width` | integer | No | `4096` | The size of the tiles to be used for the image generation. |
| `prediction_type` | enum: `v_prediction`, `epsilon` | No | `"epsilon"` | The type of prediction to use for the image generation.             The `epsilon` is the default. |
| `eta` | float | No | `0` | The eta value to be used for the image generation. |
| `image_encoder_path` | string | No |  | The path to the image encoder model to use for the image generation. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `image_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `num_images` | integer | No | `1` | Number of images to generate in one request. Note that the higher the batch size,             the longer it will take... |
| `debug_latents` | boolean | No | `false` | If set to true, the latents will be saved for debugging. |
| `ic_light_image_url` | string | No |  | The URL of the IC Light model image to use for the image generation. |
| `unet_name` | string | No |  | URL or HuggingFace ID of the custom U-Net model to use for the image generation. |
| `clip_skip` | integer | No | `0` | Skips part of the image generation process, leading to slightly different results.             This means the image r... |
| `tile_stride_height` | integer | No | `2048` | The stride of the tiles to be used for the image generation. |
| `controlnets` | list<ControlNet> | No | `[]` | The control nets to use for the image generation. You can use any number of control nets             and they will be... |
| `num_inference_steps` | integer | No | `30` | Increasing the amount of steps tells Stable Diffusion that it should take more steps             to generate your fin... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated image files info. |
| `debug_latents` | File | The latents saved for debugging. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `debug_per_pass_latents` | File | The latents saved for debugging per pass. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/lora", {
  input: {
        "prompt": "your value here",
        "model_name": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/lora", {
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

- API page: https://fal.ai/models/fal-ai/lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
