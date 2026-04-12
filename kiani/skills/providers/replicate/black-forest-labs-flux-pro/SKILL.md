---
name: replicate-black-forest-labs-flux-pro
description: >
  Use this skill for the Replicate Flux Pro model (black-forest-labs/flux-pro). Use the Flux Pro model via Replicate API.
---

# Flux Pro

**Model:** `black-forest-labs/flux-pro`
**Source:** https://replicate.com/black-forest-labs/flux-pro
**Version:** `ce4035b99fc7bac18bc2f0384632858f126f6b4d96c88603a898a76b8e0c4ac2`

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

const output = await replicate.run("black-forest-labs/flux-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions \
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
| `aspect_ratio` | enum (10 values) | No | `"1:1"` | Aspect ratio for the generated image |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `steps` | integer | No | `25` | Deprecated |
| `width` | integer | No |  | Width of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if ... |
| `height` | integer | No |  | Height of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if... |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `guidance` | float | No | `3` | Controls the balance between adherence to the text prompt and image quality/diversity. Higher values make the output ... |
| `interval` | float | No | `2` | Deprecated |
| `image_prompt` | string (URL) | No |  | Image to use with Flux Redux. This is used together with the text prompt to guide the generation towards the composit... |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
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
  model: "black-forest-labs/flux-pro",
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

- Model page: https://replicate.com/black-forest-labs/flux-pro
- API page: https://replicate.com/black-forest-labs/flux-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
