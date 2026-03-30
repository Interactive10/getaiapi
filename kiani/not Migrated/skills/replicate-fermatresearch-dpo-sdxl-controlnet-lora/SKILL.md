---
name: replicate-fermatresearch-dpo-sdxl-controlnet-lora
description: >
  Use this skill for the Replicate Dpo Sdxl Controlnet Lora model (fermatresearch/dpo-sdxl-controlnet-lora). Use the Dpo Sdxl Controlnet Lora model via Replicate API.
---

# Dpo Sdxl Controlnet Lora

**Model:** `fermatresearch/dpo-sdxl-controlnet-lora`
**Source:** https://replicate.com/fermatresearch/dpo-sdxl-controlnet-lora
**Version:** `5779933f36e3ecc23c51c18de01caff6aa54ea9e147ef3edf0b2924191595216`

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

const output = await replicate.run("fermatresearch/dpo-sdxl-controlnet-lora", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fermatresearch/dpo-sdxl-controlnet-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fermatresearch/dpo-sdxl-controlnet-lora/predictions \
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
| `condition_scale` | float | No | `0.5` | The bigger this number is, the more ControlNet interferes |
| `num_outputs` | integer | No | `1` | Number of images to output |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `refine` | enum: `no_refiner`, `base_image_refiner` | No | `"base_image_refiner"` | Whether to use refinement steps or not |
| `refine_steps` | integer | No | `10` | For base_image_refiner, the number of steps to refine |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `lora_scale` | float | No | `0.6` | LoRA additive scale. Only applicable on trained models. |
| `lora_weights` | string | No |  | Replicate LoRA weights to use. Leave blank to use the default weights. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fermatresearch/dpo-sdxl-controlnet-lora",
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

- Model page: https://replicate.com/fermatresearch/dpo-sdxl-controlnet-lora
- API page: https://replicate.com/fermatresearch/dpo-sdxl-controlnet-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
