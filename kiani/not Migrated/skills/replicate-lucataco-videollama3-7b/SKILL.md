---
name: replicate-lucataco-videollama3-7b
description: >
  Use this skill for the Replicate Videollama3 7B model (lucataco/videollama3-7b). Use the Videollama3 7B model via Replicate API.
---

# Videollama3 7B

**Model:** `lucataco/videollama3-7b`
**Source:** https://replicate.com/lucataco/videollama3-7b
**Version:** `34a1f45f7068f7121a5b47c91f2d7e06c298850767f76f96660450a0a3bd5bbe`

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

const output = await replicate.run("lucataco/videollama3-7b", {
  input: {
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/videollama3-7b",
    input={
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/videollama3-7b/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `video` | string (URL) | **Yes** |  | Input video file |
| `prompt` | string | **Yes** |  | Text prompt to guide the model's response |
| `fps` | float | No | `1` | Frames per second to sample from video |
| `max_frames` | integer | No | `180` | Maximum number of frames to process |
| `temperature` | float | No | `0.2` | Sampling temperature |
| `top_p` | float | No | `0.9` | Top-p sampling |
| `max_new_tokens` | integer | No | `2048` | Maximum number of tokens to generate |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/videollama3-7b",
  input: {
        "video": "https://example.com/input.png",
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

- Model page: https://replicate.com/lucataco/videollama3-7b
- API page: https://replicate.com/lucataco/videollama3-7b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
