---
name: replicate-lucataco-gpt-oss-safeguard-20b
description: >
  Use this skill for the Replicate Gpt Oss Safeguard 20B model (lucataco/gpt-oss-safeguard-20b). Use the Gpt Oss Safeguard 20B model via Replicate API.
---

# Gpt Oss Safeguard 20B

**Model:** `lucataco/gpt-oss-safeguard-20b`
**Source:** https://replicate.com/lucataco/gpt-oss-safeguard-20b
**Version:** `f10ffd6deb8a2fe73746ade74b5281b33d20c90d7c90b54d6068cfc0c072cbbe`

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

const output = await replicate.run("lucataco/gpt-oss-safeguard-20b", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/gpt-oss-safeguard-20b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/gpt-oss-safeguard-20b/predictions \
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
| `reasoning_effort` | enum: `low`, `medium`, `high` | No | `"medium"` | Reasoning effort level: 'low' for faster responses on straightforward cases, 'medium' for balanced reasoning (default... |
| `top_p` | float | No | `1` | Nucleus sampling top-p |
| `policy` | string | No | `""` | Safety policy or rules to evaluate the prompt against. This defines the criteria for classification. |
| `prompt` | string | No | `"Your bank details are needed to complete this transaction."` | Input prompt or question to evaluate |
| `temperature` | float | No | `1` | Sampling temperature (0 for greedy decoding) |
| `max_new_tokens` | integer | No | `512` | Maximum number of tokens to generate |
| `repetition_penalty` | float | No | `1` | Repetition penalty to reduce repetitive text (1.0 = no penalty) |

---

## Output Schema

**Type:** Output
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/gpt-oss-safeguard-20b",
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

- Model page: https://replicate.com/lucataco/gpt-oss-safeguard-20b
- API page: https://replicate.com/lucataco/gpt-oss-safeguard-20b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
