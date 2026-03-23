---
name: replicate-qwen-edit-apps-qwen-image-edit-plus-lora-next-scene
description: >
  Use this skill for the Replicate Qwen Image Edit Plus Lora Next Scene model (qwen-edit-apps/qwen-image-edit-plus-lora-next-scene). Use the Qwen Image Edit Plus Lora Next Scene model via Replicate API.
---

# Qwen Image Edit Plus Lora Next Scene

**Model:** `qwen-edit-apps/qwen-image-edit-plus-lora-next-scene`
**Source:** https://replicate.com/qwen-edit-apps/qwen-image-edit-plus-lora-next-scene
**Version:** `8a060e5c901515797bcfa1ab9050575be0dec05fa6c96e6decd3c6d4d8e17aa8`

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

const output = await replicate.run("qwen-edit-apps/qwen-image-edit-plus-lora-next-scene", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen-edit-apps/qwen-image-edit-plus-lora-next-scene",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen-edit-apps/qwen-image-edit-plus-lora-next-scene/predictions \
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
| `prompt` | string | No | `"Next Scene: The camera glides forward as warm cinematic light reveals the wider setting."` | Prompt hint: start with `Next Scene:` then describe the new camera move, framing, and lighting so the shot feels like... |
| `aspect_ratio` | enum: `match_input_image`, `1:1`, `16:9`, `9:16`, `4:3`, `3:4` | No | `"match_input_image"` | Aspect ratio for the generated image |
| `go_fast` | boolean | No |  | If num_inference_steps is omitted, true runs the 8-step Lightning preset and false runs the 40-step detailed preset. |
| `num_inference_steps` | integer | No |  | Explicit denoising step count (1-40). Leave blank to use the go_fast presets (fast = 8 steps, slow = 40 steps). |
| `lora_weights` | string | No | `""` | LoRA weights to apply. Leave blank to use the proxy's default adapter. |
| `lora_scale` | float | No |  | Strength applied to the selected LoRA. Leave blank for the proxy default. |
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
  model: "qwen-edit-apps/qwen-image-edit-plus-lora-next-scene",
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

- Model page: https://replicate.com/qwen-edit-apps/qwen-image-edit-plus-lora-next-scene
- API page: https://replicate.com/qwen-edit-apps/qwen-image-edit-plus-lora-next-scene/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
