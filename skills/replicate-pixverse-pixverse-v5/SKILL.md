---
name: replicate-pixverse-pixverse-v5
description: >
  Use this skill for the Replicate Pixverse V5 model (pixverse/pixverse-v5). Use the Pixverse V5 model via Replicate API.
---

# Pixverse V5

**Model:** `pixverse/pixverse-v5`
**Source:** https://replicate.com/pixverse/pixverse-v5
**Version:** `450181c56fcbf920d8d5ba9d7c5653537a009b626652c1a0a909924a785e3389`

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

const output = await replicate.run("pixverse/pixverse-v5", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("pixverse/pixverse-v5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/pixverse/pixverse-v5/predictions \
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
| `quality` | enum: `360p`, `540p`, `720p`, `1080p` | No | `"540p"` | Resolution of the video. 360p and 540p cost the same, but 720p and 1080p cost more. V5 supports 1080p with 8 second d... |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the video |
| `duration` | enum: `5`, `8` | No | `5` | Duration of the video in seconds. 8 second videos cost twice as much as 5 second videos. V5 supports 1080p with 8 sec... |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements in the video |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `effect` | enum (16 values) | No | `"None"` | Special effect to apply to the video. V5 supports effects. Does not work with last_frame_image. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "pixverse/pixverse-v5",
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

- Model page: https://replicate.com/pixverse/pixverse-v5
- API page: https://replicate.com/pixverse/pixverse-v5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
