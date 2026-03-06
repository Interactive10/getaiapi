---
name: replicate-ibm-granite-granite-4.0-h-small
description: >
  Use this skill for the Replicate Granite 4.0 H Small model (ibm-granite/granite-4.0-h-small). Use the Granite 4.0 H Small model via Replicate API.
---

# Granite 4.0 H Small

**Model:** `ibm-granite/granite-4.0-h-small`
**Source:** https://replicate.com/ibm-granite/granite-4.0-h-small
**Version:** `aaa80dbee13a1a49dd740c24584d9d23352a7899c0e460791e06b21f901b031b`

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

const output = await replicate.run("ibm-granite/granite-4.0-h-small", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ibm-granite/granite-4.0-h-small",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ibm-granite/granite-4.0-h-small/predictions \
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
| `prompt` | string | No |  | Completion API user prompt. |
| `messages` | list<object> | No | `[]` | Chat completion API messages. |
| `documents` | list<object> | No | `[]` | Documents for request. Passed to the chat template. |
| `tools` | list<object> | No | `[]` | Tools for request. Passed to the chat template. |
| `tool_choice` | string | No |  | Tool choice for request. If the choice is a specific function, this should be specified as a JSON string. |
| `response_format` | Response Format | No |  | An object specifying the format that the model must output. |
| `system_prompt` | string | No |  | Completion API system prompt. The chat template provides a good default. |
| `chat_template` | string | No |  | A template to format the prompt with. If not specified, the chat template provided by the model will be used. |
| `add_generation_prompt` | boolean | No | `true` | Add generation prompt. Passed to the chat template. Defaults to True. |
| `chat_template_kwargs` | Chat Template Kwargs | No | `{}` | Additional arguments to be passed to the chat template. |
| `min_tokens` | integer | No | `0` | The minimum number of tokens the model should generate as output. |
| `max_tokens` | integer | No |  | max_tokens is deprecated in favor of the max_completion_tokens field. |
| `max_completion_tokens` | integer | No |  | An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and r... |
| `temperature` | float | No | `0` | The value used to modulate the next token probabilities. |
| `top_p` | float | No | `0.9` | A probability threshold for generating the output. If < 1.0, only keep the top tokens with cumulative probability >= ... |
| `top_k` | integer | No | `50` | The number of highest probability tokens to consider for generating the output. If > 0, only keep the top k tokens wi... |
| `presence_penalty` | float | No |  | Presence penalty |
| `frequency_penalty` | float | No |  | Frequency penalty |
| `repetition_penalty` | float | No |  | Repetition penalty |
| `stop` | list<string> | No | `[]` | A list of sequences to stop generation at. For example, ["<end>","<stop>"] will stop generation at the first instance... |
| `seed` | integer | No |  | Random seed. Leave unspecified to randomize the seed. |
| `stream` | boolean | No | `false` | Request streaming response. Defaults to False. |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ibm-granite/granite-4.0-h-small",
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

- Model page: https://replicate.com/ibm-granite/granite-4.0-h-small
- API page: https://replicate.com/ibm-granite/granite-4.0-h-small/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
