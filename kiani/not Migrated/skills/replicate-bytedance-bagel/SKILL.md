---
name: replicate-bytedance-bagel
description: >
  Use this skill for the Replicate Bagel model (bytedance/bagel). Use the Bagel model via Replicate API.
---

# Bagel

**Model:** `bytedance/bagel`
**Source:** https://replicate.com/bytedance/bagel
**Version:** `7dd8def79e503990740db4704fa81af995d440fefe714958531d7044d2757c9c`

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

const output = await replicate.run("bytedance/bagel", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/bagel",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/bagel/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for generation, editing, or understanding |
| `image` | string (URL) | No |  | Input image for editing or understanding tasks |
| `task` | enum: `text-to-image`, `image-editing`, `image-understanding` | No | `"text-to-image"` | Task to perform |
| `enable_thinking` | boolean | No | `false` | Enable chain-of-thought reasoning for better results |
| `cfg_text_scale` | float | No | `4` | Text guidance scale for how closely to follow the prompt |
| `cfg_img_scale` | float | No | `1.5` | Image guidance scale for preserving input image details |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `timestep_shift` | float | No | `3` | Distribution of denoising steps between composition and details |
| `cfg_renorm_type` | enum: `global`, `local`, `text_channel` | No | `"global"` | CFG renormalization method |
| `cfg_renorm_min` | float | No | `1` | Minimum CFG renorm value |
| `seed` | integer | No |  | Random seed for reproducible results |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Output image format |
| `output_quality` | integer | No | `90` | Image compression quality for lossy formats |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string |  |
| `image` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/bagel",
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

- Model page: https://replicate.com/bytedance/bagel
- API page: https://replicate.com/bytedance/bagel/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
