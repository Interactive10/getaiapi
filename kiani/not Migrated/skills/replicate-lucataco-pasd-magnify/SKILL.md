---
name: replicate-lucataco-pasd-magnify
description: >
  Use this skill for the Replicate Pasd Magnify model (lucataco/pasd-magnify). Use the Pasd Magnify model via Replicate API.
---

# Pasd Magnify

**Model:** `lucataco/pasd-magnify`
**Source:** https://replicate.com/lucataco/pasd-magnify
**Version:** `d59e83ee13c42b137aee558c483e3acc0a8ecdacb1444a7be48152f008dcc195`

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

const output = await replicate.run("lucataco/pasd-magnify", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/pasd-magnify",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/pasd-magnify/predictions \
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
| `prompt` | string | No | `"Frog, clean, high-resolution, 8k, best quality, masterpiece"` | Prompt |
| `n_prompt` | string | No | `"dotted, noise, blur, lowres, oversmooth, longbody, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"` | Negative Prompt |
| `denoise_steps` | integer | No | `20` | Denoise Steps |
| `upsample_scale` | integer | No | `2` | Upsample Scale |
| `conditioning_scale` | float | No | `1.1` | Conditioning Scale |
| `guidance_scale` | float | No | `7.5` | Guidance Scale |
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
  model: "lucataco/pasd-magnify",
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

- Model page: https://replicate.com/lucataco/pasd-magnify
- API page: https://replicate.com/lucataco/pasd-magnify/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
