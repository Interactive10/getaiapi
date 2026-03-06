---
name: replicate-wan-video-wan-2.2-i2v-a14b
description: >
  Use this skill for the Replicate Wan 2.2 I2V A14B model (wan-video/wan-2.2-i2v-a14b). Use the Wan 2.2 I2V A14B model via Replicate API.
---

# Wan 2.2 I2V A14B

**Model:** `wan-video/wan-2.2-i2v-a14b`
**Source:** https://replicate.com/wan-video/wan-2.2-i2v-a14b
**Version:** `2c62e0842338726c74ad99a3c469255ce3f4c1f66ee000c265451b87754ac0c9`

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

const output = await replicate.run("wan-video/wan-2.2-i2v-a14b", {
  input: {
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.2-i2v-a14b",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.2-i2v-a14b/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `image` | string (URL) | **Yes** |  | Input image to generate video from. |
| `go_fast` | boolean | No | `false` | Go fast |
| `num_frames` | integer | No | `81` | Number of video frames. 81 frames give the best results |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of video. 832x480px corresponds to 16:9 aspect ratio, and 480x832px is 9:16 |
| `frames_per_second` | integer | No | `16` | Frames per second. Note that the pricing of this model is based on the video duration at 16 fps |
| `sample_steps` | integer | No | `40` | Number of generation steps. Fewer steps means faster generation, at the expensive of output quality. 30 steps is suff... |
| `sample_shift` | float | No | `5` | Sample shift factor |
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
  model: "wan-video/wan-2.2-i2v-a14b",
  input: {
        "image": "https://example.com/input.png",
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

- Model page: https://replicate.com/wan-video/wan-2.2-i2v-a14b
- API page: https://replicate.com/wan-video/wan-2.2-i2v-a14b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
