---
name: replicate-recraft-ai-recraft-v4-pro
description: >
  Use this skill for the Replicate Recraft V4 Pro model (recraft-ai/recraft-v4-pro). Use the Recraft V4 Pro model via Replicate API.
---

# Recraft V4 Pro

**Model:** `recraft-ai/recraft-v4-pro`
**Source:** https://replicate.com/recraft-ai/recraft-v4-pro
**Version:** `da14602f43a83d1a85654e8cbce5afc0d4cca59b41c0c13f73be8ca84d54d6b6`

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

const output = await replicate.run("recraft-ai/recraft-v4-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("recraft-ai/recraft-v4-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/recraft-ai/recraft-v4-pro/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation (up to 10,000 characters) |
| `aspect_ratio` | enum (15 values) | No | `"Not set"` | Aspect ratio of the generated image |
| `size` | enum (14 values) | No | `"2048x2048"` | Width and height of the generated image. Size is ignored if an aspect ratio is set. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "recraft-ai/recraft-v4-pro",
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

- Model page: https://replicate.com/recraft-ai/recraft-v4-pro
- API page: https://replicate.com/recraft-ai/recraft-v4-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
