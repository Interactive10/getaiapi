---
name: replicate-prunaai-flux-fast
description: >
  Use this skill for the Replicate Flux Fast model (prunaai/flux-fast). Use the Flux Fast model via Replicate API.
---

# Flux Fast

**Model:** `prunaai/flux-fast`
**Source:** https://replicate.com/prunaai/flux-fast
**Version:** `4f22c6cd75e0f95f12f55d1616a4d163e9166087ed4979f5cecc40418a522703`

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

const output = await replicate.run("prunaai/flux-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/flux-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/flux-fast/predictions \
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
| `speed_mode` | enum: `Lightly Juiced 🍊 (more consistent)`, `Juiced 🔥 (default)`, `Extra Juiced 🔥 (more speed)`, `Blink of an eye 👁️` | No | `"Extra Juiced 🔥 (more speed)"` | Speed optimization level |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio of the output image |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"jpg"` | Output format |
| `seed` | integer | No | `-1` | Seed |
| `prompt` | string | **Yes** |  | Prompt |
| `guidance` | float | No | `3.5` | Guidance scale |
| `image_size` | integer | No | `1024` | Base image size (longest side) |
| `output_quality` | integer | No | `80` | Output quality (for jpg and webp) |
| `num_inference_steps` | integer | No | `28` | Number of inference steps |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/flux-fast",
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

- Model page: https://replicate.com/prunaai/flux-fast
- API page: https://replicate.com/prunaai/flux-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
