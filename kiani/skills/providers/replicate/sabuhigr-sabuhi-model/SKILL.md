---
name: replicate-sabuhigr-sabuhi-model
description: >
  Use this skill for the Replicate Sabuhi Model model (sabuhigr/sabuhi-model). Use the Sabuhi Model model via Replicate API.
---

# Sabuhi Model

**Model:** `sabuhigr/sabuhi-model`
**Source:** https://replicate.com/sabuhigr/sabuhi-model
**Version:** `29b6421db707f07d23fbb646c260b1e2754cbf7ccaf081435330a0c2a3544b74`

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

const output = await replicate.run("sabuhigr/sabuhi-model", {
  input: {
        "audio": "your value here",
        "hf_token": "your value here",
        "language": "af"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("sabuhigr/sabuhi-model",
    input={
        "audio": "your value here",
        "hf_token": "your value here",
        "language": "af"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sabuhigr/sabuhi-model/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here", "hf_token": "your value here", "language": "af"}}'
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
| `hf_token` | string | **Yes** |  | Your Hugging Face token for speaker diarization |
| `model` | enum: `large`, `large-v2` | No | `"large-v2"` | Choose a Whisper model. |
| `transcription` | enum: `plain text`, `srt`, `vtt` | No | `"plain text"` | Choose the format for the transcription |
| `translate` | boolean | No | `false` | Translate the text to English when set to True |
| `language` | enum (209 values) | **Yes** |  | language spoken in the audio, specify None to perform language detection |
| `temperature` | float | No | `0` | temperature to use for sampling |
| `patience` | float | No |  | optional patience value to use in beam decoding, as in https://arxiv.org/abs/2204.05424, the default (1.0) is equival... |
| `suppress_tokens` | string | No | `"-1"` | comma-separated list of token ids to suppress during sampling; '-1' will suppress most special characters except comm... |
| `initial_prompt` | string | No |  | optional text to provide as a prompt for the first window. |
| `condition_on_previous_text` | boolean | No | `true` | if True, provide the previous output of the model as a prompt for the next window; disabling may make the text incons... |
| `temperature_increment_on_fallback` | float | No | `0.2` | temperature to increase when falling back when the decoding fails to meet either of the thresholds below |
| `compression_ratio_threshold` | float | No | `2.4` | if the gzip compression ratio is higher than this value, treat the decoding as failed |
| `logprob_threshold` | float | No | `-1` | if the average log probability is lower than this value, treat the decoding as failed |
| `no_speech_threshold` | float | No | `0.6` | if the probability of the <\|nospeech\|> token is higher than this value AND the decoding has failed due to `logprob_... |
| `max_speakers` | enum: `1`, `2` | No | `1` | Select 2 if record is stereo, 1 if is mono.Default is 1 for mono records |
| `min_speakers` | enum: `1`, `2` | No | `1` | Select 2 if record is stereo, 1 if is mono.Default is 1 for mono records |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | Text |  |
| `segments` | Segments |  |
| `srt_file` | string (URL) |  |
| `txt_file` | string (URL) |  |
| `translation` | string |  |
| `transcription` | string |  |
| `detected_language` | string |  |
| `diarization_status` | boolean |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sabuhigr/sabuhi-model",
  input: {
        "audio": "your value here",
        "hf_token": "your value here",
        "language": "af"
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

- Model page: https://replicate.com/sabuhigr/sabuhi-model
- API page: https://replicate.com/sabuhigr/sabuhi-model/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
