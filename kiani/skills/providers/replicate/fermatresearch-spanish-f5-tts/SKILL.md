---
name: replicate-fermatresearch-spanish-f5-tts
description: >
  Use this skill for the Replicate Spanish F5 Tts model (fermatresearch/spanish-f5-tts). Use the Spanish F5 Tts model via Replicate API.
---

# Spanish F5 Tts

**Model:** `fermatresearch/spanish-f5-tts`
**Source:** https://replicate.com/fermatresearch/spanish-f5-tts
**Version:** `f26405b801a0b0945679fb3adf9bbca7ab8559c7fd9cf7cd2a68067c3aab83f7`

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

const output = await replicate.run("fermatresearch/spanish-f5-tts", {
  input: {
        "gen_text": "your value here",
        "ref_text": "your value here",
        "ref_audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fermatresearch/spanish-f5-tts",
    input={
        "gen_text": "your value here",
        "ref_text": "your value here",
        "ref_audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fermatresearch/spanish-f5-tts/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"gen_text": "your value here", "ref_text": "your value here", "ref_audio": "your value here"}}'
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
| `gen_text` | string | **Yes** |  | Text to Generate |
| `ref_audio` | string (URL) | **Yes** |  | Reference audio for voice cloning |
| `ref_text` | string | **Yes** |  | Reference Text |
| `remove_silence` | boolean | No | `true` | Automatically remove silences? |
| `custom_split_words` | string | No | `""` | Custom split words, comma separated |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fermatresearch/spanish-f5-tts",
  input: {
        "gen_text": "your value here",
        "ref_text": "your value here",
        "ref_audio": "your value here"
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

- Model page: https://replicate.com/fermatresearch/spanish-f5-tts
- API page: https://replicate.com/fermatresearch/spanish-f5-tts/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
