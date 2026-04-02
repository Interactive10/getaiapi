---
name: replicate-leonardoai-lucid-origin
description: >
  Use this skill for the Replicate Lucid Origin model (leonardoai/lucid-origin). Use the Lucid Origin model via Replicate API.
---

# Lucid Origin

**Model:** `leonardoai/lucid-origin`
**Source:** https://replicate.com/leonardoai/lucid-origin
**Version:** `589fc21af967c3912ac0f04986604ee6a695067eb62890f53e0f805db4ff4aef`

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

const output = await replicate.run("leonardoai/lucid-origin", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("leonardoai/lucid-origin",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/leonardoai/lucid-origin/predictions \
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
| `aspect_ratio` | enum (13 values) | No | `"16:9"` | Aspect ratio of the output image |
| `generation_mode` | enum: `standard`, `ultra` | No | `"standard"` | Generation mode |
| `contrast` | enum: `low`, `medium`, `high` | No | `"medium"` | Contrast level |
| `style` | enum (21 values) | No | `"none"` | Style to use for the output image |
| `prompt` | string | **Yes** |  | Text prompt for generation |
| `num_images` | integer | No | `1` | Number of images to generate |
| `prompt_enhance` | boolean | No | `true` | Whether to enhance the prompt |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "leonardoai/lucid-origin",
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

- Model page: https://replicate.com/leonardoai/lucid-origin
- API page: https://replicate.com/leonardoai/lucid-origin/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
