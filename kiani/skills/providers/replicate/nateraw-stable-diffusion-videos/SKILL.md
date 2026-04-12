---
name: replicate-nateraw-stable-diffusion-videos
description: >
  Use this skill for the Replicate Stable Diffusion Videos model (nateraw/stable-diffusion-videos). Use the Stable Diffusion Videos model via Replicate API.
---

# Stable Diffusion Videos

**Model:** `nateraw/stable-diffusion-videos`
**Source:** https://replicate.com/nateraw/stable-diffusion-videos
**Version:** `2d87f0f8bc282042002f8d24458bbf588eee5e8d8fffb6fbb10ed48d1dac409e`

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

const output = await replicate.run("nateraw/stable-diffusion-videos", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nateraw/stable-diffusion-videos",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nateraw/stable-diffusion-videos/predictions \
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
| `prompts` | string | No | `"a cat | a dog | a horse"` | Input prompts, separate each prompt with '\|'. |
| `seeds` | string | No |  | Random seed, separated with '\|' to use different seeds for each of the prompt provided above. Leave blank to randomi... |
| `scheduler` | enum: `default`, `ddim`, `klms` | No | `"klms"` | Choose the scheduler |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps for each image generated from the prompt |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `num_steps` | integer | No | `50` | Steps for generating the interpolation video. Recommended to set to 3 or 5 for testing, then up it to 60-200 for bett... |
| `fps` | integer | No | `15` | Frame rate for the video. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "nateraw/stable-diffusion-videos",
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

- Model page: https://replicate.com/nateraw/stable-diffusion-videos
- API page: https://replicate.com/nateraw/stable-diffusion-videos/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
