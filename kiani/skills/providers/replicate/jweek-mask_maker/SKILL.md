---
name: replicate-jweek-mask_maker
description: >
  Use this skill for the Replicate Mask Maker model (jweek/mask_maker). Use the Mask Maker model via Replicate API.
---

# Mask Maker

**Model:** `jweek/mask_maker`
**Source:** https://replicate.com/jweek/mask_maker
**Version:** `cb9a02b44468ce24d72f60dfd95e74c9b2eee9b844371fef4550a125151ea14c`

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

const output = await replicate.run("jweek/mask_maker", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("jweek/mask_maker",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/jweek/mask_maker/predictions \
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
| `image` | string (URL) | **Yes** |  | Input image file path or URL |
| `mask_prompt` | string | No |  | Comma-separated names of the objects to be detected |
| `threshold` | float | No | `0.2` | Confidence level for object detection |
| `mask_output` | string | No | `""` | Single-line DSL defining composite masks (overrides default one-per-term).  Infix operators (left-to-right):    `&` →... |
| `mask_format` | string | No | `"coco_rle"` | RLE encoding format for masks. 'coco_rle' (default) or 'custom_rle' |

---

## Output Schema

**Type:** Output
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "jweek/mask_maker",
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

- Model page: https://replicate.com/jweek/mask_maker
- API page: https://replicate.com/jweek/mask_maker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
