---
name: replicate-black-forest-labs-flux-kontext-dev-lora
description: >
  Use this skill for the Replicate Flux Kontext Dev Lora model (black-forest-labs/flux-kontext-dev-lora). Use the Flux Kontext Dev Lora model via Replicate API.
---

# Flux Kontext Dev Lora

**Model:** `black-forest-labs/flux-kontext-dev-lora`
**Source:** https://replicate.com/black-forest-labs/flux-kontext-dev-lora
**Version:** `50c10b8f14af90fda0a4bf3bbfdda263ddb0f2b3e32e4735dcc6ee7156d7ed6f`

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

const output = await replicate.run("black-forest-labs/flux-kontext-dev-lora", {
  input: {
        "prompt": "your prompt here",
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-kontext-dev-lora",
    input={
        "prompt": "your prompt here",
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-dev-lora/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "input_image": "https://example.com/input.png"}}'
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
| `prompt` | string | **Yes** |  | Text description of what you want to generate, or the instruction on how to edit the given image. |
| `input_image` | string (URL) | **Yes** |  | Image to use as reference. Must be jpeg, png, gif, or webp. |
| `lora_weights` | string | No |  | Path to the lora weights |
| `lora_strength` | float | No | `1` | Strength of the lora |
| `aspect_ratio` | enum (12 values) | No | `"1:1"` | Aspect ratio of the generated image. Use 'match_input_image' to match the aspect ratio of the input image. |
| `megapixels` | enum: `1`, `0.25` | No | `"1"` | Approximate number of megapixels for generated image |
| `num_inference_steps` | integer | No | `30` | Number of inference steps |
| `guidance` | float | No | `2.5` | Guidance scale for generation |
| `seed` | integer | No |  | Random seed for reproducible generation. Leave blank for random. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Output image format |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable NSFW safety checker |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-kontext-dev-lora",
  input: {
        "prompt": "your prompt here",
        "input_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/black-forest-labs/flux-kontext-dev-lora
- API page: https://replicate.com/black-forest-labs/flux-kontext-dev-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
