---
name: replicate-prunaai-flux-kontext-fast
description: >
  Use this skill for the Replicate Flux Kontext Fast model (prunaai/flux-kontext-fast). Use the Flux Kontext Fast model via Replicate API.
---

# Flux Kontext Fast

**Model:** `prunaai/flux-kontext-fast`
**Source:** https://replicate.com/prunaai/flux-kontext-fast
**Version:** `6efb57153457f8c51fb813c6d15f45d896f1916dd7d732af49d6a4b09488e2a6`

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

const output = await replicate.run("prunaai/flux-kontext-fast", {
  input: {
        "prompt": "your prompt here",
        "img_cond_path": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/flux-kontext-fast",
    input={
        "prompt": "your prompt here",
        "img_cond_path": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/flux-kontext-fast/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "img_cond_path": "your value here"}}'
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
| `speed_mode` | enum: `Lightly Juiced 🍊 (more consistent)`, `Juiced 🔥 (default)`, `Extra Juiced 🔥 (more speed)`, `Blink of an eye 👁️`, `Real Time` | No | `"Extra Juiced 🔥 (more speed)"` | Speed optimization level |
| `aspect_ratio` | enum (12 values) | No | `"match_input_image"` | Aspect ratio of the output image |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"jpg"` | Output format |
| `seed` | integer | No | `-1` | Seed |
| `prompt` | string | **Yes** |  | Prompt |
| `guidance` | float | No | `3.5` | Guidance scale |
| `image_size` | integer | No | `1024` | Base image size (longest side) |
| `img_cond_path` | string (URL) | **Yes** |  | Input image for image to image mode. The aspect ratio of your output will match this image |
| `output_quality` | integer | No | `80` | Output quality (for jpg and webp) |
| `num_inference_steps` | integer | No | `30` | Number of inference steps |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/flux-kontext-fast",
  input: {
        "prompt": "your prompt here",
        "img_cond_path": "your value here"
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

- Model page: https://replicate.com/prunaai/flux-kontext-fast
- API page: https://replicate.com/prunaai/flux-kontext-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
