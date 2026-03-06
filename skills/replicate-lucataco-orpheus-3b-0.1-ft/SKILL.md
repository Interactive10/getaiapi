---
name: replicate-lucataco-orpheus-3b-0.1-ft
description: >
  Use this skill for the Replicate Orpheus 3B 0.1 Ft model (lucataco/orpheus-3b-0.1-ft). Use the Orpheus 3B 0.1 Ft model via Replicate API.
---

# Orpheus 3B 0.1 Ft

**Model:** `lucataco/orpheus-3b-0.1-ft`
**Source:** https://replicate.com/lucataco/orpheus-3b-0.1-ft
**Version:** `79f2a473e6a9720716a473d9b2f2951437dbf91dc02ccb7079fb3d89b881207f`

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

const output = await replicate.run("lucataco/orpheus-3b-0.1-ft", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/orpheus-3b-0.1-ft",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/orpheus-3b-0.1-ft/predictions \
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
| `text` | string | **Yes** |  | Text to convert to speech |
| `voice` | enum: `tara`, `dan`, `josh`, `emma` | No | `"tara"` | Voice to use |
| `temperature` | float | No | `0.6` | Temperature for generation |
| `top_p` | float | No | `0.95` | Top P for nucleus sampling |
| `repetition_penalty` | float | No | `1.1` | Repetition penalty |
| `max_new_tokens` | integer | No | `1200` | Maximum number of tokens to generate |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/orpheus-3b-0.1-ft",
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

- Model page: https://replicate.com/lucataco/orpheus-3b-0.1-ft
- API page: https://replicate.com/lucataco/orpheus-3b-0.1-ft/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
