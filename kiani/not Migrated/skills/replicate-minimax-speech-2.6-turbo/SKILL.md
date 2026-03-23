---
name: replicate-minimax-speech-2.6-turbo
description: >
  Use this skill for the Replicate Speech 2.6 Turbo model (minimax/speech-2.6-turbo). Use the Speech 2.6 Turbo model via Replicate API.
---

# Speech 2.6 Turbo

**Model:** `minimax/speech-2.6-turbo`
**Source:** https://replicate.com/minimax/speech-2.6-turbo
**Version:** `24c0b2d2819faa5ce6eff09fc136c625e6e8c90e6f8a1cca75845f26fe9e1c4e`

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

const output = await replicate.run("minimax/speech-2.6-turbo", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/speech-2.6-turbo",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/speech-2.6-turbo/predictions \
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
| `emotion` | enum (10 values) | No | `"auto"` | Desired delivery style. Use auto to let MiniMax choose, or pick a specific emotion. |
| `sample_rate` | enum: `8000`, `16000`, `22050`, `24000`, `32000`, `44100` | No | `32000` | Audio sample rate in Hz. |
| `bitrate` | enum: `32000`, `64000`, `128000`, `256000` | No | `128000` | MP3 bitrate in bits per second. Only used when audio_format is mp3. |
| `audio_format` | enum: `mp3`, `wav`, `flac`, `pcm` | No | `"mp3"` | File format for the generated audio. Choose mp3 for general use, wav/flac for lossless, or pcm for raw bytes. |
| `channel` | enum: `mono`, `stereo` | No | `"mono"` | mono for 1 channel (default), stereo for 2 channels. |
| `language_boost` | enum (43 values) | No | `"None"` | Optional language hint. Choose Automatic to let MiniMax detect the language, or pick a specific locale. |
| `text` | string | **Yes** |  | Text to narrate (max 10,000 characters). Use markers like <#0.5#> to insert pauses in seconds. |
| `pitch` | integer | No | `0` | Semitone offset applied to the voice (−12 to +12). |
| `speed` | float | No | `1` | Speech speed multiplier (0.5–2.0). Lower is slower, higher is faster. |
| `volume` | float | No | `1` | Relative loudness. 1.0 is default MiniMax gain. Range 0–10. |
| `voice_id` | string | No | `"Wise_Woman"` | Voice to synthesize. Pick any MiniMax system voice or a voice_id returned by https://replicate.com/minimax/voice-clon... |
| `subtitle_enable` | boolean | No | `false` | Return MiniMax subtitle metadata with sentence timestamps (non-streaming only). |
| `english_normalization` | boolean | No | `false` | Improve number/date reading for English text (adds a small amount of latency). |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/speech-2.6-turbo",
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

- Model page: https://replicate.com/minimax/speech-2.6-turbo
- API page: https://replicate.com/minimax/speech-2.6-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
