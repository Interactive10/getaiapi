---
name: replicate-lightricks-ltx-video-0.9.7
description: >
  Use this skill for the Replicate Ltx Video 0.9.7 model (lightricks/ltx-video-0.9.7). Use the Ltx Video 0.9.7 model via Replicate API.
---

# Ltx Video 0.9.7

**Model:** `lightricks/ltx-video-0.9.7`
**Source:** https://replicate.com/lightricks/ltx-video-0.9.7
**Version:** `b1a80c6dbce390c23bb52aecebc0e09d445ac12136dd4dc539350c76030fc815`

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

const output = await replicate.run("lightricks/ltx-video-0.9.7", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-video-0.9.7",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-video-0.9.7/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `image` | string (URL) | No |  | Input image for image-to-video generation. If not provided, text-to-video generation will be used. |
| `negative_prompt` | string | No | `"worst quality, inconsistent motion, blurry, jittery, distorted"` | Negative prompt for video generation. |
| `width` | integer | No | `704` | Width of the output video. Actual width will be a multiple of 32. |
| `height` | integer | No | `480` | Height of the output video. Actual height will be a multiple of 32. |
| `num_frames` | integer | No | `161` | Number of frames to generate. Actual frame count will be 8N+1 (e.g., 9, 17, 25, 161). |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps. |
| `guidance_scale` | float | No | `3` | Guidance scale. Recommended range: 3.0-3.5. |
| `fps` | integer | No | `24` | Frames per second for the output video. |
| `seed` | integer | No |  | Random seed for reproducible results. Leave blank for a random seed. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-video-0.9.7",
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

- Model page: https://replicate.com/lightricks/ltx-video-0.9.7
- API page: https://replicate.com/lightricks/ltx-video-0.9.7/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
