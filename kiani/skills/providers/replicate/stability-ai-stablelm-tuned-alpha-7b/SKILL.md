---
name: replicate-stability-ai-stablelm-tuned-alpha-7b
description: >
  Use this skill for the Replicate Stablelm Tuned Alpha 7B model (stability-ai/stablelm-tuned-alpha-7b). Use the Stablelm Tuned Alpha 7B model via Replicate API.
---

# Stablelm Tuned Alpha 7B

**Model:** `stability-ai/stablelm-tuned-alpha-7b`
**Source:** https://replicate.com/stability-ai/stablelm-tuned-alpha-7b
**Version:** `943c4afb4d0273cf1cf17c1070e182c903a9fe6b372df36b5447cf45935c42f2`

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

const output = await replicate.run("stability-ai/stablelm-tuned-alpha-7b", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("stability-ai/stablelm-tuned-alpha-7b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/stability-ai/stablelm-tuned-alpha-7b/predictions \
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
| `prompt` | string | No | `"What's your mood today?"` | Input Prompt. |
| `max_new_tokens` | integer | No | `100` | Maximum number of tokens to generate. A word is generally 2-3 tokens |
| `top_p` | float | No | `1` | Valid if you choose top_p decoding. When decoding text, samples from the top p percentage of most likely tokens; lowe... |
| `temperature` | float | No | `0.75` | Adjusts randomness of outputs, greater than 1 is random and 0 is deterministic, 0.75 is a good starting value. |
| `repetition_penalty` | float | No | `1.2` | Penalty for repeated words in generated text; 1 is no penalty, values greater than 1 discourage repetition, less than... |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "stability-ai/stablelm-tuned-alpha-7b",
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

- Model page: https://replicate.com/stability-ai/stablelm-tuned-alpha-7b
- API page: https://replicate.com/stability-ai/stablelm-tuned-alpha-7b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
