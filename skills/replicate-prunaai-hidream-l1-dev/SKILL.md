---
name: replicate-prunaai-hidream-l1-dev
description: >
  Use this skill for the Replicate Hidream L1 Dev model (prunaai/hidream-l1-dev). Use the Hidream L1 Dev model via Replicate API.
---

# Hidream L1 Dev

**Model:** `prunaai/hidream-l1-dev`
**Source:** https://replicate.com/prunaai/hidream-l1-dev
**Version:** `4dfcd146c0def4812455415f55556f6bc84025dcb15193cf1977f01bd384d191`

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

const output = await replicate.run("prunaai/hidream-l1-dev", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/hidream-l1-dev",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/hidream-l1-dev/predictions \
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
| `model_type` | enum: `dev` | No | `"dev"` | Model type |
| `speed_mode` | enum: `Unsqueezed 🍋 (highest quality)`, `Lightly Juiced 🍊 (more consistent)`, `Juiced 🔥 (more speed)`, `Extra Juiced 🚀 (even more speed)` | No | `"Lightly Juiced 🍊 (more consistent)"` | Speed optimization level |
| `resolution` | enum (7 values) | No | `"1024 × 1024 (Square)"` | Output resolution |
| `seed` | integer | No | `-1` | Random seed (-1 for random) |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"webp"` | Output format |
| `output_quality` | integer | No | `100` | Output quality (for jpg and webp) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/hidream-l1-dev",
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

- Model page: https://replicate.com/prunaai/hidream-l1-dev
- API page: https://replicate.com/prunaai/hidream-l1-dev/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
