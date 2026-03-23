---
name: replicate-lucataco-deepseek-ocr
description: >
  Use this skill for the Replicate Deepseek Ocr model (lucataco/deepseek-ocr). Use the Deepseek Ocr model via Replicate API.
---

# Deepseek Ocr

**Model:** `lucataco/deepseek-ocr`
**Source:** https://replicate.com/lucataco/deepseek-ocr
**Version:** `cb3b474fbfc56b1664c8c7841550bccecbe7b74c30e45ce938ffca1180b4dff5`

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

const output = await replicate.run("lucataco/deepseek-ocr", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/deepseek-ocr",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/deepseek-ocr/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `resolution_size` | enum: `Gundam (Recommended)`, `Tiny`, `Small`, `Base`, `Large` | No | `"Gundam (Recommended)"` | Model resolution size - affects speed and accuracy trade-off |
| `task_type` | enum: `Convert to Markdown`, `Free OCR`, `Parse Figure`, `Locate Object by Reference` | No | `"Convert to Markdown"` | Type of OCR task to perform |
| `image` | string (URL) | **Yes** |  | Input image to perform OCR on (supports documents, charts, tables, etc.) |
| `reference_text` | string | No | `""` | Reference text to locate in the image (only used for 'Locate Object by Reference' task). Example: 'the teacher', '20-... |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/deepseek-ocr",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/lucataco/deepseek-ocr
- API page: https://replicate.com/lucataco/deepseek-ocr/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
