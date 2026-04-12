---
name: replicate-shreejalmaharjan-27-tiktok-short-captions
description: >
  Use this skill for the Replicate Tiktok Short Captions model (shreejalmaharjan-27/tiktok-short-captions). Use the Tiktok Short Captions model via Replicate API.
---

# Tiktok Short Captions

**Model:** `shreejalmaharjan-27/tiktok-short-captions`
**Source:** https://replicate.com/shreejalmaharjan-27/tiktok-short-captions
**Version:** `46bf1c12c77ad1782d6f87828d4d8ba4d48646b8e1271b490cb9e95ccdbc4504`

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

const output = await replicate.run("shreejalmaharjan-27/tiktok-short-captions", {
  input: {
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("shreejalmaharjan-27/tiktok-short-captions",
    input={
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/shreejalmaharjan-27/tiktok-short-captions/predictions \
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
| `video` | string (URL) | **Yes** |  | Video Path |
| `caption_size` | integer | No | `30` | The maximum number of words to generate in each window |
| `highlight_color` | string | No | `"#39E508"` | The color of the highlight for the captioned text |
| `model` | enum: `large-v3` | No | `"large-v3"` | Whisper model size (currently only large-v3 is supported). |
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

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "shreejalmaharjan-27/tiktok-short-captions",
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

- Model page: https://replicate.com/shreejalmaharjan-27/tiktok-short-captions
- API page: https://replicate.com/shreejalmaharjan-27/tiktok-short-captions/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
