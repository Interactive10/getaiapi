---
name: replicate-pixverse-pixverse-v4
description: >
  Use this skill for the Replicate Pixverse V4 model (pixverse/pixverse-v4). Use the Pixverse V4 model via Replicate API.
---

# Pixverse V4

**Model:** `pixverse/pixverse-v4`
**Source:** https://replicate.com/pixverse/pixverse-v4
**Version:** `5d3d7389baa4d420ce9aaa270a8b251b3923e778dee4c51e35f8e09d815c6b36`

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

const output = await replicate.run("pixverse/pixverse-v4", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("pixverse/pixverse-v4",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/pixverse/pixverse-v4/predictions \
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
| `image` | string (URL) | No |  | Image to use for the first frame of the video |
| `last_frame_image` | string (URL) | No |  | Use to generate a video that transitions from the first image to the last image. Must be used with image. |
| `quality` | enum: `360p`, `540p`, `720p`, `1080p` | No | `"540p"` | Resolution of the video. 360p and 540p cost the same, but 720p and 1080p cost more. See the README for details. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the video |
| `duration` | enum: `5`, `8` | No | `5` | Duration of the video in seconds. 8 second videos cost twice as much as 5 second videos. (1080p does not support 8 se... |
| `motion_mode` | enum: `normal`, `smooth` | No | `"normal"` | Motion mode for the video. Smooth videos generate more frames, so they cost twice as much. (smooth is only available ... |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements in the video |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `style` | enum: `None`, `anime`, `3d_animation`, `clay`, `cyberpunk`, `comic` | No | `"None"` | Style of the video |
| `effect` | enum (16 values) | No | `"None"` | Special effect to apply to the video. Does not work with last_frame_image. |
| `sound_effect_switch` | boolean | No | `false` | Enable background music or sound effects |
| `sound_effect_content` | string | No |  | Sound effect prompt. If not given, a random sound effect will be generated. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "pixverse/pixverse-v4",
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

- Model page: https://replicate.com/pixverse/pixverse-v4
- API page: https://replicate.com/pixverse/pixverse-v4/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
