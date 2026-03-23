---
name: replicate-usamaehsan-controlnet-x-ip-adapter-realistic-vision-v5
description: >
  Use this skill for the Replicate Controlnet X Ip Adapter Realistic Vision V5 model (usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5). Use the Controlnet X Ip Adapter Realistic Vision V5 model via Replicate API.
---

# Controlnet X Ip Adapter Realistic Vision V5

**Model:** `usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5`
**Source:** https://replicate.com/usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5
**Version:** `50ac06bb9bcf30e7b5dc66d3fe6e67262059a11ade572a35afa0ef686f55db82`

---

## Quick Start

### 1. Install the Client

```bash
npm install replicate
```

### 2. Set Your API Token

```bash
export REPLICATE_API_TOKEN="YOUR_API_TOKEN"
```

### 3. Run the Model

```javascript
import Replicate from "replicate";

const replicate = new Replicate();

const output = await replicate.run("usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here"}}'
```

---

## Authentication

Set the `REPLICATE_API_TOKEN` environment variable, or pass directly:

```javascript
const replicate = new Replicate({ auth: "YOUR_API_TOKEN" });
```

```python
import replicate
client = replicate.Client(api_token="YOUR_API_TOKEN")
```

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | string | **Yes** |  | Prompt - using compel, use +++ to increase words weight:: doc: https://github.com/damian0815/compel/tree/main/doc \|\... |
| `negative_prompt` | string | No | `"Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"` | Negative prompt - using compel, use +++ to increase words weight//// negative-embeddings available ///// FastNegative... |
| `num_inference_steps` | integer | No | `20` | Steps to run denoising |
| `guidance_scale` | float | No | `7` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Seed |
| `eta` | float | No | `0` | Controls the amount of noise that is added to the input data during the denoising diffusion process. Higher value -> ... |
| `guess_mode` | boolean | No | `false` | In this mode, the ControlNet encoder will try best to recognize the content of the input image even if you remove all... |
| `disable_safety_check` | boolean | No | `false` | Disable safety check. Use at your own risk! |
| `num_outputs` | integer | No | `1` | Number of images to generate |
| `max_width` | integer | No | `512` | Max width/Resolution of image |
| `max_height` | integer | No | `512` | Max height/Resolution of image |
| `scheduler` | enum (12 values) | No | `"DDIM"` | Choose a scheduler. |
| `lineart_image` | string (URL) | No |  | Control image for canny controlnet |
| `lineart_conditioning_scale` | float | No | `1` | Conditioning scale for canny controlnet |
| `scribble_image` | string (URL) | No |  | Control image for scribble controlnet |
| `scribble_conditioning_scale` | float | No | `1` | Conditioning scale for scribble controlnet |
| `tile_image` | string (URL) | No |  | Control image for tile controlnet |
| `tile_conditioning_scale` | float | No | `1` | Conditioning scale for tile controlnet |
| `brightness_image` | string (URL) | No |  | Control image for brightness controlnet |
| `brightness_conditioning_scale` | float | No | `1` | Conditioning scale for brightness controlnet |
| `inpainting_image` | string (URL) | No |  | Control image for inpainting controlnet |
| `mask_image` | string (URL) | No |  | mask image for inpainting controlnet |
| `positive_auto_mask_text` | string | No |  | // seperated list of objects for mask, AI will auto create mask of these objects, if mask text is given, mask image w... |
| `negative_auto_mask_text` | string | No |  | // seperated list of objects you dont want to mask - 'hairs // eyes // cloth' |
| `inpainting_conditioning_scale` | float | No | `1` | Conditioning scale for inpaint controlnet |
| `inpainting_strength` | float | No | `1` | inpainting strength |
| `sorted_controlnets` | string | No | `"lineart, tile, inpainting"` | Comma seperated string of controlnet names, list of names: tile, inpainting, lineart,depth ,scribble , brightness ///... |
| `ip_adapter_ckpt` | enum: `ip-adapter_sd15.bin`, `ip-adapter-plus_sd15.bin`, `ip-adapter-plus-face_sd15.bin` | No | `"ip-adapter_sd15.bin"` | IP Adapter checkpoint |
| `ip_adapter_image` | string (URL) | No |  | IP Adapter image |
| `ip_adapter_weight` | float | No | `1` | IP Adapter weight |
| `img2img_image` | string (URL) | No |  | Image2image image |
| `img2img_strength` | float | No | `0.5` | img2img strength, does not work when inpainting image is given, 0.1-same image, 0.99-complete destruction of image |
| `add_more_detail_lora_scale` | float | No | `0.5` | Scale/ weight of more_details lora, more scale = more details, disabled on 0 |
| `detail_tweaker_lora_weight` | float | No | `0` | disabled on 0 |
| `film_grain_lora_weight` | float | No | `0` | disabled on 0 |
| `epi_noise_offset_lora_weight` | float | No | `0` | disabled on 0 |
| `color_temprature_slider_lora_weight` | float | No | `0` | disabled on 0 |
| `int_kwargs` | string | No | `""` |  |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5",
  input: {
        "prompt": "your prompt here"
    },
  webhook: "https://optional.webhook.url/for/results",
  webhook_events_filter: ["completed"],
});
console.log(prediction.id);
```

### Get Prediction Status

```javascript
const prediction = await replicate.predictions.get("<prediction_id>");
console.log(prediction.status); // starting, processing, succeeded, failed, canceled
console.log(prediction.output);
```

### Cancel Prediction

```javascript
await replicate.predictions.cancel("<prediction_id>");
```

---

## Tips

- `replicate.run()` is the simplest way — it polls until the prediction completes.
- Use `replicate.predictions.create()` + webhooks for production workloads.
- File inputs accept URLs or base64-encoded data URIs.
- Use `replicate.stream()` for models that support streaming output.

## References

- Model page: https://replicate.com/usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5
- API page: https://replicate.com/usamaehsan/controlnet-x-ip-adapter-realistic-vision-v5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
