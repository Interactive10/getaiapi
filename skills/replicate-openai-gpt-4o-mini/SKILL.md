---
name: replicate-openai-gpt-4o-mini
description: >
  Use this skill for the Replicate Gpt 4O Mini model (openai/gpt-4o-mini). Use the Gpt 4O Mini model via Replicate API.
---

# Gpt 4O Mini

**Model:** `openai/gpt-4o-mini`
**Source:** https://replicate.com/openai/gpt-4o-mini
**Version:** `86d7f12d34e3f9b6e149231f42154d0f41081d91484932e3f1ee608fc207f7d9`

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

const output = await replicate.run("openai/gpt-4o-mini", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/gpt-4o-mini",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/gpt-4o-mini/predictions \
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
| `prompt` | string | No |  | The prompt to send to the model. Do not use if using messages. |
| `system_prompt` | string | No |  | System prompt to set the assistant's behavior |
| `messages` | list<object> | No | `[]` | A JSON string representing a list of messages. For example: [{"role": "user", "content": "Hello, how are you?"}]. If ... |
| `image_input` | list<string (URL)> | No | `[]` | List of images to send to the model |
| `temperature` | float | No | `1` | Sampling temperature between 0 and 2 |
| `max_completion_tokens` | integer | No | `4096` | Maximum number of completion tokens to generate |
| `top_p` | float | No | `1` | Nucleus sampling parameter - the model considers the results of the tokens with top_p probability mass. (0.1 means on... |
| `frequency_penalty` | float | No | `0` | Frequency penalty parameter - positive values penalize the repetition of tokens. |
| `presence_penalty` | float | No | `0` | Presence penalty parameter - positive values penalize new tokens based on whether they appear in the text so far, inc... |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/gpt-4o-mini",
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

- Model page: https://replicate.com/openai/gpt-4o-mini
- API page: https://replicate.com/openai/gpt-4o-mini/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
