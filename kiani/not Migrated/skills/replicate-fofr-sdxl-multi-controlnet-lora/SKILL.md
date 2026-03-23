---
name: replicate-fofr-sdxl-multi-controlnet-lora
description: >
  Use this skill for the Replicate Sdxl Multi Controlnet Lora model (fofr/sdxl-multi-controlnet-lora). Use the Sdxl Multi Controlnet Lora model via Replicate API.
---

# Sdxl Multi Controlnet Lora

**Model:** `fofr/sdxl-multi-controlnet-lora`
**Source:** https://replicate.com/fofr/sdxl-multi-controlnet-lora
**Version:** `89eb212b3d1366a83e949c12a4b45dfe6b6b313b594cb8268e864931ac9ffb16`

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

const output = await replicate.run("fofr/sdxl-multi-controlnet-lora", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/sdxl-multi-controlnet-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/sdxl-multi-controlnet-lora/predictions \
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
| `prompt` | string | No | `"An astronaut riding a rainbow unicorn"` | Input prompt |
| `negative_prompt` | string | No | `""` | Negative Prompt |
| `image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `mask` | string (URL) | No |  | Input mask for inpaint mode. Black areas will be preserved, white areas will be inpainted. |
| `width` | integer | No | `768` | Width of output image |
| `height` | integer | No | `768` | Height of output image |
| `sizing_strategy` | enum: `width_height`, `input_image`, `controlnet_1_image`, `controlnet_2_image`, `controlnet_3_image`, `mask_image` | No | `"width_height"` | Decide how to resize images – use width/height, resize based on input image or control image |
| `num_outputs` | integer | No | `1` | Number of images to output |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img / inpaint. 1.0 corresponds to full destruction of information in image |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `refine` | enum: `no_refiner`, `base_image_refiner` | No | `"no_refiner"` | Which refine style to use |
| `refine_steps` | integer | No |  | For base_image_refiner, the number of steps to refine, defaults to num_inference_steps |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `lora_scale` | float | No | `0.6` | LoRA additive scale. Only applicable on trained models. |
| `lora_weights` | string | No |  | Replicate LoRA weights to use. Leave blank to use the default weights. |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. This feature is only available through the API. See [https://replicate.c... |
| `controlnet_1` | enum (10 values) | No | `"none"` | Controlnet |
| `controlnet_1_image` | string (URL) | No |  | Input image for first controlnet |
| `controlnet_1_conditioning_scale` | float | No | `0.75` | How strong the controlnet conditioning is |
| `controlnet_1_start` | float | No | `0` | When controlnet conditioning starts |
| `controlnet_1_end` | float | No | `1` | When controlnet conditioning ends |
| `controlnet_2` | enum (10 values) | No | `"none"` | Controlnet |
| `controlnet_2_image` | string (URL) | No |  | Input image for second controlnet |
| `controlnet_2_conditioning_scale` | float | No | `0.75` | How strong the controlnet conditioning is |
| `controlnet_2_start` | float | No | `0` | When controlnet conditioning starts |
| `controlnet_2_end` | float | No | `1` | When controlnet conditioning ends |
| `controlnet_3` | enum (10 values) | No | `"none"` | Controlnet |
| `controlnet_3_image` | string (URL) | No |  | Input image for third controlnet |
| `controlnet_3_conditioning_scale` | float | No | `0.75` | How strong the controlnet conditioning is |
| `controlnet_3_start` | float | No | `0` | When controlnet conditioning starts |
| `controlnet_3_end` | float | No | `1` | When controlnet conditioning ends |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/sdxl-multi-controlnet-lora",
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

- Model page: https://replicate.com/fofr/sdxl-multi-controlnet-lora
- API page: https://replicate.com/fofr/sdxl-multi-controlnet-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
