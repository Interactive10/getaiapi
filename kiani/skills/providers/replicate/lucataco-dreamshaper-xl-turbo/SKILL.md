---
name: replicate-lucataco-dreamshaper-xl-turbo
description: >
  Use this skill for the Replicate Dreamshaper Xl Turbo model (lucataco/dreamshaper-xl-turbo). Use the Dreamshaper Xl Turbo model via Replicate API.
---

# Dreamshaper Xl Turbo

**Model:** `lucataco/dreamshaper-xl-turbo`
**Source:** https://replicate.com/lucataco/dreamshaper-xl-turbo
**Version:** `0a1710e0187b01a255302738ca0158ff02a22f4638679533e111082f9dd1b615`

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

const output = await replicate.run("lucataco/dreamshaper-xl-turbo", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/dreamshaper-xl-turbo",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/dreamshaper-xl-turbo/predictions \
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
| `prompt` | string | No | `"An astronaut riding a rainbow unicorn"` | Input prompt |
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `num_inference_steps` | integer | No | `6` | Number of denoising steps |
| `guidance_scale` | float | No | `2` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. This feature is only available through the API. See [https://replicate.c... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/dreamshaper-xl-turbo",
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

- Model page: https://replicate.com/lucataco/dreamshaper-xl-turbo
- API page: https://replicate.com/lucataco/dreamshaper-xl-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
