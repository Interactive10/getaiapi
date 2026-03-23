---
name: replicate-wan-video-wan-2.2-5b-fast
description: >
  Use this skill for the Replicate Wan 2.2 5B Fast model (wan-video/wan-2.2-5b-fast). Use the Wan 2.2 5B Fast model via Replicate API.
---

# Wan 2.2 5B Fast

**Model:** `wan-video/wan-2.2-5b-fast`
**Source:** https://replicate.com/wan-video/wan-2.2-5b-fast
**Version:** `c92ab4265c9b3b5ea9ac9a87df839ebfd662ee3a820d62c21305bf6501a73fe1`

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

const output = await replicate.run("wan-video/wan-2.2-5b-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.2-5b-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.2-5b-fast/predictions \
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
| `prompt` | string | **Yes** |  | Prompt for video generation |
| `image` | string (URL) | No |  | Input image to generate video from. |
| `num_frames` | integer | No | `121` | Number of video frames. 81 frames give the best results |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of video. 16:9 corresponds to 832x480px, and 9:16 is 480x832px |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of video. 16:9 corresponds to 832x480px, and 9:16 is 480x832px |
| `frames_per_second` | integer | No | `24` | Frames per second. Note that the pricing of this model is based on the video duration at 16 fps |
| `go_fast` | boolean | No | `true` | Go fast |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated video. |
| `sample_shift` | float | No | `12` | Sample shift factor |
| `seed` | integer | No |  | Random seed. Leave blank for random |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.2-5b-fast",
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

- Model page: https://replicate.com/wan-video/wan-2.2-5b-fast
- API page: https://replicate.com/wan-video/wan-2.2-5b-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
