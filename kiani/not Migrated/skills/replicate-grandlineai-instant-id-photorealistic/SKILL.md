---
name: replicate-grandlineai-instant-id-photorealistic
description: >
  Use this skill for the Replicate Instant Id Photorealistic model (grandlineai/instant-id-photorealistic). Use the Instant Id Photorealistic model via Replicate API.
---

# Instant Id Photorealistic

**Model:** `grandlineai/instant-id-photorealistic`
**Source:** https://replicate.com/grandlineai/instant-id-photorealistic
**Version:** `03914a0c3326bf44383d0cd84b06822618af879229ce5d1d53bef38d93b68279`

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

const output = await replicate.run("grandlineai/instant-id-photorealistic", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("grandlineai/instant-id-photorealistic",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/grandlineai/instant-id-photorealistic/predictions \
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
| `prompt` | string | No | `"analog film photo of a man. faded film, desaturated, 35mm photo, grainy, vignette, vintage, Kodachrome, Lomography, stained, highly detailed, found footage, masterpiece, best quality"` | Input prompt |
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `width` | integer | No | `640` | Width of output image |
| `height` | integer | No | `640` | Height of output image |
| `ip_adapter_scale` | float | No | `0.8` | Scale for IP adapter |
| `controlnet_conditioning_scale` | float | No | `0.8` | Scale for ControlNet conditioning |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `guidance_scale` | float | No | `5` | Scale for classifier-free guidance |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "grandlineai/instant-id-photorealistic",
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

- Model page: https://replicate.com/grandlineai/instant-id-photorealistic
- API page: https://replicate.com/grandlineai/instant-id-photorealistic/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
