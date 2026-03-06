---
name: replicate-deepseek-ai-deepseek-v3.1
description: >
  Use this skill for the Replicate Deepseek V3.1 model (deepseek-ai/deepseek-v3.1). Use the Deepseek V3.1 model via Replicate API.
---

# Deepseek V3.1

**Model:** `deepseek-ai/deepseek-v3.1`
**Source:** https://replicate.com/deepseek-ai/deepseek-v3.1
**Version:** `f257f380598d0760ba84e7d4b02532d3a45b03ede80096f516e81d68b375aff3`

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

const output = await replicate.run("deepseek-ai/deepseek-v3.1", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("deepseek-ai/deepseek-v3.1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/deepseek-ai/deepseek-v3.1/predictions \
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
| `thinking` | enum: `medium`, `None` | No | `"None"` | Reasoning effort level for DeepSeek models. Use 'medium' for enhanced reasoning or leave as None for default behavior. |
| `prompt` | string | No | `"Why are you better than Deepseek v3?"` | Prompt |
| `max_tokens` | integer | No | `1024` | The maximum number of tokens the model should generate as output. |
| `temperature` | float | No | `0.1` | The value used to modulate the next token probabilities. |
| `top_p` | float | No | `1` | Top-p (nucleus) sampling |
| `presence_penalty` | float | No | `0` | Presence penalty |
| `frequency_penalty` | float | No | `0` | Frequency penalty |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "deepseek-ai/deepseek-v3.1",
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

- Model page: https://replicate.com/deepseek-ai/deepseek-v3.1
- API page: https://replicate.com/deepseek-ai/deepseek-v3.1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
