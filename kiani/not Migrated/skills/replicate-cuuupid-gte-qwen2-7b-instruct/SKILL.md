---
name: replicate-cuuupid-gte-qwen2-7b-instruct
description: >
  Use this skill for the Replicate Gte Qwen2 7B Instruct model (cuuupid/gte-qwen2-7b-instruct). Use the Gte Qwen2 7B Instruct model via Replicate API.
---

# Gte Qwen2 7B Instruct

**Model:** `cuuupid/gte-qwen2-7b-instruct`
**Source:** https://replicate.com/cuuupid/gte-qwen2-7b-instruct
**Version:** `67b1736bae9312a321217b2e10547882943b9e4a285eac4cba4043fab954b954`

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

const output = await replicate.run("cuuupid/gte-qwen2-7b-instruct", {
  input: {
        "text": []
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cuuupid/gte-qwen2-7b-instruct",
    input={
        "text": []
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cuuupid/gte-qwen2-7b-instruct/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": []}}'
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
| `text` | list<string> | **Yes** |  | Texts to embed |

---

## Output Schema

**Type:** list<float>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cuuupid/gte-qwen2-7b-instruct",
  input: {
        "text": []
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

- Model page: https://replicate.com/cuuupid/gte-qwen2-7b-instruct
- API page: https://replicate.com/cuuupid/gte-qwen2-7b-instruct/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
