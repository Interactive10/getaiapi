---
name: replicate-nateraw-bge-large-en-v1.5
description: >
  Use this skill for the Replicate Bge Large En V1.5 model (nateraw/bge-large-en-v1.5). Use the Bge Large En V1.5 model via Replicate API.
---

# Bge Large En V1.5

**Model:** `nateraw/bge-large-en-v1.5`
**Source:** https://replicate.com/nateraw/bge-large-en-v1.5
**Version:** `9cf9f015a9cb9c61d1a2610659cdac4a4ca222f2d3707a68517b18c198a9add1`

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

const output = await replicate.run("nateraw/bge-large-en-v1.5", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nateraw/bge-large-en-v1.5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nateraw/bge-large-en-v1.5/predictions \
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
| `path` | string (URL) | No |  | Path to file containing text as JSONL with 'text' field or valid JSON string list. |
| `texts` | string | No | `""` | text to embed, formatted as JSON list of strings (e.g. ["hello", "world"]) |
| `batch_size` | integer | No | `32` | Batch size to use when processing text data. |
| `normalize_embeddings` | boolean | No | `true` | Whether to normalize embeddings. |
| `convert_to_numpy` | boolean | No | `false` | When true, return output as npy file. By default, we return JSON |

---

## Output Schema

**Type:** list<string> | string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "nateraw/bge-large-en-v1.5",
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

- Model page: https://replicate.com/nateraw/bge-large-en-v1.5
- API page: https://replicate.com/nateraw/bge-large-en-v1.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
