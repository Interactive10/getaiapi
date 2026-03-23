---
name: replicate-lucataco-wan-2.1-1.3b-vid2vid
description: >
  Use this skill for the Replicate Wan 2.1 1.3B Vid2Vid model (lucataco/wan-2.1-1.3b-vid2vid). Use the Wan 2.1 1.3B Vid2Vid model via Replicate API.
---

# Wan 2.1 1.3B Vid2Vid

**Model:** `lucataco/wan-2.1-1.3b-vid2vid`
**Source:** https://replicate.com/lucataco/wan-2.1-1.3b-vid2vid
**Version:** `9349766527ed95fa6194dcca4cae3d497357e207025beb0b97fb0403420142b8`

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

const output = await replicate.run("lucataco/wan-2.1-1.3b-vid2vid", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/wan-2.1-1.3b-vid2vid",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/wan-2.1-1.3b-vid2vid/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt describing what you want to generate or modify |
| `negative_prompt` | string | No | `"low quality, blurry, distorted, disfigured, text, watermark"` | Negative prompt to specify what to avoid in the generation |
| `input_video` | string (URL) | No |  | Input video for video-to-video generation |
| `num_frames` | integer | No | `81` | Number of frames to generate in the output video |
| `frames_per_second` | integer | No | `16` | Number of frames per second in the output video |
| `denoising_strength` | float | No | `0.7` | Strength of denoising when using video-to-video mode. Higher values change more content. |
| `aspect_ratio` | enum: `832x480`, `480x832` | No | `"832x480"` | Aspect ratio for the output video |
| `num_inference_steps` | integer | No | `40` | Number of sampling steps (higher = better quality but slower) |
| `cfg_scale` | float | No | `6` | Classifier free guidance scale (higher values strengthen prompt adherence) |
| `seed` | integer | No |  | Random seed for reproducible results (leave blank for random) |
| `tiled` | boolean | No | `true` | Whether to use tiled sampling for better quality on larger videos |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/wan-2.1-1.3b-vid2vid",
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

- Model page: https://replicate.com/lucataco/wan-2.1-1.3b-vid2vid
- API page: https://replicate.com/lucataco/wan-2.1-1.3b-vid2vid/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
