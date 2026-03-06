---
name: replicate-mark3labs-embeddings-gte-base
description: >
  Use this skill for the Replicate Embeddings Gte Base model (mark3labs/embeddings-gte-base). Use the Embeddings Gte Base model via Replicate API.
---

# Embeddings Gte Base

**Model:** `mark3labs/embeddings-gte-base`
**Source:** https://replicate.com/mark3labs/embeddings-gte-base
**Version:** `d619cff29338b9a37c3d06605042e1ff0594a8c3eff0175fd6967f5643fc4d47`

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

const output = await replicate.run("mark3labs/embeddings-gte-base", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("mark3labs/embeddings-gte-base",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/mark3labs/embeddings-gte-base/predictions \
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
| `text` | string | **Yes** |  | Text string to embed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string |  |
| `vectors` | list<float> |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "mark3labs/embeddings-gte-base",
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

- Model page: https://replicate.com/mark3labs/embeddings-gte-base
- API page: https://replicate.com/mark3labs/embeddings-gte-base/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
