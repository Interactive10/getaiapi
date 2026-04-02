---
name: replicate-elevenlabs-v2-multilingual
description: >
  Use this skill for the Replicate V2 Multilingual model (elevenlabs/v2-multilingual). Use the V2 Multilingual model via Replicate API.
---

# V2 Multilingual

**Model:** `elevenlabs/v2-multilingual`
**Source:** https://replicate.com/elevenlabs/v2-multilingual
**Version:** `cc1c55e63c927e79a35f5807accbf172051f2b21effe1db532cf8c907cc68d57`

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

const output = await replicate.run("elevenlabs/v2-multilingual", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("elevenlabs/v2-multilingual",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/elevenlabs/v2-multilingual/predictions \
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
| `voice` | enum (26 values) | No | `"Rachel"` | Voice choice for speech generation |
| `speed` | float | No | `1` | Speed of speech (0.25 to 4.0) |
| `style` | float | No | `0` | Style exaggeration (0.0 to 1.0) |
| `prompt` | string | **Yes** |  | The text to convert to speech |
| `next_text` | string | No | `""` | Next text for context |
| `stability` | float | No | `0.5` | Stability setting for voice generation (0.0 to 1.0) |
| `language_code` | string | No | `"en"` | Language code (e.g., 'en', 'es', 'fr') |
| `previous_text` | string | No | `""` | Previous text for context |
| `similarity_boost` | float | No | `0.75` | Similarity boost setting (0.0 to 1.0) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "elevenlabs/v2-multilingual",
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

- Model page: https://replicate.com/elevenlabs/v2-multilingual
- API page: https://replicate.com/elevenlabs/v2-multilingual/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
