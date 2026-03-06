---
name: replicate-qwen-qwen-edit-multiangle
description: >
  Use this skill for the Replicate Qwen Edit Multiangle model (qwen/qwen-edit-multiangle). Use the Qwen Edit Multiangle model via Replicate API.
---

# Qwen Edit Multiangle

**Model:** `qwen/qwen-edit-multiangle`
**Source:** https://replicate.com/qwen/qwen-edit-multiangle
**Version:** `cf245ffaa67a6d7d0edeb597d2fded5ab80cbf72b0dceec185d709ea99667f79`

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

const output = await replicate.run("qwen/qwen-edit-multiangle", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-edit-multiangle",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-edit-multiangle/predictions \
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
| `image` | string (URL) | **Yes** |  | Image file uploaded to Cog (jpeg, png, gif, or webp). |
| `prompt` | string | No | `""` | Optional text instruction appended after the camera directive. |
| `rotate_degrees` | integer | No | `0` | Camera rotation in degrees. Positive rotates left, negative rotates right. |
| `move_forward` | integer | No | `0` | Move the camera forward (zoom in). Higher values push toward a close-up framing. |
| `vertical_tilt` | integer | No | `0` | Vertical camera tilt. -1 = bird's-eye, 0 = level, 1 = worm's-eye. |
| `use_wide_angle` | boolean | No | `false` | Switch to a wide-angle lens instruction. |
| `aspect_ratio` | enum: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `match_input_image` | No | `"match_input_image"` | Aspect ratio for the generated image |
| `go_fast` | boolean | No | `true` | If num_inference_steps is omitted, true runs the 4-step fast preset and false runs the 40-step detailed preset. |
| `num_inference_steps` | integer | No |  | Explicit denoising step count (1-40). Leave blank to use the go_fast presets (4 or 40 steps). |
| `lora_weights` | string | No | `"dx8152/Qwen-Edit-2509-Multiple-angles"` | LoRA weights to apply. Pass a Hugging Face repo slug like 'dx8152/Qwen-Edit-2509-Multiple-angles' or a direct .safete... |
| `lora_scale` | float | No | `1.25` | Strength applied to the selected LoRA. |
| `true_guidance_scale` | float | No | `1` | True classifier-free guidance scale passed to the pipeline. |
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
  model: "qwen/qwen-edit-multiangle",
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

- Model page: https://replicate.com/qwen/qwen-edit-multiangle
- API page: https://replicate.com/qwen/qwen-edit-multiangle/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
