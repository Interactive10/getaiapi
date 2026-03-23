---
name: replicate-black-forest-labs-flux-fill-dev
description: >
  Use this skill for the Replicate Flux Fill Dev model (black-forest-labs/flux-fill-dev). Use the Flux Fill Dev model via Replicate API.
---

# Flux Fill Dev

**Model:** `black-forest-labs/flux-fill-dev`
**Source:** https://replicate.com/black-forest-labs/flux-fill-dev
**Version:** `a053f84125613d83e65328a289e14eb6639e10725c243e8fb0c24128e5573f4c`

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

const output = await replicate.run("black-forest-labs/flux-fill-dev", {
  input: {
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-fill-dev",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-fill-dev/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `image` | string (URL) | **Yes** |  | The image to inpaint. Can contain alpha mask. If the image width or height are not multiples of 32, they will be scal... |
| `mask` | string (URL) | No |  | A black-and-white image that describes the part of the image to inpaint. Black areas will be preserved while white ar... |
| `num_outputs` | integer | No | `1` | Number of outputs to generate |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps. Recommended range is 28-50, and lower number of steps produce lower quality outputs, faster. |
| `guidance` | float | No | `30` | Guidance for generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `megapixels` | enum: `1`, `0.25`, `match_input` | No | `"1"` | Approximate number of megapixels for generated image. Use match_input to match the size of the input (with an upper l... |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `lora_weights` | string | No |  | Load LoRA weights. Supports Replicate models in the format <owner>/<username> or <owner>/<username>/<version>, Huggin... |
| `lora_scale` | float | No | `1` | Determines how strongly the main LoRA should be applied. Sane results between 0 and 1 for base inference. For go_fast... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-fill-dev",
  input: {
        "image": "https://example.com/input.png",
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

- Model page: https://replicate.com/black-forest-labs/flux-fill-dev
- API page: https://replicate.com/black-forest-labs/flux-fill-dev/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
