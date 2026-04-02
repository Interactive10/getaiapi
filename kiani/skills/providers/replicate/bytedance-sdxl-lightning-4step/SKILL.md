---
name: replicate-bytedance-sdxl-lightning-4step
description: >
  Use this skill for the Replicate Sdxl Lightning 4Step model (bytedance/sdxl-lightning-4step). Use the Sdxl Lightning 4Step model via Replicate API.
---

# Sdxl Lightning 4Step

**Model:** `bytedance/sdxl-lightning-4step`
**Source:** https://replicate.com/bytedance/sdxl-lightning-4step
**Version:** `6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe`

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

const output = await replicate.run("bytedance/sdxl-lightning-4step", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/sdxl-lightning-4step",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/sdxl-lightning-4step/predictions \
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
| `prompt` | string | No | `"self-portrait of a woman, lightning in the background"` | Input prompt |
| `negative_prompt` | string | No | `"worst quality, low quality"` | Negative Input prompt |
| `width` | integer | No | `1024` | Width of output image. Recommended 1024 or 1280 |
| `height` | integer | No | `1024` | Height of output image. Recommended 1024 or 1280 |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `scheduler` | enum (8 values) | No | `"K_EULER"` | scheduler |
| `num_inference_steps` | integer | No | `4` | Number of denoising steps. 4 for best results |
| `guidance_scale` | float | No | `0` | Scale for classifier-free guidance |
| `seed` | integer | No | `0` | Random seed. Leave blank to randomize the seed |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/sdxl-lightning-4step",
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

- Model page: https://replicate.com/bytedance/sdxl-lightning-4step
- API page: https://replicate.com/bytedance/sdxl-lightning-4step/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
