---
name: replicate-openai-o1
description: >
  Use this skill for the Replicate O1 model (openai/o1). Use the O1 model via Replicate API.
---

# O1

**Model:** `openai/o1`
**Source:** https://replicate.com/openai/o1
**Version:** `729043ff117dccc608d5b114e55ffed41bc849f4d85f9e61cc164d8ddde781df`

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

const output = await replicate.run("openai/o1", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/o1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/o1/predictions \
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
| `reasoning_effort` | enum: `low`, `medium`, `high` | No | `"medium"` | Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing r... |
| `max_completion_tokens` | integer | No | `4096` | Maximum number of completion tokens to generate |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/o1",
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

- Model page: https://replicate.com/openai/o1
- API page: https://replicate.com/openai/o1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
