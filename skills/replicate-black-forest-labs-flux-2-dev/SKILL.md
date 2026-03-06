---
name: replicate-black-forest-labs-flux-2-dev
description: >
  Use this skill for the Replicate Flux 2 Dev model (black-forest-labs/flux-2-dev). Use the Flux 2 Dev model via Replicate API.
---

# Flux 2 Dev

**Model:** `black-forest-labs/flux-2-dev`
**Source:** https://replicate.com/black-forest-labs/flux-2-dev
**Version:** `7bba46bdde863cfd7aaee87649a5aa49f39f368495dbea500998d1fcbb262050`

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

const output = await replicate.run("black-forest-labs/flux-2-dev", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-2-dev",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-2-dev/predictions \
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
| `prompt` | string | **Yes** |  | Text description of the image to generate. |
| `input_images` | list<string (URL)> | No | `[]` | List of input images for image-to-image generation. Maximum 4 images. Must be jpeg, png, gif, or webp. |
| `go_fast` | boolean | No | `true` | Run faster predictions with additional optimizations. |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio for the generated image. Use 'match_input_image' to match the first input image's aspect ratio. |
| `width` | integer | No |  | Width of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if ... |
| `height` | integer | No |  | Height of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images. |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-2-dev",
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

- Model page: https://replicate.com/black-forest-labs/flux-2-dev
- API page: https://replicate.com/black-forest-labs/flux-2-dev/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
