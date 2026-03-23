---
name: replicate-lucataco-demofusion-enhance
description: >
  Use this skill for the Replicate Demofusion Enhance model (lucataco/demofusion-enhance). Use the Demofusion Enhance model via Replicate API.
---

# Demofusion Enhance

**Model:** `lucataco/demofusion-enhance`
**Source:** https://replicate.com/lucataco/demofusion-enhance
**Version:** `5bcfe11066c820e8c08232c6efa3c8a7ab2cd667ad136ca173633f352170691e`

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

const output = await replicate.run("lucataco/demofusion-enhance", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/demofusion-enhance",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/demofusion-enhance/predictions \
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
| `image` | string (URL) | **Yes** |  | Input image |
| `scale` | enum: `1`, `2`, `4` | No | `2` | Scale factor for input image |
| `prompt` | string | No | `"A high resolution photo"` | Input prompt |
| `auto_prompt` | boolean | No | `false` | Select to use auto-generated CLIP prompt instead of using the above custom prompt |
| `negative_prompt` | string | No | `"blurry, ugly, duplicate, poorly drawn, deformed, mosaic"` | Input Negative Prompt |
| `num_inference_steps` | integer | No | `40` | Number of denoising steps |
| `guidance_scale` | float | No | `8.5` | Scale for classifier-free guidance |
| `view_batch_size` | integer | No | `16` | The batch size for multiple denoising paths |
| `stride` | integer | No | `64` | The stride of moving local patches |
| `cosine_scale_1` | float | No | `3` | Control the strength of skip-residual |
| `cosine_scale_2` | float | No | `1` | Control the strength of dilated sampling |
| `cosine_scale_3` | float | No | `1` | Control the strength of the Gaussian filter |
| `sigma` | float | No | `0.8` | The standard value of the Gaussian filter |
| `multi_decoder` | boolean | No | `false` | Use multiple decoders |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/demofusion-enhance",
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

- Model page: https://replicate.com/lucataco/demofusion-enhance
- API page: https://replicate.com/lucataco/demofusion-enhance/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
