---
name: replicate-lucataco-video-merge
description: >
  Use this skill for the Replicate Video Merge model (lucataco/video-merge). Use the Video Merge model via Replicate API.
---

# Video Merge

**Model:** `lucataco/video-merge`
**Source:** https://replicate.com/lucataco/video-merge
**Version:** `14273448a57117b5d424410e2e79700ecde6cc7d60bf522a769b9c7cf989eba7`

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

const output = await replicate.run("lucataco/video-merge", {
  input: {
        "video_files": []
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/video-merge",
    input={
        "video_files": []
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/video-merge/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video_files": []}}'
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
| `video_files` | list<string (URL)> | **Yes** |  | List of video files to concatenate |
| `keep_audio` | boolean | No | `true` | Whether to keep audio in the output video |
| `width` | integer | No | `0` | Output video width. If not specified, uses first video's width |
| `height` | integer | No | `0` | Output video height. If not specified, uses first video's height |
| `fps` | integer | No | `0` | Output video frame rate. If not specified, uses first video's fps |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/video-merge",
  input: {
        "video_files": []
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

- Model page: https://replicate.com/lucataco/video-merge
- API page: https://replicate.com/lucataco/video-merge/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
