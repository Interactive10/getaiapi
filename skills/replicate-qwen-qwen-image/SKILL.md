---
name: replicate-qwen-qwen-image
description: >
  Use this skill for the Replicate Qwen Image model (qwen/qwen-image). Use the Qwen Image model via Replicate API.
---

# Qwen Image

**Model:** `qwen/qwen-image`
**Source:** https://replicate.com/qwen/qwen-image
**Version:** `0bba9e70f78437359725e0989ead45ca8b09e6c12a070dfe9a09e6856b43a44d`

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

const output = await replicate.run("qwen/qwen-image", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-image",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-image/predictions \
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
| `prompt` | string | **Yes** |  | Prompt for generated image |
| `enhance_prompt` | boolean | No | `false` | Enhance the prompt with positive magic. |
| `lora_weights` | string | No |  | Load LoRA weights. Only works with text to image pipeline. Supports arbitrary .safetensors URLs, tar files, and zip f... |
| `lora_scale` | float | No | `1` | Determines how strongly the main LoRA should be applied. |
| `extra_lora_weights` | list<string> | No |  | Additional LoRA weights as an array of URLs. Same formats supported as lora_weights (e.g., ['https://huggingface.co/f... |
| `extra_lora_scale` | list<float> | No |  | Scales for additional LoRAs as an array of numbers (e.g., 0.5, 0.7). Must match the number of weights in extra_lora_w... |
| `image` | string (URL) | No |  | Input image for img2img pipeline |
| `strength` | float | No | `0.9` | Strength for img2img pipeline |
| `negative_prompt` | string | No | `" "` | Negative prompt for generated image |
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio for the generated image |
| `image_size` | enum: `optimize_for_quality`, `optimize_for_speed` | No | `"optimize_for_quality"` | Image size for the generated image |
| `go_fast` | boolean | No | `true` | Run faster predictions with additional optimizations. |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps. Recommended range is 28-50, and lower number of steps produce lower quality outputs, faster. |
| `guidance` | float | No | `3` | Guidance for generated image. Lower values can give more realistic images. Good values to try are 2, 2.5, 3 and 3.5 |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
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
  model: "qwen/qwen-image",
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

- Model page: https://replicate.com/qwen/qwen-image
- API page: https://replicate.com/qwen/qwen-image/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
