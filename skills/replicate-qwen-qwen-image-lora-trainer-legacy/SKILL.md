---
name: replicate-qwen-qwen-image-lora-trainer-legacy
description: >
  Use this skill for the Replicate Qwen Image Lora Trainer Legacy model (qwen/qwen-image-lora-trainer-legacy). Use the Qwen Image Lora Trainer Legacy model via Replicate API.
---

# Qwen Image Lora Trainer Legacy

**Model:** `qwen/qwen-image-lora-trainer-legacy`
**Source:** https://replicate.com/qwen/qwen-image-lora-trainer-legacy
**Version:** `6dfdeb64d7708a5a6b95ce09b06bc717d71f80a85ff4634ee18c7edc7bc72dc8`

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

const output = await replicate.run("qwen/qwen-image-lora-trainer-legacy", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-image-lora-trainer-legacy",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-image-lora-trainer-legacy/predictions \
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
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio for the generated image. Ignored if width and height are both provided. |
| `image_size` | enum: `optimize_for_quality`, `optimize_for_speed` | No | `"optimize_for_quality"` | Image size preset (quality = larger, speed = faster). Ignored if width and height are both provided. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |
| `width` | integer | No |  | Custom width in pixels. Provide both width and height for custom dimensions (overrides aspect_ratio/image_size). |
| `height` | integer | No |  | Custom height in pixels. Provide both width and height for custom dimensions (overrides aspect_ratio/image_size). |
| `prompt` | string | **Yes** |  | The main prompt for image generation |
| `go_fast` | boolean | No | `false` | Use LCM-LoRA to accelerate image generation (trades quality for 8x speed) |
| `guidance` | float | No | `4` | Guidance scale for image generation. Defaults to 1 if go_fast, else 3.5. |
| `lora_scale` | float | No | `1` | Scale for LoRA weights (0 = base model, 1 = full LoRA) |
| `enhance_prompt` | boolean | No | `false` | Automatically enhance the prompt for better image generation |
| `output_quality` | integer | No | `80` | Quality when saving images (0-100, higher is better, 100 = lossless) |
| `negative_prompt` | string | No | `""` | Things you do not want to see in your image |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps. More steps = higher quality. Defaults to 4 if go_fast, else 28. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "qwen/qwen-image-lora-trainer-legacy",
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

- Model page: https://replicate.com/qwen/qwen-image-lora-trainer-legacy
- API page: https://replicate.com/qwen/qwen-image-lora-trainer-legacy/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
