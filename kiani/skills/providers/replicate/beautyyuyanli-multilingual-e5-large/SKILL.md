---
name: replicate-beautyyuyanli-multilingual-e5-large
description: >
  Use this skill for the Replicate Multilingual E5 Large model (beautyyuyanli/multilingual-e5-large). Use the Multilingual E5 Large model via Replicate API.
---

# Multilingual E5 Large

**Model:** `beautyyuyanli/multilingual-e5-large`
**Source:** https://replicate.com/beautyyuyanli/multilingual-e5-large
**Version:** `a06276a89f1a902d5fc225a9ca32b6e8e6292b7f3b136518878da97c458e2bad`

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

const output = await replicate.run("beautyyuyanli/multilingual-e5-large", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("beautyyuyanli/multilingual-e5-large",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/beautyyuyanli/multilingual-e5-large/predictions \
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
| `texts` | string | No | `"["In the water, fish are swimming.", "Fish swim in the water.", "A book lies open on the table."]"` | text to embed, formatted as JSON list of strings (e.g. ["hello", "world"]) |
| `batch_size` | integer | No | `32` | Batch size to use when processing text data. |
| `normalize_embeddings` | boolean | No | `true` | Whether to normalize embeddings. |

---

## Output Schema

**Type:** list<list<float>>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "beautyyuyanli/multilingual-e5-large",
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

- Model page: https://replicate.com/beautyyuyanli/multilingual-e5-large
- API page: https://replicate.com/beautyyuyanli/multilingual-e5-large/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
