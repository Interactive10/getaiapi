---
name: replicate-stability-ai-sdxl
description: >
  Use this skill for the Replicate Sdxl model (stability-ai/sdxl). Use the Sdxl model via Replicate API.
---

# Sdxl

**Model:** `stability-ai/sdxl`
**Source:** https://replicate.com/stability-ai/sdxl
**Version:** `7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc`

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

const output = await replicate.run("stability-ai/sdxl", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("stability-ai/sdxl",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/stability-ai/sdxl/predictions \
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
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `mask` | string (URL) | No |  | Input mask for inpaint mode. Black areas will be preserved, white areas will be inpainted. |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img / inpaint. 1.0 corresponds to full destruction of information in image |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `refine` | enum: `no_refiner`, `expert_ensemble_refiner`, `base_image_refiner` | No | `"no_refiner"` | Which refine style to use |
| `high_noise_frac` | float | No | `0.8` | For expert_ensemble_refiner, the fraction of noise to use |
| `refine_steps` | integer | No |  | For base_image_refiner, the number of steps to refine, defaults to num_inference_steps |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `lora_scale` | float | No | `0.6` | LoRA additive scale. Only applicable on trained models. |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. This feature is only available through the API. See [https://replicate.c... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "stability-ai/sdxl",
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

- Model page: https://replicate.com/stability-ai/sdxl
- API page: https://replicate.com/stability-ai/sdxl/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
