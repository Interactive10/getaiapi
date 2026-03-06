---
name: replicate-appmeloncreator-platmoji-beta
description: >
  Use this skill for the Replicate Platmoji Beta model (appmeloncreator/platmoji-beta). Use the Platmoji Beta model via Replicate API.
---

# Platmoji Beta

**Model:** `appmeloncreator/platmoji-beta`
**Source:** https://replicate.com/appmeloncreator/platmoji-beta
**Version:** `f5faa5eed754c2a06970417b4224f6ba1374c61723033a09dd2a829725cdf557`

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

const output = await replicate.run("appmeloncreator/platmoji-beta", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("appmeloncreator/platmoji-beta",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/appmeloncreator/platmoji-beta/predictions \
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
| `prompt` | string | **Yes** |  | Prompt for generated image. If you include the `trigger_word` used in the training process you are more likely to act... |
| `image` | string (URL) | No |  | Input image for image to image or inpainting mode. If provided, aspect_ratio, width, and height inputs are ignored. |
| `mask` | string (URL) | No |  | Image mask for image inpainting mode. If provided, aspect_ratio, width, and height inputs are ignored. |
| `aspect_ratio` | enum (12 values) | No | `"1:1"` | Aspect ratio for the generated image. If custom is selected, uses height and width below & will run in bf16 mode |
| `height` | integer | No |  | Height of generated image. Only works if `aspect_ratio` is set to custom. Will be rounded to nearest multiple of 16. ... |
| `width` | integer | No |  | Width of generated image. Only works if `aspect_ratio` is set to custom. Will be rounded to nearest multiple of 16. I... |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img. 1.0 corresponds to full destruction of information in image |
| `model` | enum: `dev`, `schnell` | No | `"dev"` | Which model to run inference with. The dev model performs best with around 28 inference steps but the schnell model o... |
| `num_outputs` | integer | No | `1` | Number of outputs to generate |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. More steps can give more detailed images, but take longer. |
| `guidance_scale` | float | No | `3` | Guidance scale for the diffusion process. Lower values can give more realistic images. Good values to try are 2, 2.5,... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |
| `go_fast` | boolean | No | `false` | Run faster predictions with model optimized for speed (currently fp8 quantized); disable to run in original bf16 |
| `megapixels` | enum: `1`, `0.25` | No | `"1"` | Approximate number of megapixels for generated image |
| `lora_scale` | float | No | `1` | Determines how strongly the main LoRA should be applied. Sane results between 0 and 1 for base inference. For go_fast... |
| `extra_lora` | string | No |  | Load LoRA weights. Supports Replicate models in the format <owner>/<username> or <owner>/<username>/<version>, Huggin... |
| `extra_lora_scale` | float | No | `1` | Determines how strongly the extra LoRA should be applied. Sane results between 0 and 1 for base inference. For go_fas... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "appmeloncreator/platmoji-beta",
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

- Model page: https://replicate.com/appmeloncreator/platmoji-beta
- API page: https://replicate.com/appmeloncreator/platmoji-beta/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
