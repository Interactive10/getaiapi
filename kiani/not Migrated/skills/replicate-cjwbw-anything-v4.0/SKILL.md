---
name: replicate-cjwbw-anything-v4.0
description: >
  Use this skill for the Replicate Anything V4.0 model (cjwbw/anything-v4.0). Use the Anything V4.0 model via Replicate API.
---

# Anything V4.0

**Model:** `cjwbw/anything-v4.0`
**Source:** https://replicate.com/cjwbw/anything-v4.0
**Version:** `42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061`

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

const output = await replicate.run("cjwbw/anything-v4.0", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/anything-v4.0",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/anything-v4.0/predictions \
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
| `prompt` | string | No | `"1boy, bishounen, casual, indoors, sitting, coffee shop, bokeh"` | Input prompt |
| `negative_prompt` | string | No |  | The prompt or prompts not to guide the image generation (what you do not want to see in the generation). Ignored when... |
| `width` | enum (8 values) | No | `512` | Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits |
| `height` | enum (8 values) | No | `512` | Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits |
| `num_outputs` | enum: `1`, `4` | No | `1` | Number of images to output |
| `num_inference_steps` | integer | No | `20` | Number of denoising steps |
| `guidance_scale` | float | No | `7` | Scale for classifier-free guidance |
| `scheduler` | enum: `DDIM`, `K_EULER`, `DPMSolverMultistep`, `K_EULER_ANCESTRAL`, `PNDM`, `KLMS` | No | `"DPMSolverMultistep"` | Choose a scheduler. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/anything-v4.0",
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

- Model page: https://replicate.com/cjwbw/anything-v4.0
- API page: https://replicate.com/cjwbw/anything-v4.0/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
