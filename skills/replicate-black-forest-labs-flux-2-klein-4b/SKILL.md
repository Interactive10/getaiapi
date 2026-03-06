---
name: replicate-black-forest-labs-flux-2-klein-4b
description: >
  Use this skill for the Replicate Flux 2 Klein 4B model (black-forest-labs/flux-2-klein-4b). Use the Flux 2 Klein 4B model via Replicate API.
---

# Flux 2 Klein 4B

**Model:** `black-forest-labs/flux-2-klein-4b`
**Source:** https://replicate.com/black-forest-labs/flux-2-klein-4b
**Version:** `8e9c42d77b10a2a41af823ac4500f7545be6ebc4e745830fc3f3de10de200542`

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

const output = await replicate.run("black-forest-labs/flux-2-klein-4b", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-2-klein-4b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-2-klein-4b/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation. |
| `images` | list<string (URL)> | No | `[]` | List of input images for image-to-image generation. Maximum 5 images. Must be jpeg, png, gif, or webp. |
| `aspect_ratio` | enum (12 values) | No | `"1:1"` | Aspect ratio for the generated image. Use 'match_input_image' to match the aspect ratio of the first input image. |
| `output_megapixels` | enum: `0.25`, `0.5`, `1`, `2`, `4` | No | `"1"` | Resolution of the output image in megapixels |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `go_fast` | boolean | No | `false` | Run faster predictions with additional optimizations. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"jpg"` | Format of the output images |
| `output_quality` | integer | No | `95` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
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
  model: "black-forest-labs/flux-2-klein-4b",
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

- Model page: https://replicate.com/black-forest-labs/flux-2-klein-4b
- API page: https://replicate.com/black-forest-labs/flux-2-klein-4b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
