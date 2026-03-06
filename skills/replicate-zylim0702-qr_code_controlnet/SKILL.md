---
name: replicate-zylim0702-qr_code_controlnet
description: >
  Use this skill for the Replicate Qr Code Controlnet model (zylim0702/qr_code_controlnet). Use the Qr Code Controlnet model via Replicate API.
---

# Qr Code Controlnet

**Model:** `zylim0702/qr_code_controlnet`
**Source:** https://replicate.com/zylim0702/qr_code_controlnet
**Version:** `628e604e13cf63d8ec58bd4d238474e8986b054bc5e1326e50995fdbc851c557`

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

const output = await replicate.run("zylim0702/qr_code_controlnet", {
  input: {
        "url": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zylim0702/qr_code_controlnet",
    input={
        "url": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zylim0702/qr_code_controlnet/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"url": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `url` | string | **Yes** |  | Link Url for QR Code. |
| `prompt` | string | **Yes** |  | Prompt for the model |
| `qr_conditioning_scale` | float | No | `1` | Conditioning scale for qr controlnet |
| `num_outputs` | integer | No | `1` | Number of images to generate |
| `image_resolution` | enum: `256`, `512`, `768` | No | `768` | Resolution of image (smallest dimension) |
| `scheduler` | enum (8 values) | No | `"DDIM"` | Choose a scheduler. |
| `num_inference_steps` | integer | No | `20` | Steps to run denoising |
| `guidance_scale` | float | No | `9` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Seed |
| `eta` | float | No | `0` | Controls the amount of noise that is added to the input data during the denoising diffusion process. Higher value -> ... |
| `negative_prompt` | string | No | `"Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"` | Negative prompt |
| `guess_mode` | boolean | No | `false` | In this mode, the ControlNet encoder will try best to recognize the content of the input image even if you remove all... |
| `disable_safety_check` | boolean | No | `false` | Disable safety check. Use at your own risk! |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zylim0702/qr_code_controlnet",
  input: {
        "url": "https://example.com/input.png",
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

- Model page: https://replicate.com/zylim0702/qr_code_controlnet
- API page: https://replicate.com/zylim0702/qr_code_controlnet/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
