---
name: replicate-black-forest-labs-flux-2-pro
description: >
  Use this skill for the Replicate Flux 2 Pro model (black-forest-labs/flux-2-pro). Use the Flux 2 Pro model via Replicate API.
---

# Flux 2 Pro

**Model:** `black-forest-labs/flux-2-pro`
**Source:** https://replicate.com/black-forest-labs/flux-2-pro
**Version:** `285631b5656a1839331cd9af0d82da820e2075db12046d1d061c681b2f206bc6`

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

const output = await replicate.run("black-forest-labs/flux-2-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-2-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-2-pro/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `input_images` | list<string (URL)> | No | `[]` | List of input images for image-to-image generation. Maximum 8 images. Must be jpeg, png, gif, or webp. |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio for the generated image. Use 'match_input_image' to match the first input image's aspect ratio. |
| `resolution` | enum: `match_input_image`, `0.5 MP`, `1 MP`, `2 MP`, `4 MP` | No | `"1 MP"` | Resolution in megapixels. Up to 4 MP is possible, but 2 MP or below is recommended. The maximum image size is 2048x20... |
| `width` | integer | No |  | Width of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 32 (if it's not, it will be r... |
| `height` | integer | No |  | Height of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 32 (if it's not, it will be ... |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 1 is most strict and 5 is most permissive |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images. |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-2-pro",
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

- Model page: https://replicate.com/black-forest-labs/flux-2-pro
- API page: https://replicate.com/black-forest-labs/flux-2-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
