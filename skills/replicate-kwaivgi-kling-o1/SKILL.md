---
name: replicate-kwaivgi-kling-o1
description: >
  Use this skill for the Replicate Kling O1 model (kwaivgi/kling-o1). Use the Kling O1 model via Replicate API.
---

# Kling O1

**Model:** `kwaivgi/kling-o1`
**Source:** https://replicate.com/kwaivgi/kling-o1
**Version:** `6d5f2d4becc7f734d190d17f13f776229c359cafc1c1898d78945e8d87c57538`

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

const output = await replicate.run("kwaivgi/kling-o1", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-o1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-o1/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation. Can include references like <<<image_1>>>, <<<video_1>>> to reference inputs. |
| `start_image` | string (URL) | No |  | First frame image for the video. Supports .jpg/.jpeg/.png, max 10MB. |
| `end_image` | string (URL) | No |  | Last frame image for the video. Requires start_image to be set. Supports .jpg/.jpeg/.png, max 10MB. |
| `reference_images` | list<string (URL)> | No |  | Reference images for elements, scenes, or styles (up to 7 without video, 4 with video). Supports .jpg/.jpeg/.png. |
| `reference_video` | string (URL) | No |  | Reference video for style, camera movement, or as base for editing. Supports .mp4/.mov, 3-10s duration, max 200MB. |
| `video_reference_type` | enum: `feature`, `base` | No | `"feature"` | How to use the reference video: 'feature' for style/camera reference, 'base' for video editing. |
| `keep_original_sound` | boolean | No | `true` | Whether to keep the original sound from the reference video. |
| `mode` | enum: `std`, `pro` | No | `"pro"` | Video generation mode. 'std' is cost-effective, 'pro' has higher quality. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the generated video. Required for text-to-video. Ignored when using first frame image or video editing. |
| `duration` | enum (8 values) | No | `5` | Video duration in seconds. For text/image-to-video: 5 or 10. With video reference (feature type): 3-10. Ignored for v... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "kwaivgi/kling-o1",
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

- Model page: https://replicate.com/kwaivgi/kling-o1
- API page: https://replicate.com/kwaivgi/kling-o1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
