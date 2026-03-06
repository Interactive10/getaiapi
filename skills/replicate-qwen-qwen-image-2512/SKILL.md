---
name: replicate-qwen-qwen-image-2512
description: >
  Use this skill for the Replicate Qwen Image 2512 model (qwen/qwen-image-2512). Use the Qwen Image 2512 model via Replicate API.
---

# Qwen Image 2512

**Model:** `qwen/qwen-image-2512`
**Source:** https://replicate.com/qwen/qwen-image-2512
**Version:** `47c060e80055269a615f9636df2d51fd50239dc439f5ecde465a7d513a0abda6`

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

const output = await replicate.run("qwen/qwen-image-2512", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-image-2512",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-image-2512/predictions \
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
| `negative_prompt` | string | No | `" "` | Negative prompt for image generation. |
| `image` | string (URL) | No |  | Input image for image2image generation. The aspect ratio of your output will match this image. |
| `strength` | float | No | `0.8` | Strength for image2image generation. 1.0 corresponds to full destruction of information in image. |
| `aspect_ratio` | enum (8 values) | No | `"16:9"` | Aspect ratio for the generated image. |
| `width` | integer | No |  | Width of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 16. |
| `height` | integer | No |  | Height of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 16. |
| `guidance` | float | No | `4` | Guidance for generated image. Use higher values for stronger prompt adherence. |
| `num_inference_steps` | integer | No | `40` | Number of denoising steps. Use less steps for faster generation. |
| `go_fast` | boolean | No | `true` | Use the model with additional optimizations for faster generation. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images. |
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
  model: "qwen/qwen-image-2512",
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

- Model page: https://replicate.com/qwen/qwen-image-2512
- API page: https://replicate.com/qwen/qwen-image-2512/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
