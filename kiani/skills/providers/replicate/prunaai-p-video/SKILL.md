---
name: replicate-prunaai-p-video
description: >
  Use this skill for the Replicate P Video model (prunaai/p-video). Use the P Video model via Replicate API.
---

# P Video

**Model:** `prunaai/p-video`
**Source:** https://replicate.com/prunaai/p-video
**Version:** `4aa2a9ec40e9120789840846ca890a6e3466ba54af89e15de1cb09a63f0eed0d`

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

const output = await replicate.run("prunaai/p-video", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/p-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/p-video/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation. |
| `image` | string (URL) | No |  | Input image to generate video from (image-to-video). Supports jpg, jpeg, png, webp. |
| `audio` | string (URL) | No |  | Input audio to condition video generation. Supports flac, mp3, wav. |
| `duration` | integer | No | `5` | Duration of the video in seconds (1-10). Ignored when audio is provided. |
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio of the video. Ignored when an input image is provided. |
| `resolution` | enum: `720p`, `1080p` | No | `"720p"` | Resolution of the video. |
| `fps` | enum: `24`, `48` | No | `24` | Frames per second of the video. |
| `draft` | boolean | No | `false` | Draft mode. Generates a lower-quality preview of the video. |
| `prompt_upsampling` | boolean | No | `true` | Use prompt upsampling to enhance the prompt. |
| `disable_safety_filter` | boolean | No | `true` | Disable safety filter for prompts (and input image). When disabled, prompts are not checked for unsafe content before... |
| `save_audio` | boolean | No | `true` | Save the video with audio. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/p-video",
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

- Model page: https://replicate.com/prunaai/p-video
- API page: https://replicate.com/prunaai/p-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
