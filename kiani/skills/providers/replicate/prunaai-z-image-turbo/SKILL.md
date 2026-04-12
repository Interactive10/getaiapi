---
name: replicate-prunaai-z-image-turbo
description: >
  Use this skill for the Replicate Z Image Turbo model (prunaai/z-image-turbo). Use the Z Image Turbo model via Replicate API.
---

# Z Image Turbo

**Model:** `prunaai/z-image-turbo`
**Source:** https://replicate.com/prunaai/z-image-turbo
**Version:** `cba7f388939b0db49dbea3341f8d732577aa0a964d9eefea5d186ab47e60deba`

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

const output = await replicate.run("prunaai/z-image-turbo", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/z-image-turbo",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/z-image-turbo/predictions \
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
| `height` | integer | No | `1024` | Height of the generated image |
| `width` | integer | No | `1024` | Width of the generated image |
| `num_inference_steps` | integer | No | `8` | Number of inference steps. |
| `guidance_scale` | float | No | `0` | Guidance scale. Should be 0 for Turbo models |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `go_fast` | boolean | No | `false` | Apply additional optimizations for faster generation |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"jpg"` | Format of the output images |
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
  model: "prunaai/z-image-turbo",
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

- Model page: https://replicate.com/prunaai/z-image-turbo
- API page: https://replicate.com/prunaai/z-image-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
