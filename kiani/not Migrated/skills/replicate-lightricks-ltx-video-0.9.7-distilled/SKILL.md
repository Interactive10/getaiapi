---
name: replicate-lightricks-ltx-video-0.9.7-distilled
description: >
  Use this skill for the Replicate Ltx Video 0.9.7 Distilled model (lightricks/ltx-video-0.9.7-distilled). Use the Ltx Video 0.9.7 Distilled model via Replicate API.
---

# Ltx Video 0.9.7 Distilled

**Model:** `lightricks/ltx-video-0.9.7-distilled`
**Source:** https://replicate.com/lightricks/ltx-video-0.9.7-distilled
**Version:** `e7f2778ec419047c564a6620b2d9bf7d6c64673411bf2ae13e628ee2b2c0b5b1`

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

const output = await replicate.run("lightricks/ltx-video-0.9.7-distilled", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-video-0.9.7-distilled",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-video-0.9.7-distilled/predictions \
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
| `image` | string (URL) | No |  | Input image for image-to-video generation. If provided, will generate video from this image. |
| `video` | string (URL) | No |  | Input video for video-to-video generation. If provided, will generate video from this video. Takes precedence over im... |
| `negative_prompt` | string | No | `"worst quality, inconsistent motion, blurry, jittery, distorted"` | Negative prompt for video generation. |
| `resolution` | enum: `480`, `720` | No | `720` | Resolution for the output video (height in pixels). |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16`, `match_input_image` | No | `"match_input_image"` | Aspect ratio for the output video. |
| `num_frames` | integer | No | `121` | Number of frames to generate. |
| `num_inference_steps` | integer | No | `24` | Number of denoising steps for initial generation. |
| `guidance_scale` | float | No | `3` | Guidance scale. Recommended range: 3.0-3.5. |
| `fps` | integer | No | `24` | Frames per second for the output video. |
| `seed` | integer | No |  | Random seed for reproducible results. Leave blank for a random seed. |
| `downscale_factor` | float | No | `0.667` | Factor to downscale initial generation (recommended: 2/3 for better quality). |
| `denoise_strength` | float | No | `0.4` | Denoising strength for final refinement step. |
| `final_inference_steps` | integer | No | `10` | Number of inference steps for final denoising. |
| `conditioning_frames` | integer | No | `21` | Number of frames to use for video-to-video conditioning (only used when video input is provided). |
| `go_fast` | boolean | No | `true` | Enable fast mode with skip layer strategies (20-40% faster but slightly lower quality). |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-video-0.9.7-distilled",
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

- Model page: https://replicate.com/lightricks/ltx-video-0.9.7-distilled
- API page: https://replicate.com/lightricks/ltx-video-0.9.7-distilled/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
