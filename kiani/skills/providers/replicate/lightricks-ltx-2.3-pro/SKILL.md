---
name: replicate-lightricks-ltx-2.3-pro
description: >
  Use this skill for the Replicate Ltx 2.3 Pro model (lightricks/ltx-2.3-pro). Use the Ltx 2.3 Pro model via Replicate API.
---

# Ltx 2.3 Pro

**Model:** `lightricks/ltx-2.3-pro`
**Source:** https://replicate.com/lightricks/ltx-2.3-pro
**Version:** `2560a82a0a6f2a7586087d51dc292c709248bcc10119160b9c54304f6ed64e85`

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

const output = await replicate.run("lightricks/ltx-2.3-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-2.3-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-2.3-pro/predictions \
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
| `task` | enum: `text_to_video`, `image_to_video`, `audio_to_video`, `retake`, `extend` | No | `"text_to_video"` | The generation task to perform |
| `prompt` | string | **Yes** |  | Text prompt describing the video to generate |
| `image` | string (URL) | No |  | First frame image for image-to-video generation |
| `last_frame_image` | string (URL) | No |  | Last frame image for image-to-video generation. When provided, the video interpolates between the first frame and thi... |
| `audio` | string (URL) | No |  | Input audio file for audio_to_video task |
| `video` | string (URL) | No |  | Input video for retake or extend tasks |
| `resolution` | enum: `1080p`, `2k`, `4k` | No | `"1080p"` | Resolution quality of the generated video. Only 1080p is supported for audio_to_video, retake, and extend tasks. |
| `duration` | enum: `6`, `8`, `10` | No | `6` | Duration of the video in seconds |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of the generated video |
| `fps` | enum: `24`, `25`, `48`, `50` | No | `25` | Frame rate in frames per second |
| `camera_motion` | enum (9 values) | No | `"none"` | Camera motion effect to apply to the generated video. Use 'none' for no camera motion. |
| `generate_audio` | boolean | No | `true` | Generate audio for the video. Used for text_to_video and image_to_video tasks. |
| `retake_start_time` | float | No | `0` | Start time in seconds of the section to edit. Used for retake task. |
| `retake_duration` | float | No | `2` | Duration in seconds of the section to edit. Must be at least 2 seconds. Used for retake task. |
| `retake_mode` | enum: `replace_audio`, `replace_video`, `replace_audio_and_video` | No | `"replace_audio_and_video"` | What to replace in the retake section. Used for retake task. |
| `extend_mode` | enum: `start`, `end` | No | `"end"` | Where to extend the video. Used for extend task. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-2.3-pro",
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

- Model page: https://replicate.com/lightricks/ltx-2.3-pro
- API page: https://replicate.com/lightricks/ltx-2.3-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
