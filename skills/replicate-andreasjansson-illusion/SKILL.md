---
name: replicate-andreasjansson-illusion
description: >
  Use this skill for the Replicate Illusion model (andreasjansson/illusion). Use the Illusion model via Replicate API.
---

# Illusion

**Model:** `andreasjansson/illusion`
**Source:** https://replicate.com/andreasjansson/illusion
**Version:** `75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b`

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

const output = await replicate.run("andreasjansson/illusion", {
  input: {
        "prompt": "your prompt here",
        "qr_code_content": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("andreasjansson/illusion",
    input={
        "prompt": "your prompt here",
        "qr_code_content": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/illusion/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "qr_code_content": "your value here"}}'
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
| `prompt` | string | **Yes** |  | The prompt to guide QR Code generation. |
| `qr_code_content` | string | **Yes** |  | The website/content your QR Code will point to. |
| `negative_prompt` | string | No | `"ugly, disfigured, low quality, blurry, nsfw"` | The negative prompt to guide image generation. |
| `num_inference_steps` | integer | No | `40` | Number of diffusion steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `seed` | integer | No | `-1` | Seed |
| `width` | integer | No | `768` | Width out the output image |
| `height` | integer | No | `768` | Height out the output image |
| `num_outputs` | integer | No | `1` | Number of outputs |
| `image` | string (URL) | No |  | Input image. If none is provided, a QR code will be generated |
| `controlnet_conditioning_scale` | float | No | `2.2` | The outputs of the controlnet are multiplied by `controlnet_conditioning_scale` before they are added to the residual... |
| `border` | integer | No | `1` | QR code border size |
| `qrcode_background` | enum: `gray`, `white` | No | `"gray"` | Background color of raw QR code |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/illusion",
  input: {
        "prompt": "your prompt here",
        "qr_code_content": "your value here"
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

- Model page: https://replicate.com/andreasjansson/illusion
- API page: https://replicate.com/andreasjansson/illusion/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
