---
name: replicate-lightricks-audio-to-video
description: >
  Use this skill for the Replicate Audio To Video model (lightricks/audio-to-video). Use the Audio To Video model via Replicate API.
---

# Audio To Video

**Model:** `lightricks/audio-to-video`
**Source:** https://replicate.com/lightricks/audio-to-video
**Version:** `208e8ab75e27c6927a276028436658e37683f6471da95a18facfcc539c92acf1`

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

const output = await replicate.run("lightricks/audio-to-video", {
  input: {
        "audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/audio-to-video",
    input={
        "audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/audio-to-video/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here"}}'
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
| `audio` | string (URL) | **Yes** |  | Audio file to be used as the soundtrack for the video. Supported formats: wav, mp3, flac, ogg, m4a. |
| `image` | string (URL) | No |  | Input image to be used as the first frame of the video. Required if prompt is not provided. |
| `prompt` | string | No | `""` | Text description of how the video should be generated. Required if image is not provided. If image is provided, this ... |
| `guidance_scale` | float | No |  | Guidance scale (CFG) for video generation. Higher values make the output more closely follow the prompt but may reduc... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/audio-to-video",
  input: {
        "audio": "your value here"
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

- Model page: https://replicate.com/lightricks/audio-to-video
- API page: https://replicate.com/lightricks/audio-to-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
