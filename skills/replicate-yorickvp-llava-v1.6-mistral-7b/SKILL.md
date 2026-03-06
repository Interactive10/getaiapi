---
name: replicate-yorickvp-llava-v1.6-mistral-7b
description: >
  Use this skill for the Replicate Llava V1.6 Mistral 7B model (yorickvp/llava-v1.6-mistral-7b). Use the Llava V1.6 Mistral 7B model via Replicate API.
---

# Llava V1.6 Mistral 7B

**Model:** `yorickvp/llava-v1.6-mistral-7b`
**Source:** https://replicate.com/yorickvp/llava-v1.6-mistral-7b
**Version:** `19be067b589d0c46689ffa7cc3ff321447a441986a7694c01225973c2eafc874`

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

const output = await replicate.run("yorickvp/llava-v1.6-mistral-7b", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("yorickvp/llava-v1.6-mistral-7b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/yorickvp/llava-v1.6-mistral-7b/predictions \
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
| `image` | string (URL) | No |  | Input image |
| `prompt` | string | **Yes** |  | Prompt to use for text generation |
| `top_p` | float | No | `1` | When decoding text, samples from the top p percentage of most likely tokens; lower to ignore less likely tokens |
| `temperature` | float | No | `0.2` | Adjusts randomness of outputs, greater than 1 is random and 0 is deterministic |
| `max_tokens` | integer | No | `1024` | Maximum number of tokens to generate. A word is generally 2-3 tokens |
| `history` | list<string> | No |  | List of earlier chat messages, alternating roles, starting with user input. Include <image> to specify which message ... |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "yorickvp/llava-v1.6-mistral-7b",
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

- Model page: https://replicate.com/yorickvp/llava-v1.6-mistral-7b
- API page: https://replicate.com/yorickvp/llava-v1.6-mistral-7b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
