---
name: replicate-google-deepmind-gemma-2b-it
description: >
  Use this skill for the Replicate Gemma 2B It model (google-deepmind/gemma-2b-it). Use the Gemma 2B It model via Replicate API.
---

# Gemma 2B It

**Model:** `google-deepmind/gemma-2b-it`
**Source:** https://replicate.com/google-deepmind/gemma-2b-it
**Version:** `dff94eaf770e1fc211e425a50b51baa8e4cac6c39ef074681f9e39d778773626`

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

const output = await replicate.run("google-deepmind/gemma-2b-it", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google-deepmind/gemma-2b-it",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google-deepmind/gemma-2b-it/predictions \
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
| `prompt` | string | No | `"Write me a poem about Machine Learning."` | Prompt to send to the model. |
| `max_new_tokens` | integer | No | `200` | Maximum number of tokens to generate. A word is generally 2-3 tokens |
| `min_new_tokens` | integer | No | `-1` | Minimum number of tokens to generate. To disable, set to -1. A word is generally 2-3 tokens. |
| `temperature` | float | No | `0.7` | Adjusts randomness of outputs, greater than 1 is random and 0 is deterministic, 0.75 is a good starting value. |
| `top_p` | float | No | `0.95` | When decoding text, samples from the top p percentage of most likely tokens; lower to ignore less likely tokens |
| `top_k` | integer | No | `50` | When decoding text, samples from the top k most likely tokens; lower to ignore less likely tokens |
| `repetition_penalty` | float | No | `1.15` | A parameter that controls how repetitive text can be. Lower means more repetitive, while higher means less repetitive... |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "google-deepmind/gemma-2b-it",
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

- Model page: https://replicate.com/google-deepmind/gemma-2b-it
- API page: https://replicate.com/google-deepmind/gemma-2b-it/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
