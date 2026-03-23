---
name: replicate-black-forest-labs-flux-dev-lora
description: >
  Use this skill for the Replicate Flux Dev Lora model (black-forest-labs/flux-dev-lora). Use the Flux Dev Lora model via Replicate API.
---

# Flux Dev Lora

**Model:** `black-forest-labs/flux-dev-lora`
**Source:** https://replicate.com/black-forest-labs/flux-dev-lora
**Version:** `ae0d7d645446924cf1871e3ca8796e8318f72465d2b5af9323a835df93bf0917`

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

const output = await replicate.run("black-forest-labs/flux-dev-lora", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-dev-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-dev-lora/predictions \
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
| `prompt` | string | **Yes** |  | Prompt for generated image |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio for the generated image |
| `image` | string (URL) | No |  | Input image for image to image mode. The aspect ratio of your output will match this image |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img. 1.0 corresponds to full destruction of information in image |
| `num_outputs` | integer | No | `1` | Number of outputs to generate |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. Recommended range is 28-50, and lower number of steps produce lower quality outputs, faster. |
| `guidance` | float | No | `3` | Guidance for generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |
| `go_fast` | boolean | No | `true` | Run faster predictions with model optimized for speed (currently fp8 quantized); disable to run in original bf16. Not... |
| `lora_weights` | string | No |  | Load LoRA weights. Supports Replicate models in the format <owner>/<username> or <owner>/<username>/<version>, Huggin... |
| `lora_scale` | float | No | `1` | Determines how strongly the main LoRA should be applied. Sane results between 0 and 1 for base inference. For go_fast... |
| `extra_lora` | string | No |  | Load LoRA weights. Supports Replicate models in the format <owner>/<username> or <owner>/<username>/<version>, Huggin... |
| `extra_lora_scale` | float | No | `1` | Determines how strongly the extra LoRA should be applied. Sane results between 0 and 1 for base inference. For go_fas... |
| `megapixels` | enum: `1`, `0.25` | No | `"1"` | Approximate number of megapixels for generated image |
| `hf_api_token` | string | No |  | HuggingFace API token. If you're using a hf lora that needs authentication, you'll need to provide an API token. |
| `civitai_api_token` | string | No |  | Civitai API token. If you're using a civitai lora that needs authentication, you'll need to provide an API token. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-dev-lora",
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

- Model page: https://replicate.com/black-forest-labs/flux-dev-lora
- API page: https://replicate.com/black-forest-labs/flux-dev-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
