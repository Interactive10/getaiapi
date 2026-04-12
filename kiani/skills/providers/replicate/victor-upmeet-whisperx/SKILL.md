---
name: replicate-victor-upmeet-whisperx
description: >
  Use this skill for the Replicate Whisperx model (victor-upmeet/whisperx). Use the Whisperx model via Replicate API.
---

# Whisperx

**Model:** `victor-upmeet/whisperx`
**Source:** https://replicate.com/victor-upmeet/whisperx
**Version:** `84d2ad2d6194fe98a17d2b60bef1c7f910c46b2f6fd38996ca457afd9c8abfcb`

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

const output = await replicate.run("victor-upmeet/whisperx", {
  input: {
        "audio_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("victor-upmeet/whisperx",
    input={
        "audio_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/victor-upmeet/whisperx/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio_file": "your value here"}}'
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
| `audio_file` | string (URL) | **Yes** |  | Audio file |
| `language` | string | No |  | ISO code of the language spoken in the audio, specify None to perform language detection |
| `language_detection_min_prob` | float | No | `0` | If language is not specified, then the language will be detected recursively on different parts of the file until it ... |
| `language_detection_max_tries` | integer | No | `5` | If language is not specified, then the language will be detected following the logic of language_detection_min_prob p... |
| `initial_prompt` | string | No |  | Optional text to provide as a prompt for the first window |
| `batch_size` | integer | No | `64` | Parallelization of input audio transcription |
| `temperature` | float | No | `0` | Temperature to use for sampling |
| `vad_onset` | float | No | `0.5` | VAD onset |
| `vad_offset` | float | No | `0.363` | VAD offset |
| `align_output` | boolean | No | `false` | Aligns whisper output to get accurate word-level timestamps |
| `diarization` | boolean | No | `false` | Assign speaker ID labels |
| `huggingface_access_token` | string | No |  | To enable diarization, please enter your HuggingFace token (read). You need to accept the user agreement for the mode... |
| `min_speakers` | integer | No |  | Minimum number of speakers if diarization is activated (leave blank if unknown) |
| `max_speakers` | integer | No |  | Maximum number of speakers if diarization is activated (leave blank if unknown) |
| `debug` | boolean | No | `false` | Print out compute/inference times and memory usage information |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `segments` | Segments |  |
| `detected_language` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "victor-upmeet/whisperx",
  input: {
        "audio_file": "your value here"
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

- Model page: https://replicate.com/victor-upmeet/whisperx
- API page: https://replicate.com/victor-upmeet/whisperx/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
