---
name: replicate-ibm-granite-granite-speech-3.3-8b
description: >
  Use this skill for the Replicate Granite Speech 3.3 8B model (ibm-granite/granite-speech-3.3-8b). Use the Granite Speech 3.3 8B model via Replicate API.
---

# Granite Speech 3.3 8B

**Model:** `ibm-granite/granite-speech-3.3-8b`
**Source:** https://replicate.com/ibm-granite/granite-speech-3.3-8b
**Version:** `688e7a943167401c310f0975cb68f1a35e0bddc3b65f60bde89c37860e07edf1`

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

const output = await replicate.run("ibm-granite/granite-speech-3.3-8b", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ibm-granite/granite-speech-3.3-8b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ibm-granite/granite-speech-3.3-8b/predictions \
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
| `prompt` | string | No | `""` | User prompt to send to the model. |
| `audio` | list<> | No |  | Audio inputs for the model. |
| `system_prompt` | string | No |  | System prompt to send to the model.The chat template provides a good default. |
| `min_tokens` | integer | No | `0` | The minimum number of tokens the model should generate as output. |
| `max_tokens` | integer | No | `512` | The maximum number of tokens the model should generate as output. |
| `temperature` | float | No | `0.6` | The value used to modulate the next token probabilities. |
| `top_p` | float | No | `0.9` | A probability threshold for generating the output. If < 1.0, only keep the top tokens with cumulative probability >= ... |
| `top_k` | integer | No | `50` | The number of highest probability tokens to consider for generating the output. If > 0, only keep the top k tokens wi... |
| `presence_penalty` | float | No | `0` | Presence penalty |
| `frequency_penalty` | float | No | `0` | Frequency penalty |
| `stop_sequences` | string | No |  | A comma-separated list of sequences to stop generation at. For example, '<end>,<stop>' will stop generation at the fi... |
| `chat_template` | string | No |  | A template to format the prompt with. If not provided, the default prompt template will be used. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed. |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ibm-granite/granite-speech-3.3-8b",
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

- Model page: https://replicate.com/ibm-granite/granite-speech-3.3-8b
- API page: https://replicate.com/ibm-granite/granite-speech-3.3-8b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
