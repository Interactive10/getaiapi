---
name: replicate-daanelson-minigpt-4
description: >
  Use this skill for the Replicate Minigpt 4 model (daanelson/minigpt-4). Use the Minigpt 4 model via Replicate API.
---

# Minigpt 4

**Model:** `daanelson/minigpt-4`
**Source:** https://replicate.com/daanelson/minigpt-4
**Version:** `e447a8583cffd86ce3b93f9c2cd24f2eae603d99ace6afa94b33a08e94a3cd06`

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

const output = await replicate.run("daanelson/minigpt-4", {
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

output = replicate.run("daanelson/minigpt-4",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/daanelson/minigpt-4/predictions \
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
| `image` | string (URL) | **Yes** |  | Image to discuss |
| `prompt` | string | **Yes** |  | Prompt for mini-gpt4 regarding input image |
| `num_beams` | integer | No | `3` | Number of beams for beam search decoding |
| `temperature` | float | No | `1` | Temperature for generating tokens, lower = more predictable results |
| `top_p` | float | No | `0.9` | Sample from the top p percent most likely tokens |
| `repetition_penalty` | float | No | `1` | Penalty for repeated words in generated text; 1 is no penalty, values greater than 1 discourage repetition, less than... |
| `max_new_tokens` | integer | No | `3000` | Maximum number of new tokens to generate |
| `max_length` | integer | No | `4000` | Total length of prompt and output in tokens |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "daanelson/minigpt-4",
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

- Model page: https://replicate.com/daanelson/minigpt-4
- API page: https://replicate.com/daanelson/minigpt-4/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
