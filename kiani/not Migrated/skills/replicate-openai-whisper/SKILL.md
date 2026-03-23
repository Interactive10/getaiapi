---
name: replicate-openai-whisper
description: >
  Use this skill for the Replicate Whisper model (openai/whisper). Use the Whisper model via Replicate API.
---

# Whisper

**Model:** `openai/whisper`
**Source:** https://replicate.com/openai/whisper
**Version:** `8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e`

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

const output = await replicate.run("openai/whisper", {
  input: {
        "audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/whisper",
    input={
        "audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/whisper/predictions \
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
| `transcription` | enum: `plain text`, `srt`, `vtt` | No | `"plain text"` | Choose the format for the transcription |
| `translate` | boolean | No | `false` | Translate the text to English when set to True |
| `language` | enum (213 values) | No | `"auto"` | Language spoken in the audio, specify 'auto' for automatic language detection |
| `temperature` | float | No | `0` | temperature to use for sampling |
| `patience` | float | No |  | optional patience value to use in beam decoding, as in https://arxiv.org/abs/2204.05424, the default (1.0) is equival... |
| `suppress_tokens` | string | No | `"-1"` | comma-separated list of token ids to suppress during sampling; '-1' will suppress most special characters except comm... |
| `initial_prompt` | string | No |  | optional text to provide as a prompt for the first window. |
| `condition_on_previous_text` | boolean | No | `true` | if True, provide the previous output of the model as a prompt for the next window; disabling may make the text incons... |
| `temperature_increment_on_fallback` | float | No | `0.2` | temperature to increase when falling back when the decoding fails to meet either of the thresholds below |
| `compression_ratio_threshold` | float | No | `2.4` | if the gzip compression ratio is higher than this value, treat the decoding as failed |
| `logprob_threshold` | float | No | `-1` | if the average log probability is lower than this value, treat the decoding as failed |
| `no_speech_threshold` | float | No | `0.6` | if the probability of the <\|nospeech\|> token is higher than this value AND the decoding has failed due to `logprob_... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `segments` | Segments |  |
| `srt_file` | string (URL) |  |
| `txt_file` | string (URL) |  |
| `translation` | string |  |
| `transcription` | string |  |
| `detected_language` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/whisper",
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

- Model page: https://replicate.com/openai/whisper
- API page: https://replicate.com/openai/whisper/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
