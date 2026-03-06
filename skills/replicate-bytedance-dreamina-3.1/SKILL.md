---
name: replicate-bytedance-dreamina-3.1
description: >
  Use this skill for the Replicate Dreamina 3.1 model (bytedance/dreamina-3.1). Use the Dreamina 3.1 model via Replicate API.
---

# Dreamina 3.1

**Model:** `bytedance/dreamina-3.1`
**Source:** https://replicate.com/bytedance/dreamina-3.1
**Version:** `1c46683343f18bbfbd3ddec7394e84eab54030db9db361c7608921bded2a074c`

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

const output = await replicate.run("bytedance/dreamina-3.1", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/dreamina-3.1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/dreamina-3.1/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `aspect_ratio` | enum (10 values) | No | `"1:1"` | Image aspect ratio. Set to 'custom' to specify width and height. |
| `resolution` | enum: `1K`, `2K` | No | `"2K"` | Image resolution quality |
| `width` | integer | No | `1328` | Image width (only used when aspect_ratio is 'custom') |
| `height` | integer | No | `1328` | Image height (only used when aspect_ratio is 'custom') |
| `use_pre_llm` | boolean | No | `true` | Enable text expansion for better results with short prompts |
| `seed` | integer | No |  | Random seed for reproducible generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/dreamina-3.1",
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

- Model page: https://replicate.com/bytedance/dreamina-3.1
- API page: https://replicate.com/bytedance/dreamina-3.1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
