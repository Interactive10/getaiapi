---
name: replicate-adidoes-whisperx-video-transcribe
description: >
  Use this skill for the Replicate Whisperx Video Transcribe model (adidoes/whisperx-video-transcribe). Use the Whisperx Video Transcribe model via Replicate API.
---

# Whisperx Video Transcribe

**Model:** `adidoes/whisperx-video-transcribe`
**Source:** https://replicate.com/adidoes/whisperx-video-transcribe
**Version:** `481284a2a2ff72a031689481ca92fb1d20b194980a4b435d93f6f4c9520fea61`

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

const output = await replicate.run("adidoes/whisperx-video-transcribe", {
  input: {
        "url": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("adidoes/whisperx-video-transcribe",
    input={
        "url": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/adidoes/whisperx-video-transcribe/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"url": "https://example.com/input.png"}}'
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
| `url` | string | **Yes** |  | Video URL. View supported sites https://dub.sh/supportedsites |
| `batch_size` | integer | No | `16` | Parallelization of input audio transcription |
| `debug` | boolean | No | `false` | Print out memory usage information. |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "adidoes/whisperx-video-transcribe",
  input: {
        "url": "https://example.com/input.png"
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

- Model page: https://replicate.com/adidoes/whisperx-video-transcribe
- API page: https://replicate.com/adidoes/whisperx-video-transcribe/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
