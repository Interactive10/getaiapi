---
name: replicate-georgedavila-bart-large-mnli-classifier
description: >
  Use this skill for the Replicate Bart Large Mnli Classifier model (georgedavila/bart-large-mnli-classifier). Use the Bart Large Mnli Classifier model via Replicate API.
---

# Bart Large Mnli Classifier

**Model:** `georgedavila/bart-large-mnli-classifier`
**Source:** https://replicate.com/georgedavila/bart-large-mnli-classifier
**Version:** `d929487cf059f96a17752ebe55ae5a85b2e8be6cd627078e49c6caa2fd4213db`

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

const output = await replicate.run("georgedavila/bart-large-mnli-classifier", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("georgedavila/bart-large-mnli-classifier",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/georgedavila/bart-large-mnli-classifier/predictions \
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
| `text2classify` | string | No | `"Add salt to boiling water to prevent pasta from sticking together"` | Text you want to classify. |
| `labels` | string | No | `"Cooking Instructions, Question about Astronomy"` | Possible class names (comma-separated). This is a zero-shot classifier so you can try any label you'd like. The model... |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "georgedavila/bart-large-mnli-classifier",
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

- Model page: https://replicate.com/georgedavila/bart-large-mnli-classifier
- API page: https://replicate.com/georgedavila/bart-large-mnli-classifier/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
