---
name: replicate-platform-kit-mars5-tts
description: >
  Use this skill for the Replicate Mars5 Tts model (platform-kit/mars5-tts). Use the Mars5 Tts model via Replicate API.
---

# Mars5 Tts

**Model:** `platform-kit/mars5-tts`
**Source:** https://replicate.com/platform-kit/mars5-tts
**Version:** `6aed0f11f3ba7b13d59ab3228355e7b1ea943479673cc57e10e99ba766536811`

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

const output = await replicate.run("platform-kit/mars5-tts", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("platform-kit/mars5-tts",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/platform-kit/mars5-tts/predictions \
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
| `rep_penalty_window` | integer | No | `95` |  |
| `temperature` | float | No | `0.5` |  |
| `freq_penalty` | integer | No | `3` |  |
| `top_k` | integer | No | `95` |  |
| `text` | string | No | `"Hi there, I'm your new voice clone, powered by Mars5."` | Text to synthesize |
| `ref_audio_file` | string (URL) | No | `"https://replicate.delivery/pbxt/L9a6SelzU0B2DIWeNpkNR0CKForWSbkswoUP69L0NLjLswVV/voice_sample.wav"` | Reference audio file to clone from <= 10 seconds |
| `ref_audio_transcript` | string | No | `"Hi there. I'm your new voice clone. Try your best to upload quality audio."` | Text in the reference audio file |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "platform-kit/mars5-tts",
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

- Model page: https://replicate.com/platform-kit/mars5-tts
- API page: https://replicate.com/platform-kit/mars5-tts/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
