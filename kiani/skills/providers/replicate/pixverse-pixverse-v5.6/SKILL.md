---
name: replicate-pixverse-pixverse-v5.6
description: >
  Use this skill for the Replicate Pixverse V5.6 model (pixverse/pixverse-v5.6). Use the Pixverse V5.6 model via Replicate API.
---

# Pixverse V5.6

**Model:** `pixverse/pixverse-v5.6`
**Source:** https://replicate.com/pixverse/pixverse-v5.6
**Version:** `716a21c01b88914165473824a15be03188a54c5830fac57d64de93919fcae0e9`

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

const output = await replicate.run("pixverse/pixverse-v5.6", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("pixverse/pixverse-v5.6",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/pixverse/pixverse-v5.6/predictions \
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
| `quality` | enum: `360p`, `540p`, `720p`, `1080p` | No | `"540p"` | Resolution of the video. Higher resolutions cost more. See pricing for details. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the video |
| `duration` | enum: `5`, `8`, `10` | No | `5` | Duration of the video in seconds. 10 second videos are only available for 360p, 540p, and 720p. |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements in the video |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `generate_audio_switch` | boolean | No | `false` | Enable AI-generated audio including BGM, SFX, and character dialogues |
| `thinking_type` | enum: `disabled`, `enabled`, `auto` | No | `"auto"` | Prompt reasoning enhancement. Controls whether the system enhances your prompt with internal reasoning and optimization. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "pixverse/pixverse-v5.6",
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

- Model page: https://replicate.com/pixverse/pixverse-v5.6
- API page: https://replicate.com/pixverse/pixverse-v5.6/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
