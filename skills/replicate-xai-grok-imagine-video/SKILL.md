---
name: replicate-xai-grok-imagine-video
description: >
  Use this skill for the Replicate Grok Imagine Video model (xai/grok-imagine-video). Use the Grok Imagine Video model via Replicate API.
---

# Grok Imagine Video

**Model:** `xai/grok-imagine-video`
**Source:** https://replicate.com/xai/grok-imagine-video
**Version:** `ee86ec3a213afbf7782408ca5377d90a3d36d9909ab380a603dfabd4859c8c6a`

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

const output = await replicate.run("xai/grok-imagine-video", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("xai/grok-imagine-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/xai/grok-imagine-video/predictions \
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
| `image` | string (URL) | No |  | Input image to generate video from (image-to-video). Supports jpg, jpeg, png, webp. |
| `video` | string (URL) | No |  | Input video to edit (video editing mode). Must be a direct link, max 8.7 seconds. Supports mp4, mov, webm. |
| `duration` | integer | No | `5` | Duration of the video in seconds (1-15). Ignored when editing a video. |
| `aspect_ratio` | enum (8 values) | No | `"auto"` | Aspect ratio of the video. For text-to-video, defaults to 16:9. For image-to-video, defaults to the input image's nat... |
| `resolution` | enum: `720p`, `480p` | No | `"720p"` | Resolution of the video. Ignored when editing a video. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "xai/grok-imagine-video",
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

- Model page: https://replicate.com/xai/grok-imagine-video
- API page: https://replicate.com/xai/grok-imagine-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
