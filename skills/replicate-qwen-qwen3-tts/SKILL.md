---
name: replicate-qwen-qwen3-tts
description: >
  Use this skill for the Replicate Qwen3 Tts model (qwen/qwen3-tts). Use the Qwen3 Tts model via Replicate API.
---

# Qwen3 Tts

**Model:** `qwen/qwen3-tts`
**Source:** https://replicate.com/qwen/qwen3-tts
**Version:** `501be1210291d541fb5656bbe4808e6290470741029a34004f19e20f6d2365e8`

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

const output = await replicate.run("qwen/qwen3-tts", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen3-tts",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen3-tts/predictions \
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
| `text` | string | **Yes** |  | Text to synthesize into speech |
| `mode` | enum: `custom_voice`, `voice_clone`, `voice_design` | No | `"custom_voice"` | TTS mode: 'custom_voice' uses preset speakers, 'voice_clone' clones from reference audio, 'voice_design' creates voic... |
| `language` | enum (10 values) | No | `"auto"` | Language of the text (use 'auto' for automatic detection) |
| `speaker` | enum (9 values) | No | `"Serena"` | Preset speaker voice (only for 'custom_voice' mode) |
| `voice_description` | string | No |  | Natural language description of desired voice (only for 'voice_design' mode). Example: 'A warm, friendly female voice... |
| `reference_audio` | string (URL) | No |  | Reference audio file for voice cloning (only for 'voice_clone' mode) |
| `reference_text` | string | No |  | Transcript of the reference audio (recommended for 'voice_clone' mode) |
| `style_instruction` | string | No |  | Optional style/emotion instruction (e.g., 'speak slowly and calmly', 'excited tone') |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "qwen/qwen3-tts",
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

- Model page: https://replicate.com/qwen/qwen3-tts
- API page: https://replicate.com/qwen/qwen3-tts/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
