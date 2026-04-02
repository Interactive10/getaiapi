---
name: replicate-black-forest-labs-flux-fill-pro
description: >
  Use this skill for the Replicate Flux Fill Pro model (black-forest-labs/flux-fill-pro). Use the Flux Fill Pro model via Replicate API.
---

# Flux Fill Pro

**Model:** `black-forest-labs/flux-fill-pro`
**Source:** https://replicate.com/black-forest-labs/flux-fill-pro
**Version:** `2d4197724d8ed13cc78191e794ebbe6aeedcfe4c5b36f464794732d5ccb9735f`

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

const output = await replicate.run("black-forest-labs/flux-fill-pro", {
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

output = replicate.run("black-forest-labs/flux-fill-pro",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-fill-pro/predictions \
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
| `outpaint` | enum (8 values) | No | `"None"` | A quick option for outpainting an input image. Mask will be ignored. |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Format of the output images. |
| `mask` | string (URL) | No |  | A black-and-white image that describes the part of the image to inpaint. Black areas will be preserved while white ar... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `image` | string (URL) | **Yes** |  | The image to inpaint. Can contain an alpha mask. Must be jpeg, png, gif, or webp. |
| `steps` | integer | No | `50` | Number of diffusion steps. Higher values yield finer details but increase processing time. |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `guidance` | float | No | `60` | Controls the balance between adherence to the text prompt and image quality/diversity. Higher values make the output ... |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 1 is most strict and 6 is most permissive |
| `prompt_upsampling` | boolean | No | `false` | Automatically modify the prompt for more creative generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-fill-pro",
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

- Model page: https://replicate.com/black-forest-labs/flux-fill-pro
- API page: https://replicate.com/black-forest-labs/flux-fill-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
