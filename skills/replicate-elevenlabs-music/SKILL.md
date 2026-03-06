---
name: replicate-elevenlabs-music
description: >
  Use this skill for the Replicate Music model (elevenlabs/music). Use the Music model via Replicate API.
---

# Music

**Model:** `elevenlabs/music`
**Source:** https://replicate.com/elevenlabs/music
**Version:** `66fa53d463ca3a0fd826c06b5b44804b32f74185c0c905162bb052c3a60a39fa`

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

const output = await replicate.run("elevenlabs/music", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("elevenlabs/music",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/elevenlabs/music/predictions \
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
| `output_format` | enum: `mp3_standard`, `mp3_high_quality`, `wav_16khz`, `wav_22khz`, `wav_24khz`, `wav_cd_quality` | No | `"mp3_standard"` | Audio output format: mp3_standard (128kbps MP3, balanced quality/size), mp3_high_quality (192kbps MP3, higher quality... |
| `prompt` | string | **Yes** |  | Description of the music you want to generate |
| `music_length_ms` | integer | No | `10000` | Target duration of the music in milliseconds (optional, defaults to ~10 seconds) |
| `force_instrumental` | boolean | No | `true` | If true, removes vocal elements from the generated music |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "elevenlabs/music",
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

- Model page: https://replicate.com/elevenlabs/music
- API page: https://replicate.com/elevenlabs/music/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
