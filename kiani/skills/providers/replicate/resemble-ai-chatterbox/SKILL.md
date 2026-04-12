---
name: replicate-resemble-ai-chatterbox
description: >
  Use this skill for the Replicate Chatterbox model (resemble-ai/chatterbox). Use the Chatterbox model via Replicate API.
---

# Chatterbox

**Model:** `resemble-ai/chatterbox`
**Source:** https://replicate.com/resemble-ai/chatterbox
**Version:** `1b8422bc49635c20d0a84e387ed20879c0dd09254ecdb4e75dc4bec10ff94e97`

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

const output = await replicate.run("resemble-ai/chatterbox", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("resemble-ai/chatterbox",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/resemble-ai/chatterbox/predictions \
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
| `prompt` | string | **Yes** |  | Text to synthesize |
| `audio_prompt` | string (URL) | No |  | Path to the reference audio file (Optional) |
| `exaggeration` | float | No | `0.5` | Exaggeration (Neutral = 0.5, extreme values can be unstable) |
| `cfg_weight` | float | No | `0.5` | CFG/Pace weight |
| `temperature` | float | No | `0.8` | Temperature |
| `seed` | integer | No | `0` | Seed (0 for random) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "resemble-ai/chatterbox",
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

- Model page: https://replicate.com/resemble-ai/chatterbox
- API page: https://replicate.com/resemble-ai/chatterbox/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
