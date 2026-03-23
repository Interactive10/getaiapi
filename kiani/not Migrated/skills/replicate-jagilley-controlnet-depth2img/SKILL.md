---
name: replicate-jagilley-controlnet-depth2img
description: >
  Use this skill for the Replicate Controlnet Depth2Img model (jagilley/controlnet-depth2img). Use the Controlnet Depth2Img model via Replicate API.
---

# Controlnet Depth2Img

**Model:** `jagilley/controlnet-depth2img`
**Source:** https://replicate.com/jagilley/controlnet-depth2img
**Version:** `922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60`

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

const output = await replicate.run("jagilley/controlnet-depth2img", {
  input: {
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("jagilley/controlnet-depth2img",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/jagilley/controlnet-depth2img/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `prompt` | string | **Yes** |  | Prompt for the model |
| `num_samples` | enum: `1`, `4` | No | `"1"` | Number of samples (higher values may OOM) |
| `image_resolution` | enum: `256`, `512`, `768` | No | `"512"` | Image resolution to be generated |
| `ddim_steps` | integer | No | `20` | Steps |
| `scale` | float | No | `9` | Guidance Scale |
| `seed` | integer | No |  | Seed |
| `eta` | float | No | `0` | eta (DDIM) |
| `a_prompt` | string | No | `"best quality, extremely detailed"` | Added Prompt |
| `n_prompt` | string | No | `"longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"` | Negative Prompt |
| `detect_resolution` | integer | No | `512` | Resolution for detection) |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "jagilley/controlnet-depth2img",
  input: {
        "image": "https://example.com/input.png",
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

- Model page: https://replicate.com/jagilley/controlnet-depth2img
- API page: https://replicate.com/jagilley/controlnet-depth2img/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
