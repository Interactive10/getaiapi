---
name: replicate-awerks-whisperx
description: >
  Use this skill for the Replicate Whisperx model (awerks/whisperx). Use the Whisperx model via Replicate API.
---

# Whisperx

**Model:** `awerks/whisperx`
**Source:** https://replicate.com/awerks/whisperx
**Version:** `8546c72072508102e7c5c3ca73ed05f48ccb910248717db0db1326df90d09ba5`

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

const output = await replicate.run("awerks/whisperx", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("awerks/whisperx",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/awerks/whisperx/predictions \
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
| `audio_file` | string (URL) | No |  | Audio file (Input option #1) |
| `audio_url` | string | No |  | Direct audio url. (Input option #2) |
| `file_extension` | string | No | `".wav"` | Extension of the audio file (if audio_url is used) |
| `batch_size` | integer | No | `32` | Parallelization of input audio transcription |
| `task` | string | No | `"transcribe"` | Task: transcribe or translate |
| `language` | string | No |  | Original language of the audio (reduces hallucinations). Leave empty to detect automatically |
| `only_text` | boolean | No | `false` | Set if you only want to return text; otherwise, segment metadata will be returned as well. |
| `align_output` | boolean | No | `false` | Use if you need word-level timing and not just batched transcription |
| `diarize` | boolean | No | `false` | Diarize the result |
| `debug` | boolean | No | `false` | Debugging purposes |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "awerks/whisperx",
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

- Model page: https://replicate.com/awerks/whisperx
- API page: https://replicate.com/awerks/whisperx/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
