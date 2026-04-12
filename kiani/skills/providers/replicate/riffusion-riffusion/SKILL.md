---
name: replicate-riffusion-riffusion
description: >
  Use this skill for the Replicate Riffusion model (riffusion/riffusion). Use the Riffusion model via Replicate API.
---

# Riffusion

**Model:** `riffusion/riffusion`
**Source:** https://replicate.com/riffusion/riffusion
**Version:** `8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05`

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

const output = await replicate.run("riffusion/riffusion", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("riffusion/riffusion",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/riffusion/riffusion/predictions \
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
| `prompt_a` | string | No | `"funky synth solo"` | The prompt for your audio |
| `denoising` | float | No | `0.75` | How much to transform input spectrogram |
| `prompt_b` | string | No |  | The second prompt to interpolate with the first, leave blank if no interpolation |
| `alpha` | float | No | `0.5` | Interpolation alpha if using two prompts. A value of 0 uses prompt_a fully, a value of 1 uses prompt_b fully |
| `num_inference_steps` | integer | No | `50` | Number of steps to run the diffusion model |
| `seed_image_id` | enum (11 values) | No | `"vibes"` | Seed spectrogram to use |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | string (URL) |  |
| `spectrogram` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "riffusion/riffusion",
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

- Model page: https://replicate.com/riffusion/riffusion
- API page: https://replicate.com/riffusion/riffusion/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
