---
name: replicate-meronym-speaker-transcription
description: >
  Use this skill for the Replicate Speaker Transcription model (meronym/speaker-transcription). Use the Speaker Transcription model via Replicate API.
---

# Speaker Transcription

**Model:** `meronym/speaker-transcription`
**Source:** https://replicate.com/meronym/speaker-transcription
**Version:** `9950ee297f0fdad8736adf74ada54f63cc5b5bdfd5b2187366910ed5baf1a7a1`

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

const output = await replicate.run("meronym/speaker-transcription", {
  input: {
        "audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("meronym/speaker-transcription",
    input={
        "audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/meronym/speaker-transcription/predictions \
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
| `audio` | string (URL) | **Yes** |  | Audio file |
| `prompt` | string | No |  | Optional text to provide as a prompt for each Whisper model call. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "meronym/speaker-transcription",
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

- Model page: https://replicate.com/meronym/speaker-transcription
- API page: https://replicate.com/meronym/speaker-transcription/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
