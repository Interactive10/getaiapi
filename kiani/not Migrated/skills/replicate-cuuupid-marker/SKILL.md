---
name: replicate-cuuupid-marker
description: >
  Use this skill for the Replicate Marker model (cuuupid/marker). Use the Marker model via Replicate API.
---

# Marker

**Model:** `cuuupid/marker`
**Source:** https://replicate.com/cuuupid/marker
**Version:** `9c67051309f6d10ca139489f15fcb5ebc4866a3734af537c181fb13bc719d280`

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

const output = await replicate.run("cuuupid/marker", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cuuupid/marker",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cuuupid/marker/predictions \
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
| `document` | string (URL) | No |  | Provide your input file (PDF, EPUB, MOBI, XPS, FB2). |
| `max_pages` | integer | No |  | Provide the maximum number of pages to parse. |
| `parallel_factor` | integer | No | `1` | Provide the parallel factor to use for OCR. |
| `lang` | enum: `English`, `Spanish`, `Portuguese`, `French`, `German`, `Russian` | No | `"English"` | Provide the language to use for OCR. |
| `dpi` | integer | No | `400` | The DPI to use for OCR. |
| `enable_editor` | boolean | No | `false` | Enable the editor model. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `markdown` | string (URL) |  |
| `metadata` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cuuupid/marker",
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

- Model page: https://replicate.com/cuuupid/marker
- API page: https://replicate.com/cuuupid/marker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
