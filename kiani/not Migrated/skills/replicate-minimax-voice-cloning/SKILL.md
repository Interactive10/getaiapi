---
name: replicate-minimax-voice-cloning
description: >
  Use this skill for the Replicate Voice Cloning model (minimax/voice-cloning). Use the Voice Cloning model via Replicate API.
---

# Voice Cloning

**Model:** `minimax/voice-cloning`
**Source:** https://replicate.com/minimax/voice-cloning
**Version:** `fff8a670880f066d3742838515a88f7f0a3ae40a4f2e06dae0f7f70ba63582d7`

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

const output = await replicate.run("minimax/voice-cloning", {
  input: {
        "voice_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/voice-cloning",
    input={
        "voice_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/voice-cloning/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"voice_file": "your value here"}}'
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
| `model` | enum: `speech-2.6-turbo`, `speech-2.6-hd`, `speech-02-turbo`, `speech-02-hd` | No | `"speech-02-turbo"` | The text-to-speech model to train |
| `accuracy` | float | No | `0.7` | Text validation accuracy threshold (0-1) |
| `voice_file` | string (URL) | **Yes** |  | Voice file to clone. Must be MP3, M4A, or WAV format, 10s to 5min duration, and less than 20MB. |
| `need_noise_reduction` | boolean | No | `false` | Enable noise reduction. Use this if the voice file has background noise. |
| `need_volume_normalization` | boolean | No | `false` | Enable volume normalization |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model` | string |  |
| `preview` | string (URL) |  |
| `voice_id` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/voice-cloning",
  input: {
        "voice_file": "your value here"
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

- Model page: https://replicate.com/minimax/voice-cloning
- API page: https://replicate.com/minimax/voice-cloning/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
