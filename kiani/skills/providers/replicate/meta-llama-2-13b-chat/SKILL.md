---
name: replicate-meta-llama-2-13b-chat
description: >
  Use this skill for the Replicate Llama 2 13B Chat model (meta/llama-2-13b-chat). Use the Llama 2 13B Chat model via Replicate API.
---

# Llama 2 13B Chat

**Model:** `meta/llama-2-13b-chat`
**Source:** https://replicate.com/meta/llama-2-13b-chat
**Version:** `f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d`

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

const output = await replicate.run("meta/llama-2-13b-chat", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("meta/llama-2-13b-chat",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/meta/llama-2-13b-chat/predictions \
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
| `prompt` | string | **Yes** |  | Prompt to send to the model. |
| `system_prompt` | string | No | `"You are a helpful assistant."` | System prompt to send to the model. This is prepended to the prompt and helps guide system behavior. |
| `max_new_tokens` | integer | No | `128` | Maximum number of tokens to generate. A word is generally 2-3 tokens |
| `min_new_tokens` | integer | No | `-1` | Minimum number of tokens to generate. To disable, set to -1. A word is generally 2-3 tokens. |
| `temperature` | float | No | `0.75` | Adjusts randomness of outputs, greater than 1 is random and 0 is deterministic, 0.75 is a good starting value. |
| `top_p` | float | No | `0.9` | When decoding text, samples from the top p percentage of most likely tokens; lower to ignore less likely tokens |
| `top_k` | integer | No | `50` | When decoding text, samples from the top k most likely tokens; lower to ignore less likely tokens |
| `stop_sequences` | string | No |  | A comma-separated list of sequences to stop generation at. For example, '<end>,<stop>' will stop generation at the fi... |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `debug` | boolean | No | `false` | provide debugging output in logs |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "meta/llama-2-13b-chat",
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

- Model page: https://replicate.com/meta/llama-2-13b-chat
- API page: https://replicate.com/meta/llama-2-13b-chat/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
