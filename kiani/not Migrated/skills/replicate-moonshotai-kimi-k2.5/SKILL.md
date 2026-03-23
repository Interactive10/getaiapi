---
name: replicate-moonshotai-kimi-k2.5
description: >
  Use this skill for the Replicate Kimi K2.5 model (moonshotai/kimi-k2.5). Use the Kimi K2.5 model via Replicate API.
---

# Kimi K2.5

**Model:** `moonshotai/kimi-k2.5`
**Source:** https://replicate.com/moonshotai/kimi-k2.5
**Version:** `b4d8427a98a2de294f719d281c5218daebd44895b308ace34792d0746f6670ba`

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

const output = await replicate.run("moonshotai/kimi-k2.5", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("moonshotai/kimi-k2.5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/moonshotai/kimi-k2.5/predictions \
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
| `prompt` | string | No | `""` | Text prompt |
| `image` | string (URL) | No |  | Image file to analyze (optional). Will be resized if larger than 1024px. |
| `max_tokens` | integer | No | `1024` | Maximum number of tokens to generate. |
| `temperature` | float | No | `0.1` | Sampling temperature. |
| `presence_penalty` | float | No | `0` | Presence penalty |
| `frequency_penalty` | float | No | `0` | Frequency penalty |
| `top_p` | float | No | `1` | Top-p (nucleus) sampling |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "moonshotai/kimi-k2.5",
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

- Model page: https://replicate.com/moonshotai/kimi-k2.5
- API page: https://replicate.com/moonshotai/kimi-k2.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
