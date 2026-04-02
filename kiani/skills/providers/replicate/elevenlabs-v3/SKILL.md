---
name: replicate-elevenlabs-v3
description: >
  Use this skill for the Replicate V3 model (elevenlabs/v3). Use the V3 model via Replicate API.
---

# V3

**Model:** `elevenlabs/v3`
**Source:** https://replicate.com/elevenlabs/v3
**Version:** `7611845fe3de62dc322513b8bdc81b785cb730417a015093f6356f2a89fa3e73`

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

const output = await replicate.run("elevenlabs/v3", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("elevenlabs/v3",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/elevenlabs/v3/predictions \
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
| `prompt` | string | **Yes** |  | The text to convert to speech |
| `voice` | enum (26 values) | No | `"Rachel"` | Voice choice for speech generation |
| `stability` | float | No | `0.5` | Stability setting for voice generation (0.0 to 1.0) |
| `similarity_boost` | float | No | `0.75` | Similarity boost setting (0.0 to 1.0) |
| `style` | float | No | `0` | Style exaggeration (0.0 to 1.0) |
| `speed` | float | No | `1` | Speed of speech (0.25 to 4.0) |
| `previous_text` | string | No | `""` | Previous text for context |
| `next_text` | string | No | `""` | Next text for context |
| `language_code` | string | No | `"en"` | Language code (e.g., 'en', 'es', 'fr') |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "elevenlabs/v3",
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

- Model page: https://replicate.com/elevenlabs/v3
- API page: https://replicate.com/elevenlabs/v3/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
