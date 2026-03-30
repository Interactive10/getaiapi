---
name: replicate-center-for-curriculum-redesign-bge_1-5_query_embeddings
description: >
  Use this skill for the Replicate Bge 1 5 Query Embeddings model (center-for-curriculum-redesign/bge_1-5_query_embeddings). Use the Bge 1 5 Query Embeddings model via Replicate API.
---

# Bge 1 5 Query Embeddings

**Model:** `center-for-curriculum-redesign/bge_1-5_query_embeddings`
**Source:** https://replicate.com/center-for-curriculum-redesign/bge_1-5_query_embeddings
**Version:** `438621acdb4511d2d9c6296860588ee6c60c3df63c93e2012297db8bb965732d`

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

const output = await replicate.run("center-for-curriculum-redesign/bge_1-5_query_embeddings", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("center-for-curriculum-redesign/bge_1-5_query_embeddings",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/center-for-curriculum-redesign/bge_1-5_query_embeddings/predictions \
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
| `query_texts` | string | No | `"[]"` | A serialized JSON array of strings you wish to generate *retreival* embeddings for. (note, that you should keep this ... |
| `normalize` | boolean | No | `true` | normalizes returned embedding vectors to a magnitude of 1. (default: true, as this model presumes cosine similarity c... |
| `batchtoken_max` | float | No | `200` | You probably don't need to worry about this parameter if you're just getting the embeddings for a handful of queries.... |
| `precision` | enum: `full`, `half` | No | `"full"` | numerical precision for inference computations. Either full or half. Defaults to a paranoid value of full. You may wa... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `extra_metrics` | string |  |
| `query_embeddings` | list<list<float>> |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "center-for-curriculum-redesign/bge_1-5_query_embeddings",
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

- Model page: https://replicate.com/center-for-curriculum-redesign/bge_1-5_query_embeddings
- API page: https://replicate.com/center-for-curriculum-redesign/bge_1-5_query_embeddings/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
