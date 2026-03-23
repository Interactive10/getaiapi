---
name: replicate-ibm-granite-granite-3.1-8b-instruct
description: >
  Use this skill for the Replicate Granite 3.1 8B Instruct model (ibm-granite/granite-3.1-8b-instruct). Use the Granite 3.1 8B Instruct model via Replicate API.
---

# Granite 3.1 8B Instruct

**Model:** `ibm-granite/granite-3.1-8b-instruct`
**Source:** https://replicate.com/ibm-granite/granite-3.1-8b-instruct
**Version:** `b66517f8a5c77dc2ceb16664440faeed91f0ba0470db40a3018006ca0204bd38`

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

const output = await replicate.run("ibm-granite/granite-3.1-8b-instruct", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ibm-granite/granite-3.1-8b-instruct",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ibm-granite/granite-3.1-8b-instruct/predictions \
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
| `prompt` | string | No | `""` | Prompt |
| `system_prompt` | string | No | `"You are a helpful assistant."` | System prompt to send to the model. This is prepended to the prompt and helps guide system behavior. Ignored for non-... |
| `min_tokens` | integer | No | `0` | The minimum number of tokens the model should generate as output. |
| `max_tokens` | integer | No | `512` | The maximum number of tokens the model should generate as output. |
| `temperature` | float | No | `0.6` | The value used to modulate the next token probabilities. |
| `top_p` | float | No | `0.9` | A probability threshold for generating the output. If < 1.0, only keep the top tokens with cumulative probability >= ... |
| `top_k` | integer | No | `50` | The number of highest probability tokens to consider for generating the output. If > 0, only keep the top k tokens wi... |
| `presence_penalty` | float | No | `0` | Presence penalty |
| `frequency_penalty` | float | No | `0` | Frequency penalty |
| `stop_sequences` | string | No |  | A comma-separated list of sequences to stop generation at. For example, '<end>,<stop>' will stop generation at the fi... |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ibm-granite/granite-3.1-8b-instruct",
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

- Model page: https://replicate.com/ibm-granite/granite-3.1-8b-instruct
- API page: https://replicate.com/ibm-granite/granite-3.1-8b-instruct/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
