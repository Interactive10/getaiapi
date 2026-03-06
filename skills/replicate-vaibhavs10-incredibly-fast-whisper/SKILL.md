---
name: replicate-vaibhavs10-incredibly-fast-whisper
description: >
  Use this skill for the Replicate Incredibly Fast Whisper model (vaibhavs10/incredibly-fast-whisper). Use the Incredibly Fast Whisper model via Replicate API.
---

# Incredibly Fast Whisper

**Model:** `vaibhavs10/incredibly-fast-whisper`
**Source:** https://replicate.com/vaibhavs10/incredibly-fast-whisper
**Version:** `3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c`

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

const output = await replicate.run("vaibhavs10/incredibly-fast-whisper", {
  input: {
        "audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("vaibhavs10/incredibly-fast-whisper",
    input={
        "audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/vaibhavs10/incredibly-fast-whisper/predictions \
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
| `task` | enum: `transcribe`, `translate` | No | `"transcribe"` | Task to perform: transcribe or translate to another language. |
| `language` | enum (101 values) | No | `"None"` | Language spoken in the audio, specify 'None' to perform language detection. |
| `batch_size` | integer | No | `24` | Number of parallel batches you want to compute. Reduce if you face OOMs. |
| `timestamp` | enum: `chunk`, `word` | No | `"chunk"` | Whisper supports both chunked as well as word level timestamps. |
| `diarise_audio` | boolean | No | `false` | Use Pyannote.audio to diarise the audio clips. You will need to provide hf_token below too. |
| `hf_token` | string | No |  | Provide a hf.co/settings/token for Pyannote.audio to diarise the audio clips. You need to agree to the terms in 'http... |

---

## Output Schema

**Type:** Output
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "vaibhavs10/incredibly-fast-whisper",
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

- Model page: https://replicate.com/vaibhavs10/incredibly-fast-whisper
- API page: https://replicate.com/vaibhavs10/incredibly-fast-whisper/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
