---
name: replicate-bria-fibo
description: >
  Use this skill for the Replicate Fibo model (bria/fibo). Use the Fibo model via Replicate API.
---

# Fibo

**Model:** `bria/fibo`
**Source:** https://replicate.com/bria/fibo
**Version:** `11d5854315b5c315a9e9335bb816e693eea668e47e347ca69e2ea1eac16acd6b`

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

const output = await replicate.run("bria/fibo", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bria/fibo",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bria/fibo/predictions \
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
| `image` | string (URL) | No |  | Image file |
| `structured_prompt` | string | No | `""` | Structured prompt (JSON string). Use a structured_prompt from a previous generation's response or the /v2/structured_... |
| `negative_prompt` | string | No |  | Negative prompt for image generation |
| `guidance_scale` | integer | No |  | Guidance scale (1-10) |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Aspect ratio for expansion. Either aspect_ratio or canvas_size with original_image_size/location must be provided. Ca... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bria/fibo",
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

- Model page: https://replicate.com/bria/fibo
- API page: https://replicate.com/bria/fibo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
