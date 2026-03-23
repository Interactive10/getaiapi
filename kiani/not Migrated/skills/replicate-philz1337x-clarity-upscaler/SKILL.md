---
name: replicate-philz1337x-clarity-upscaler
description: >
  Use this skill for the Replicate Clarity Upscaler model (philz1337x/clarity-upscaler). Use the Clarity Upscaler model via Replicate API.
---

# Clarity Upscaler

**Model:** `philz1337x/clarity-upscaler`
**Source:** https://replicate.com/philz1337x/clarity-upscaler
**Version:** `dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e`

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

const output = await replicate.run("philz1337x/clarity-upscaler", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("philz1337x/clarity-upscaler",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/philz1337x/clarity-upscaler/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | input image |
| `prompt` | string | No | `"masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>"` | Prompt |
| `negative_prompt` | string | No | `"(worst quality, low quality, normal quality:2) JuggernautNegative-neg"` | Negative Prompt |
| `scale_factor` | float | No | `2` | Scale factor |
| `dynamic` | float | No | `6` | HDR, try from 3 - 9 |
| `creativity` | float | No | `0.35` | Creativity, try from 0.3 - 0.9 |
| `resemblance` | float | No | `0.6` | Resemblance, try from 0.3 - 1.6 |
| `tiling_width` | enum (16 values) | No | `112` | Fractality, set lower tile width for a high Fractality |
| `tiling_height` | enum (16 values) | No | `144` | Fractality, set lower tile height for a high Fractality |
| `sd_model` | enum: `epicrealism_naturalSinRC1VAE.safetensors [84d76a0328]`, `juggernaut_reborn.safetensors [338b85bc4f]`, `flat2DAnimerge_v45Sharp.safetensors` | No | `"juggernaut_reborn.safetensors [338b85bc4f]"` | Stable Diffusion model checkpoint |
| `scheduler` | enum (30 values) | No | `"DPM++ 3M SDE Karras"` | scheduler |
| `num_inference_steps` | integer | No | `18` | Number of denoising steps |
| `seed` | integer | No | `1337` | Random seed. Leave blank to randomize the seed |
| `downscaling` | boolean | No | `false` | Downscale the image before upscaling. Can improve quality and speed for images with high resolution but lower quality |
| `downscaling_resolution` | integer | No | `768` | Downscaling resolution |
| `lora_links` | string | No | `""` | Link to a lora file you want to use in your upscaling. Multiple links possible, seperated by comma |
| `custom_sd_model` | string | No | `""` |  |
| `sharpen` | float | No | `0` | Sharpen the image after upscaling. The higher the value, the more sharpening is applied. 0 for no sharpening |
| `mask` | string (URL) | No |  | Mask image to mark areas that should be preserved during upscaling |
| `handfix` | enum: `disabled`, `hands_only`, `image_and_hands` | No | `"disabled"` | Use clarity to fix hands in the image |
| `pattern` | boolean | No | `false` | Upscale a pattern with seamless tiling |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"png"` | Format of the output images |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "philz1337x/clarity-upscaler",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/philz1337x/clarity-upscaler
- API page: https://replicate.com/philz1337x/clarity-upscaler/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
