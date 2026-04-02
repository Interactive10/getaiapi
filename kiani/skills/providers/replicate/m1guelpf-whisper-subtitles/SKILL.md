---
name: replicate-m1guelpf-whisper-subtitles
description: >
  Use this skill for the Replicate Whisper Subtitles model (m1guelpf/whisper-subtitles). Use the Whisper Subtitles model via Replicate API.
---

# Whisper Subtitles

**Model:** `m1guelpf/whisper-subtitles`
**Source:** https://replicate.com/m1guelpf/whisper-subtitles
**Version:** `7f686e243a96c7f6f0f481bcef24d688a1369ed3983cea348d1f43b879615766`

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

const output = await replicate.run("m1guelpf/whisper-subtitles", {
  input: {
        "audio_path": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("m1guelpf/whisper-subtitles",
    input={
        "audio_path": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/m1guelpf/whisper-subtitles/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio_path": "your value here"}}'
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
| `audio_path` | string (URL) | **Yes** |  | Audio file to transcribe |
| `model_name` | enum (9 values) | No | `"base"` | Name of the Whisper model to use. |
| `format` | enum: `srt`, `vtt` | No | `"vtt"` | Whether to generate subtitles on the SRT or VTT format. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string |  |
| `language` | string |  |
| `subtitles` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "m1guelpf/whisper-subtitles",
  input: {
        "audio_path": "your value here"
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

- Model page: https://replicate.com/m1guelpf/whisper-subtitles
- API page: https://replicate.com/m1guelpf/whisper-subtitles/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
