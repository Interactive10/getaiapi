---
name: replicate-google-gemini-2.5-flash
description: >
  Use this skill for the Replicate Gemini 2.5 Flash model (google/gemini-2.5-flash). Use the Gemini 2.5 Flash model via Replicate API.
---

# Gemini 2.5 Flash

**Model:** `google/gemini-2.5-flash`
**Source:** https://replicate.com/google/gemini-2.5-flash
**Version:** `6585308f2652e91c80134f0e070d01bd66107b68590f50ff601860ea6902e813`

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

const output = await replicate.run("google/gemini-2.5-flash", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google/gemini-2.5-flash",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google/gemini-2.5-flash/predictions \
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
| `prompt` | string | **Yes** |  | The text prompt to send to the model |
| `images` | list<string (URL)> | No | `[]` | Input images to send with the prompt (max 10 images, each up to 7MB) |
| `videos` | list<string (URL)> | No | `[]` | Input videos to send with the prompt (max 10 videos, each up to 45 minutes) |
| `system_instruction` | string | No |  | System instruction to guide the model's behavior |
| `temperature` | float | No | `1` | Sampling temperature between 0 and 2 |
| `top_p` | float | No | `0.95` | Nucleus sampling parameter - the model considers the results of the tokens with top_p probability mass |
| `max_output_tokens` | integer | No | `65535` | Maximum number of tokens to generate |
| `thinking_budget` | integer | No |  | Thinking budget for reasoning (0 to disable thinking, higher values allow more reasoning) |
| `dynamic_thinking` | boolean | No | `false` | Enable dynamic thinking - the model will adjust the thinking budget based on the complexity of the request (overrides... |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "google/gemini-2.5-flash",
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

- Model page: https://replicate.com/google/gemini-2.5-flash
- API page: https://replicate.com/google/gemini-2.5-flash/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
