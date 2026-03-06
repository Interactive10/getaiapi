---
name: replicate-datalab-to-ocr
description: >
  Use this skill for the Replicate Ocr model (datalab-to/ocr). Use the Ocr model via Replicate API.
---

# Ocr

**Model:** `datalab-to/ocr`
**Source:** https://replicate.com/datalab-to/ocr
**Version:** `3e6db0d5311d6fdc232eea333c1e26055ba4e542180043f12acb2967e5c77f4a`

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

const output = await replicate.run("datalab-to/ocr", {
  input: {
        "file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("datalab-to/ocr",
    input={
        "file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/datalab-to/ocr/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"file": "your value here"}}'
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
| `file` | string (URL) | **Yes** |  | Input file. Must be one of: .pdf, .doc, .docx, .ppt, .pptx, .png, .jpg, .jpeg, .webp |
| `max_pages` | integer | No |  | Maximum number of pages to process. Cannot be specified if page_range is set - these parameters are mutually exclusive |
| `page_range` | string | No |  | Page range to parse, comma separated like 0,5-10,20. Example: '0,2-4' will process pages 0, 2, 3, and 4. Cannot be sp... |
| `skip_cache` | boolean | No | `false` | Bypass the server-side cache and force re-processing. By default, identical requests are cached to save time and cost... |
| `return_pages` | boolean | No | `false` | Return detailed page information including text lines, bounding boxes, polygons, and character-level data. When disab... |
| `visualize` | boolean | No | `false` | Draw red polygons on the input image(s) to visualize detected text regions and return the annotated images |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string |  |
| `pages` | list<object> |  |
| `page_count` | integer |  |
| `visualizations` | list<> |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "datalab-to/ocr",
  input: {
        "file": "your value here"
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

- Model page: https://replicate.com/datalab-to/ocr
- API page: https://replicate.com/datalab-to/ocr/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
