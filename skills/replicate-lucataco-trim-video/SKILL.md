---
name: replicate-lucataco-trim-video
description: >
  Use this skill for the Replicate Trim Video model (lucataco/trim-video). Use the Trim Video model via Replicate API.
---

# Trim Video

**Model:** `lucataco/trim-video`
**Source:** https://replicate.com/lucataco/trim-video
**Version:** `a58ed80215326cba0a80c77a11dd0d0968c567388228891b3c5c67de2a8d10cb`

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

const output = await replicate.run("lucataco/trim-video", {
  input: {
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/trim-video",
    input={
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/trim-video/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png"}}'
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
| `video` | string (URL) | **Yes** |  | Input video file to trim |
| `start_time` | string | No | `"00:00:00"` | Start time for trimming (format: HH:MM:SS or MM:SS or seconds) |
| `end_time` | string | No |  | End time for trimming (format: HH:MM:SS or MM:SS or seconds). If not specified, uses duration instead. |
| `duration` | string | No |  | Duration to trim from start time (format: HH:MM:SS or MM:SS or seconds). Ignored if end_time is specified. |
| `output_format` | enum: `mp4`, `mov`, `avi`, `mkv`, `webm` | No | `"mp4"` | Output video format |
| `quality` | enum (9 values) | No | `"medium"` | Video quality preset |
| `remove_audio` | boolean | No | `false` | Remove audio track from output video |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/trim-video",
  input: {
        "video": "https://example.com/input.png"
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

- Model page: https://replicate.com/lucataco/trim-video
- API page: https://replicate.com/lucataco/trim-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
