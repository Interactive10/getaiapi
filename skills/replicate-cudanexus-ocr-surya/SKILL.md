---
name: replicate-cudanexus-ocr-surya
description: >
  Use this skill for the Replicate Ocr Surya model (cudanexus/ocr-surya). Use the Ocr Surya model via Replicate API.
---

# Ocr Surya

**Model:** `cudanexus/ocr-surya`
**Source:** https://replicate.com/cudanexus/ocr-surya
**Version:** `7ab5bedee2cd1f0c82b2df6718d19bf0b473f738f9db062f122e47e1467f96ce`

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

const output = await replicate.run("cudanexus/ocr-surya", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cudanexus/ocr-surya",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cudanexus/ocr-surya/predictions \
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
| `image` | string (URL) | **Yes** |  | Upload PDF or Image |
| `page_number` | integer | No | `1` | Page Number |
| `languages_choices` | enum (93 values) | No | `"English"` | Languages |
| `languages_input` | string | No | `"English"` | Languages (comma-separated list) |
| `action` | enum: `Run Text Detection`, `Run OCR` | No | `"Run Text Detection"` | Action |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | string (URL) |  |
| `Status` | string |  |
| `text_file` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cudanexus/ocr-surya",
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

- Model page: https://replicate.com/cudanexus/ocr-surya
- API page: https://replicate.com/cudanexus/ocr-surya/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
