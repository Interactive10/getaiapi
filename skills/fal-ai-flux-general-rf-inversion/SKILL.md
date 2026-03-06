---
name: fal-ai-flux-general-rf-inversion
description: >
  Use this skill for the fal.ai FLUX.1 [dev] with Controlnets and Loras model (fal-ai/flux-general/rf-inversion). A general purpose endpoint for the FLUX.1 [dev] model, implementing the RF-Inversion pipeline. This can be used to edit a reference image based on a prompt.
---

# FLUX.1 [dev] with Controlnets and Loras

A general purpose endpoint for the FLUX.1 [dev] model, implementing the RF-Inversion pipeline. This can be used to edit a reference image based on a prompt.

**Endpoint:** `fal-ai/flux-general/rf-inversion`
**Source:** https://fal.ai/models/fal-ai/flux-general/rf-inversion/api

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

const result = await fal.subscribe("fal-ai/flux-general/rf-inversion", {
  input: {
        "prompt": "your value here",
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
| `nag_end` | float | No | `0.25` | The proportion of steps to apply NAG. After the specified proportion             of steps has been iterated, the rema... |
| `prompt` | string | **Yes** |  | The prompt to edit the image with |
| `control_loras` | list<ControlLoraWeight> | No | `[]` | The LoRAs to use for the image generation which use a control image. You can use any number of LoRAs             and ... |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. |
| `controller_guidance_reverse` | float | No | `0.75` | The controller guidance (eta) used in the denoising process.Using values closer to 1 will result in an image closer t... |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. You can use any number of LoRAs             and they will be merged togeth... |
| `reverse_guidance_start` | integer | No | `0` | Timestep to start guidance during reverse process. |
| `easycontrols` | list<EasyControlWeight> | No | `[]` | EasyControl Inputs to use for image generation. |
| `guidance_scale` | float | No | `3.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `scheduler` | enum: `euler`, `dpmpp_2m` | No | `"euler"` | Scheduler for the denoising process. |
| `use_cfg_zero` | boolean | No | `false` | Uses CFG-zero init sampling as in https://arxiv.org/abs/2503.18886. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `fill_image` | ImageFillInput | null | No |  | Use an image input to influence the generation. Can be used to fill images in masked areas. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `sigma_schedule` | string | null | No |  | Sigmas schedule for the denoising process. |
| `reference_end` | float | No | `1` | The percentage of the total timesteps when the reference guidance is to be ended. |
| `controller_guidance_forward` | float | No | `0.6` | The controller guidance (gamma) used in the creation of structured noise. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `image_url` | string | **Yes** |  | URL of image to be edited |
| `reference_strength` | float | No | `0.65` | Strength of reference_only generation. Only used if a reference image is provided. |
| `nag_scale` | float | No | `3` | The scale for NAG. Higher values will result in a image that is more distant             to the negative prompt. |
| `reverse_guidance_schedule` | enum: `constant`, `linear_increase`, `linear_decrease` | No | `"constant"` | Scheduler for applying reverse guidance. |
| `reference_image_url` | string | No |  | URL of Image for Reference-Only |
| `reverse_guidance_end` | integer | No | `8` | Timestep to stop guidance during reverse process. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `controlnet_unions` | list<ControlNetUnion> | No | `[]` | The controlnet unions to use for the image generation. Only one controlnet is supported at the moment. |
| `negative_prompt` | string | No | `""` | Negative prompt to steer the image generation away from unwanted features.             By default, we will be using N... |
| `nag_tau` | float | No | `2.5` | The tau for NAG. Controls the normalization of the hidden state.             Higher values will result in a less aggr... |
| `num_images` | integer | No | `1` | The number of images to generate. This is always set to 1 for streaming output. |
| `use_beta_schedule` | boolean | No | `false` | Specifies whether beta sigmas ought to be used. |
| `nag_alpha` | float | No | `0.25` | The alpha value for NAG. This value is used as a final weighting             factor for steering the normalized guida... |
| `base_shift` | float | No | `0.5` | Base shift for the scheduled timesteps |
| `max_shift` | float | No | `1.15` | Max shift for the scheduled timesteps |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `controlnets` | list<ControlNet> | No | `[]` | The controlnets to use for the image generation. Only one controlnet is supported at the moment. |
| `reference_start` | float | No | `0` | The percentage of the total timesteps when the reference guidance is to bestarted. |

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
const { request_id } = await fal.queue.submit("fal-ai/flux-general/rf-inversion", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-general/rf-inversion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-general/rf-inversion", {
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

- API page: https://fal.ai/models/fal-ai/flux-general/rf-inversion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-general/rf-inversion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
