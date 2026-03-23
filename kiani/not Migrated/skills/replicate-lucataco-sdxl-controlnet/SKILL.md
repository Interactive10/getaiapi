---
name: replicate-lucataco-sdxl-controlnet
description: >
  Use this skill for the Replicate Sdxl Controlnet model (lucataco/sdxl-controlnet). Use the Sdxl Controlnet model via Replicate API.
---

# Sdxl Controlnet

**Model:** `lucataco/sdxl-controlnet`
**Source:** https://replicate.com/lucataco/sdxl-controlnet
**Version:** `06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b`

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

const output = await replicate.run("lucataco/sdxl-controlnet", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/sdxl-controlnet",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/sdxl-controlnet/predictions \
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
| `image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `prompt` | string | No | `"aerial view, a futuristic research complex in a bright foggy jungle, hard lighting"` | Input prompt |
| `negative_prompt` | string | No | `"low quality, bad quality, sketches"` | Input Negative Prompt |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `condition_scale` | float | No | `0.5` | controlnet conditioning scale for generalization |
| `seed` | integer | No | `0` | Random seed. Set to 0 to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/sdxl-controlnet",
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

- Model page: https://replicate.com/lucataco/sdxl-controlnet
- API page: https://replicate.com/lucataco/sdxl-controlnet/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
