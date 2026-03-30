---
name: replicate-philz1337x-controlnet-deliberate
description: >
  Use this skill for the Replicate Controlnet Deliberate model (philz1337x/controlnet-deliberate). Use the Controlnet Deliberate model via Replicate API.
---

# Controlnet Deliberate

**Model:** `philz1337x/controlnet-deliberate`
**Source:** https://replicate.com/philz1337x/controlnet-deliberate
**Version:** `57d86bd78018d138449fda45bfcafb8b10888379a600034cc2c7186faab98c66`

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

const output = await replicate.run("philz1337x/controlnet-deliberate", {
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

output = replicate.run("philz1337x/controlnet-deliberate",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/philz1337x/controlnet-deliberate/predictions \
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
| `weight` | float | No | `1` | Weight of ControlNet |
| `low_threshold` | integer | No | `100` | Canny line detection low threshold |
| `high_threshold` | integer | No | `200` | Canny line detection high threshold |
| `ddim_steps` | integer | No | `20` | Steps |
| `scale` | float | No | `9` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Seed |
| `eta` | float | No | `0` | Controls the amount of noise that is added to the input data during the denoising diffusion process. Higher value -> ... |
| `a_prompt` | string | No | `"best quality, extremely detailed"` | Additional text to be appended to prompt |
| `n_prompt` | string | No | `"longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"` | Negative Prompt |
| `detect_resolution` | integer | No | `512` | Resolution at which detection method will be applied) |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "philz1337x/controlnet-deliberate",
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

- Model page: https://replicate.com/philz1337x/controlnet-deliberate
- API page: https://replicate.com/philz1337x/controlnet-deliberate/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
