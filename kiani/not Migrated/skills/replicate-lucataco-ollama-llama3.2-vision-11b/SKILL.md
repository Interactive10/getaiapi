---
name: replicate-lucataco-ollama-llama3.2-vision-11b
description: >
  Use this skill for the Replicate Ollama Llama3.2 Vision 11B model (lucataco/ollama-llama3.2-vision-11b). Use the Ollama Llama3.2 Vision 11B model via Replicate API.
---

# Ollama Llama3.2 Vision 11B

**Model:** `lucataco/ollama-llama3.2-vision-11b`
**Source:** https://replicate.com/lucataco/ollama-llama3.2-vision-11b
**Version:** `d4e81fc1472556464f1ee5cea4de177b2fe95a6eaadb5f63335df1ba654597af`

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

const output = await replicate.run("lucataco/ollama-llama3.2-vision-11b", {
  input: {
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/ollama-llama3.2-vision-11b",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/ollama-llama3.2-vision-11b/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `image` | string (URL) | **Yes** |  | Input image for the model |
| `prompt` | string | **Yes** |  | Input text for the model |
| `temperature` | float | No | `0.7` | Controls randomness. Lower values make the model more deterministic, higher values make it more random. |
| `top_p` | float | No | `0.95` | Controls diversity of the output. Lower values make the output more focused, higher values make it more diverse. |
| `max_tokens` | integer | No | `512` | Maximum number of tokens to generate |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/ollama-llama3.2-vision-11b",
  input: {
        "image": "https://example.com/input.png",
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

- Model page: https://replicate.com/lucataco/ollama-llama3.2-vision-11b
- API page: https://replicate.com/lucataco/ollama-llama3.2-vision-11b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
