---
name: replicate-black-forest-labs-flux-redux-schnell
description: >
  Use this skill for the Replicate Flux Redux Schnell model (black-forest-labs/flux-redux-schnell). Use the Flux Redux Schnell model via Replicate API.
---

# Flux Redux Schnell

**Model:** `black-forest-labs/flux-redux-schnell`
**Source:** https://replicate.com/black-forest-labs/flux-redux-schnell
**Version:** `8a9ff6ce228b950c7079005fd0804f54c74c0113cda3f3c07eff10ab943f32a1`

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

const output = await replicate.run("black-forest-labs/flux-redux-schnell", {
  input: {
        "redux_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-redux-schnell",
    input={
        "redux_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-redux-schnell/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"redux_image": "https://example.com/input.png"}}'
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
| `redux_image` | string (URL) | **Yes** |  | Input image to condition your output on. This replaces prompt for FLUX.1 Redux models |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio for the generated image |
| `num_outputs` | integer | No | `1` | Number of outputs to generate |
| `num_inference_steps` | integer | No | `4` | Number of denoising steps. 4 is recommended, and lower number of steps produce lower quality outputs, faster. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |
| `megapixels` | enum: `1`, `0.25` | No | `"1"` | Approximate number of megapixels for generated image |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-redux-schnell",
  input: {
        "redux_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/black-forest-labs/flux-redux-schnell
- API page: https://replicate.com/black-forest-labs/flux-redux-schnell/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
