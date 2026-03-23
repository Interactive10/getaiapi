---
name: replicate-prunaai-hidream-l1-fast
description: >
  Use this skill for the Replicate Hidream L1 Fast model (prunaai/hidream-l1-fast). Use the Hidream L1 Fast model via Replicate API.
---

# Hidream L1 Fast

**Model:** `prunaai/hidream-l1-fast`
**Source:** https://replicate.com/prunaai/hidream-l1-fast
**Version:** `cae8ff080ba910ce55c802520086c78e0cf99e264f508cfff28d171d67e78e16`

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

const output = await replicate.run("prunaai/hidream-l1-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/hidream-l1-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/hidream-l1-fast/predictions \
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
| `prompt` | string | **Yes** |  | Prompt |
| `model_type` | enum: `fast` | No | `"fast"` | Model type |
| `speed_mode` | enum: `Unsqueezed 🍋 (highest quality)`, `Lightly Juiced 🍊 (more consistent)`, `Juiced 🔥 (more speed)`, `Extra Juiced 🚀 (even more speed)` | No | `"Extra Juiced 🚀 (even more speed)"` | Speed optimization level |
| `resolution` | enum (7 values) | No | `"1024 × 1024 (Square)"` | Output resolution |
| `seed` | integer | No | `-1` | Random seed (-1 for random) |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"webp"` | Output format |
| `output_quality` | integer | No | `100` | Output quality (for jpg and webp) |
| `negative_prompt` | string | No | `""` | Negative prompt for generated image. Leave blank to use the default negative prompt. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/hidream-l1-fast",
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

- Model page: https://replicate.com/prunaai/hidream-l1-fast
- API page: https://replicate.com/prunaai/hidream-l1-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
