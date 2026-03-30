---
name: replicate-luma-ray
description: >
  Use this skill for the Replicate Ray model (luma/ray). Use the Ray model via Replicate API.
---

# Ray

**Model:** `luma/ray`
**Source:** https://replicate.com/luma/ray
**Version:** `ace5984f3394f17c2a712644b0eb9983c4baaf94c6c30a0f94692d2c37bd8964`

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

const output = await replicate.run("luma/ray", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("luma/ray",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/luma/ray/predictions \
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
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio of the video. Ignored if a start frame, end frame or video ID is given. |
| `loop` | boolean | No | `false` | Whether the video should loop, with the last frame matching the first frame for smooth, continuous playback. This inp... |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `end_image` | string (URL) | No |  | An optional last frame of the video to use as the ending frame. |
| `start_image` | string (URL) | No |  | An optional first frame of the video to use as the starting frame. |
| `end_video_id` | string | No |  | Prepend a new video generation to the beginning of an existing one (Also called 'reverse extend'). You can combine th... |
| `end_image_url` | string | No |  | Deprecated: Use end_image instead |
| `start_video_id` | string | No |  | Continue or extend a video generation with a new generation. You can combine this with end_image, or end_video_id. |
| `start_image_url` | string | No |  | Deprecated: Use start_image instead |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "luma/ray",
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

- Model page: https://replicate.com/luma/ray
- API page: https://replicate.com/luma/ray/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
