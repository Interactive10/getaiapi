---
name: replicate-lightricks-ltx-2.3-fast
description: >
  Use this skill for the Replicate Ltx 2.3 Fast model (lightricks/ltx-2.3-fast). Use the Ltx 2.3 Fast model via Replicate API.
---

# Ltx 2.3 Fast

**Model:** `lightricks/ltx-2.3-fast`
**Source:** https://replicate.com/lightricks/ltx-2.3-fast
**Version:** `6e44d7e6b51d045abf444dbac11bafd94a053a689b4529793ce997e0110e473e`

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

const output = await replicate.run("lightricks/ltx-2.3-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-2.3-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-2.3-fast/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt describing the video to generate |
| `image` | string (URL) | No |  | First frame image for image-to-video generation |
| `last_frame_image` | string (URL) | No |  | Last frame image for image-to-video generation. When provided, the video interpolates between the first frame and thi... |
| `resolution` | enum: `1080p`, `2k`, `4k` | No | `"1080p"` | Resolution quality of the generated video. Only 1080p is supported for audio_to_video, retake, and extend tasks. |
| `duration` | enum (8 values) | No | `6` | Duration of the video in seconds. Durations longer than 10 seconds are only available with 1080p resolution at 24 or ... |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of the generated video |
| `fps` | enum: `24`, `25`, `48`, `50` | No | `25` | Frame rate in frames per second |
| `camera_motion` | enum (9 values) | No | `"none"` | Camera motion effect to apply to the generated video. Use 'none' for no camera motion. |
| `generate_audio` | boolean | No | `true` | Generate audio for the video. Used for text_to_video and image_to_video tasks. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-2.3-fast",
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

- Model page: https://replicate.com/lightricks/ltx-2.3-fast
- API page: https://replicate.com/lightricks/ltx-2.3-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
