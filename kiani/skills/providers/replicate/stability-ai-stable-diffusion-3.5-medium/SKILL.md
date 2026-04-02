---
name: replicate-stability-ai-stable-diffusion-3.5-medium
description: >
  Use this skill for the Replicate Stable Diffusion 3.5 Medium model (stability-ai/stable-diffusion-3.5-medium). Use the Stable Diffusion 3.5 Medium model via Replicate API.
---

# Stable Diffusion 3.5 Medium

**Model:** `stability-ai/stable-diffusion-3.5-medium`
**Source:** https://replicate.com/stability-ai/stable-diffusion-3.5-medium
**Version:** `1323a3a68cbf2b58c708f38fba9557e39d68a77cb287a8d7372ba0443f6f0767`

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

const output = await replicate.run("stability-ai/stable-diffusion-3.5-medium", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("stability-ai/stable-diffusion-3.5-medium",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/stability-ai/stable-diffusion-3.5-medium/predictions \
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
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | The aspect ratio of your output image. This value is ignored if you are using an input image. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `cfg` | float | No | `5` | The guidance scale tells the model how similar the output should be to the prompt. |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |
| `image` | string (URL) | No |  | Input image for image to image mode. The aspect ratio of your output will match this image. |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `negative_prompt` | string | No |  | What you do not want to see in the image |
| `prompt_strength` | float | No | `0.85` | Prompt strength (or denoising strength) when using image to image. 1.0 corresponds to full destruction of information... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "stability-ai/stable-diffusion-3.5-medium",
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

- Model page: https://replicate.com/stability-ai/stable-diffusion-3.5-medium
- API page: https://replicate.com/stability-ai/stable-diffusion-3.5-medium/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
