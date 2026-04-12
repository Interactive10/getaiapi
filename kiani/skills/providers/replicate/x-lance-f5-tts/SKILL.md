---
name: replicate-x-lance-f5-tts
description: >
  Use this skill for the Replicate F5 Tts model (x-lance/f5-tts). Use the F5 Tts model via Replicate API.
---

# F5 Tts

**Model:** `x-lance/f5-tts`
**Source:** https://replicate.com/x-lance/f5-tts
**Version:** `87faf6dd7a692dd82043f662e76369cab126a2cf1937e25a9d41e0b834fd230e`

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

const output = await replicate.run("x-lance/f5-tts", {
  input: {
        "gen_text": "your value here",
        "ref_audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("x-lance/f5-tts",
    input={
        "gen_text": "your value here",
        "ref_audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/x-lance/f5-tts/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"gen_text": "your value here", "ref_audio": "your value here"}}'
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
| `ref_text` | string | No |  | Reference Text |
| `remove_silence` | boolean | No | `true` | Automatically remove silences? |
| `custom_split_words` | string | No | `""` | Custom split words, comma separated |
| `speed` | float | No | `1` | Speed of the generated audio |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "x-lance/f5-tts",
  input: {
        "gen_text": "your value here",
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

- Model page: https://replicate.com/x-lance/f5-tts
- API page: https://replicate.com/x-lance/f5-tts/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
