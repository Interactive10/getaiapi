---
name: replicate-anthropic-claude-4-sonnet
description: >
  Use this skill for the Replicate Claude 4 Sonnet model (anthropic/claude-4-sonnet). Use the Claude 4 Sonnet model via Replicate API.
---

# Claude 4 Sonnet

**Model:** `anthropic/claude-4-sonnet`
**Source:** https://replicate.com/anthropic/claude-4-sonnet
**Version:** `3380fe4ca9cac053c89d1df86a5ba850e61cbef1d474a24abded9516e5a73a04`

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

const output = await replicate.run("anthropic/claude-4-sonnet", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("anthropic/claude-4-sonnet",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/anthropic/claude-4-sonnet/predictions \
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
| `prompt` | string | **Yes** |  | Input prompt |
| `image` | string (URL) | No |  | Optional input image. Images are priced as (width px * height px)/750 input tokens |
| `system_prompt` | string | No | `""` | System prompt |
| `max_tokens` | integer | No | `8192` | Maximum number of output tokens |
| `max_image_resolution` | float | No | `0.5` | Maximum image resolution in megapixels. Scales down image before sending it to Claude, to save time and money. |
| `extended_thinking` | boolean | No | `false` | Whether to enable extended thinking mode (only supported for Sonnet 3.7 and Sonnet 4) |
| `thinking_budget_tokens` | integer | No | `1024` | Maximum number of tokens to use for extended thinking when enabled (only supported for Sonnet 3.7 and Sonnet 4) |

---

## Output Schema

**Type:** list<string>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "anthropic/claude-4-sonnet",
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

- Model page: https://replicate.com/anthropic/claude-4-sonnet
- API page: https://replicate.com/anthropic/claude-4-sonnet/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
