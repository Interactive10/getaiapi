---
name: replicate-luma-modify-video
description: >
  Use this skill for the Replicate Modify Video model (luma/modify-video). Use the Modify Video model via Replicate API.
---

# Modify Video

**Model:** `luma/modify-video`
**Source:** https://replicate.com/luma/modify-video
**Version:** `de2d85dcc392377a811cf6cda8f2b2b862548954363551b9cf27383ba04aed94`

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

const output = await replicate.run("luma/modify-video", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("luma/modify-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/luma/modify-video/predictions \
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
| `mode` | enum (9 values) | No | `"adhere_1"` | How closely the output should follow the source video. Adhere: very close, for subtle enhancements. Flex: allows more... |
| `video` | string (URL) | No |  | The video to modify. Maximum video size is 100mb. Maximum video duration is 30 seconds. |
| `prompt` | string | No |  | A prompt to guide the video modification |
| `video_url` | string | No |  | Deprecated: Use video instead. |
| `first_frame` | string (URL) | No |  | An optional first frame of the video to modify. This should be a modified version of the original first frame, it wil... |
| `first_frame_url` | string | No |  | Deprecated: Use first_frame instead. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "luma/modify-video",
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

- Model page: https://replicate.com/luma/modify-video
- API page: https://replicate.com/luma/modify-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
