---
name: replicate-openai-gpt-4o-transcribe
description: >
  Use this skill for the Replicate Gpt 4O Transcribe model (openai/gpt-4o-transcribe). Use the Gpt 4O Transcribe model via Replicate API.
---

# Gpt 4O Transcribe

**Model:** `openai/gpt-4o-transcribe`
**Source:** https://replicate.com/openai/gpt-4o-transcribe
**Version:** `cc7638666fc85e9defb010d99e304c0c0e94dcdbd3d31385f28f2730b4cdcc6d`

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

const output = await replicate.run("openai/gpt-4o-transcribe", {
  input: {
        "audio_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/gpt-4o-transcribe",
    input={
        "audio_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/gpt-4o-transcribe/predictions \
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
| `prompt` | string | No |  | An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio l... |
| `language` | string | No |  | The language of the input audio. Supplying the input language in ISO-639-1 (e.g. en) format will improve accuracy and... |
| `audio_file` | string (URL) | **Yes** |  | The audio file to transcribe. Supported formats: mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm |
| `temperature` | float | No | `0` | Sampling temperature between 0 and 1 |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/gpt-4o-transcribe",
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

- Model page: https://replicate.com/openai/gpt-4o-transcribe
- API page: https://replicate.com/openai/gpt-4o-transcribe/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
