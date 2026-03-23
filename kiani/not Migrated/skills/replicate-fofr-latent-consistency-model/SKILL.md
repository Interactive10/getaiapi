---
name: replicate-fofr-latent-consistency-model
description: >
  Use this skill for the Replicate Latent Consistency Model model (fofr/latent-consistency-model). Use the Latent Consistency Model model via Replicate API.
---

# Latent Consistency Model

**Model:** `fofr/latent-consistency-model`
**Source:** https://replicate.com/fofr/latent-consistency-model
**Version:** `683d19dc312f7a9f0428b04429a9ccefd28dbf7785fef083ad5cf991b65f406f`

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

const output = await replicate.run("fofr/latent-consistency-model", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/latent-consistency-model",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/latent-consistency-model/predictions \
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
| `prompt` | string | No | `"Self-portrait oil painting, a beautiful cyborg with golden hair, 8k"` | For multiple prompts, enter each on a new line. |
| `width` | integer | No | `768` | Width of output image. Lower if out of memory |
| `height` | integer | No | `768` | Height of output image. Lower if out of memory |
| `sizing_strategy` | enum: `width/height`, `input_image`, `control_image` | No | `"width/height"` | Decide how to resize images – use width/height, resize based on input image or control image |
| `image` | string (URL) | No |  | Input image for img2img |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img. 1.0 corresponds to full destruction of information in image |
| `num_images` | integer | No | `1` | Number of images per prompt |
| `num_inference_steps` | integer | No | `8` | Number of denoising steps. Recommend 1 to 8 steps. |
| `guidance_scale` | float | No | `8` | Scale for classifier-free guidance |
| `lcm_origin_steps` | integer | No | `50` |  |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `control_image` | string (URL) | No |  | Image for controlnet conditioning |
| `controlnet_conditioning_scale` | float | No | `2` | Controlnet conditioning scale |
| `control_guidance_start` | float | No | `0` | Controlnet start |
| `control_guidance_end` | float | No | `1` | Controlnet end |
| `canny_low_threshold` | float | No | `100` | Canny low threshold |
| `canny_high_threshold` | float | No | `200` | Canny high threshold |
| `archive_outputs` | boolean | No | `false` | Option to archive the output images |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. This feature is only available through the API |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/latent-consistency-model",
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

- Model page: https://replicate.com/fofr/latent-consistency-model
- API page: https://replicate.com/fofr/latent-consistency-model/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
