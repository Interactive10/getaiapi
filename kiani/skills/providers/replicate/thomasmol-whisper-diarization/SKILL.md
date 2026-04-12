---
name: replicate-thomasmol-whisper-diarization
description: >
  Use this skill for the Replicate Whisper Diarization model (thomasmol/whisper-diarization). Use the Whisper Diarization model via Replicate API.
---

# Whisper Diarization

**Model:** `thomasmol/whisper-diarization`
**Source:** https://replicate.com/thomasmol/whisper-diarization
**Version:** `1495a9cddc83b2203b0d8d3516e38b80fd1572ebc4bc5700ac1da56a9b3ed886`

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

const output = await replicate.run("thomasmol/whisper-diarization", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("thomasmol/whisper-diarization",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/thomasmol/whisper-diarization/predictions \
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
| `file_string` | string | No |  | Either provide: Base64 encoded audio file, |
| `file_url` | string | No |  | Or provide: A direct audio file URL |
| `file` | string (URL) | No |  | Or an audio file |
| `group_segments` | boolean | No | `true` | Group segments of same speaker shorter apart than 2 seconds |
| `num_speakers` | integer | No |  | Number of speakers, leave empty to autodetect. |
| `translate` | boolean | No | `false` | Translate the speech into English. |
| `language` | string | No |  | Language of the spoken words as a language code like 'en'. Leave empty to auto detect language. |
| `prompt` | string | No |  | Vocabulary: provide names, acronyms and loanwords in a list. Use punctuation for best accuracy. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `language` | string |  |
| `segments` | list<any> |  |
| `num_speakers` | integer |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "thomasmol/whisper-diarization",
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

- Model page: https://replicate.com/thomasmol/whisper-diarization
- API page: https://replicate.com/thomasmol/whisper-diarization/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
