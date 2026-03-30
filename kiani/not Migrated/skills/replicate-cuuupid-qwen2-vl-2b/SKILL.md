---
name: replicate-cuuupid-qwen2-vl-2b
description: >
  Use this skill for the Replicate Qwen2 Vl 2B model (cuuupid/qwen2-vl-2b). Use the Qwen2 Vl 2B model via Replicate API.
---

# Qwen2 Vl 2B

**Model:** `cuuupid/qwen2-vl-2b`
**Source:** https://replicate.com/cuuupid/qwen2-vl-2b
**Version:** `b3e77005f19950db4f8564bbedd5670a3e1bd293f1fefd0088d10d8e4d083dd4`

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

const output = await replicate.run("cuuupid/qwen2-vl-2b", {
  input: {
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cuuupid/qwen2-vl-2b",
    input={
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cuuupid/qwen2-vl-2b/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png"}}'
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
| `prompt` | string | No | `"Describe the video."` | Prompt to use for the video |
| `video` | string (URL) | **Yes** |  | Video to process |
| `width` | integer | No | `128` | Width for the video |
| `height` | integer | No | `128` | Height for the video |
| `max_duration` | float | No | `60` | Maximum duration of the video in seconds (above 360, may run out of VRAM). |
| `max_tokens` | integer | No | `128` | Maximum number of tokens to generate |
| `temperature` | float | No | `0.7` | Temperature for the model (0.7 is a good default). |
| `repetition_penalty` | float | No | `1.1` | Repetition penalty for the model (1.1 is a good default). |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cuuupid/qwen2-vl-2b",
  input: {
        "video": "https://example.com/input.png"
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

- Model page: https://replicate.com/cuuupid/qwen2-vl-2b
- API page: https://replicate.com/cuuupid/qwen2-vl-2b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
