---
name: replicate-andreasjansson-llama-2-13b-embeddings
description: >
  Use this skill for the Replicate Llama 2 13B Embeddings model (andreasjansson/llama-2-13b-embeddings). Use the Llama 2 13B Embeddings model via Replicate API.
---

# Llama 2 13B Embeddings

**Model:** `andreasjansson/llama-2-13b-embeddings`
**Source:** https://replicate.com/andreasjansson/llama-2-13b-embeddings
**Version:** `7115a4c65b86815e31412e53de1211c520164c190945a84c425b59dccbc47148`

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

const output = await replicate.run("andreasjansson/llama-2-13b-embeddings", {
  input: {
        "prompts": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("andreasjansson/llama-2-13b-embeddings",
    input={
        "prompts": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/llama-2-13b-embeddings/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompts": "your prompt here"}}'
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
| `prompts` | string | **Yes** |  | List of prompts, separated by prompt_separator. Maximum 100 prompts per prediction. |
| `prompt_separator` | string | No | `"

"` | Separator between prompts |

---

## Output Schema

**Type:** list<list<float>>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/llama-2-13b-embeddings",
  input: {
        "prompts": "your prompt here"
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

- Model page: https://replicate.com/andreasjansson/llama-2-13b-embeddings
- API page: https://replicate.com/andreasjansson/llama-2-13b-embeddings/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
