---
name: replicate-zsxkib-dia
description: >
  Use this skill for the Replicate Dia model (zsxkib/dia). Use the Dia model via Replicate API.
---

# Dia

**Model:** `zsxkib/dia`
**Source:** https://replicate.com/zsxkib/dia
**Version:** `2119e338ca5c0dacd3def83158d6c80d431f2ac1024146d8cca9220b74385599`

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

const output = await replicate.run("zsxkib/dia", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/dia",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/dia/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "your value here"}}'
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
| `text` | string | **Yes** |  | Input text for dialogue generation. Use [S1], [S2] to indicate different speakers and (description) in parentheses fo... |
| `audio_prompt` | string (URL) | No |  | Optional audio file (.wav/.mp3/.flac) for voice cloning. The model will attempt to mimic this voice style. |
| `audio_prompt_text` | string | No |  | Optional transcript of the audio prompt. If provided, this will be prepended to the main text input. |
| `max_new_tokens` | integer | No | `3072` | Controls the length of generated audio. Higher values create longer audio. (86 tokens ≈ 1 second of audio). |
| `max_audio_prompt_seconds` | integer | No | `10` | Maximum duration in seconds for the input voice cloning audio prompt. Only used when an audio prompt is provided. Lon... |
| `cfg_scale` | float | No | `3` | Controls how closely the audio follows your text. Higher values (3-5) follow text more strictly; lower values may sou... |
| `temperature` | float | No | `1.8` | Controls randomness in generation. Higher values (1.3-2.0) increase variety; lower values make output more consistent... |
| `top_p` | float | No | `0.95` | Controls diversity of word choice. Higher values include more unusual options. Most users shouldn't need to adjust th... |
| `cfg_filter_top_k` | integer | No | `45` | Technical parameter for filtering audio generation tokens. Higher values allow more diverse sounds; lower values crea... |
| `speed_factor` | float | No | `1` | Adjusts playback speed of the generated audio. Values below 1.0 slow down the audio; 1.0 is original speed. |
| `seed` | integer | No |  | Random seed for reproducible results. Use the same seed value to get the same output for identical inputs. Leave blan... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/dia",
  input: {
        "text": "your value here"
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

- Model page: https://replicate.com/zsxkib/dia
- API page: https://replicate.com/zsxkib/dia/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
