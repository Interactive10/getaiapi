---
name: replicate-rafaelgalle-whisper-diarization-advanced
description: >
  Use this skill for the Replicate Whisper Diarization Advanced model (rafaelgalle/whisper-diarization-advanced). Use the Whisper Diarization Advanced model via Replicate API.
---

# Whisper Diarization Advanced

**Model:** `rafaelgalle/whisper-diarization-advanced`
**Source:** https://replicate.com/rafaelgalle/whisper-diarization-advanced
**Version:** `56dcb55b658e0cb096d663aca0c44bac1466f3acf4304f8ff35af555dc43c9c9`

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

const output = await replicate.run("rafaelgalle/whisper-diarization-advanced", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("rafaelgalle/whisper-diarization-advanced",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/rafaelgalle/whisper-diarization-advanced/predictions \
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
| `prompt` | string | No |  | Names/acronyms, separated by punctuation |
| `file_url` | string | No |  | Direct URL |
| `language` | string | No |  | Language code like 'en', 'pt' |
| `file_path` | string (URL) | No |  | Audio file |
| `translate` | boolean | No | `false` | Translate to English |
| `preprocess` | integer | No | `0` | 0=None, 1=Sanitize, 2=+Filter, 3=+ReduceNoise, 4=+Normalize |
| `stationary` | boolean | No | `true` |  |
| `file_string` | string | No |  | Base64 audio |
| `target_dBFS` | float | No | `-18` |  |
| `lowpass_freq` | integer | No | `8000` |  |
| `num_speakers` | integer | No |  | Leave empty to autodetect |
| `highpass_freq` | integer | No | `45` |  |
| `prop_decrease` | float | No | `0.3` |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `metrics` | Metrics |  |
| `language` | string |  |
| `segments` | list<any> |  |
| `num_speakers` | integer |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "rafaelgalle/whisper-diarization-advanced",
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

- Model page: https://replicate.com/rafaelgalle/whisper-diarization-advanced
- API page: https://replicate.com/rafaelgalle/whisper-diarization-advanced/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
