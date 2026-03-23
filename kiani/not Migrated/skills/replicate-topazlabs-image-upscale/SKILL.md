---
name: replicate-topazlabs-image-upscale
description: >
  Use this skill for the Replicate Image Upscale model (topazlabs/image-upscale). Use the Image Upscale model via Replicate API.
---

# Image Upscale

**Model:** `topazlabs/image-upscale`
**Source:** https://replicate.com/topazlabs/image-upscale
**Version:** `2fdc3b86a01d338ae89ad58e5d9241398a8a01de9b0dda41ba8a0434c8a00dc3`

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

const output = await replicate.run("topazlabs/image-upscale", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("topazlabs/image-upscale",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/topazlabs/image-upscale/predictions \
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
| `image` | string (URL) | **Yes** |  | Image to enhance |
| `enhance_model` | enum: `Standard V2`, `Low Resolution V2`, `CGI`, `High Fidelity V2`, `Text Refine` | No | `"Standard V2"` | Model to use: Standard V2 (general purpose), Low Resolution V2 (for low-res images), CGI (for digital art), High Fide... |
| `upscale_factor` | enum: `None`, `2x`, `4x`, `6x` | No | `"None"` | How much to upscale the image |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Output format |
| `subject_detection` | enum: `None`, `All`, `Foreground`, `Background` | No | `"None"` | Subject detection |
| `face_enhancement` | boolean | No | `false` | Enhance faces in the image |
| `face_enhancement_creativity` | float | No | `0` | Choose the level of creativity for face enhancement from 0 to 1. Defaults to 0, and is ignored if face_enhancement is... |
| `face_enhancement_strength` | float | No | `0.8` | Control how sharp the enhanced faces are relative to the background from 0 to 1. Defaults to 0.8, and is ignored if f... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "topazlabs/image-upscale",
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

- Model page: https://replicate.com/topazlabs/image-upscale
- API page: https://replicate.com/topazlabs/image-upscale/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
