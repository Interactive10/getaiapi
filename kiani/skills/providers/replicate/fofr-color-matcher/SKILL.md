---
name: replicate-fofr-color-matcher
description: >
  Use this skill for the Replicate Color Matcher model (fofr/color-matcher). Use the Color Matcher model via Replicate API.
---

# Color Matcher

**Model:** `fofr/color-matcher`
**Source:** https://replicate.com/fofr/color-matcher
**Version:** `9870c2ebd9f6f747c39c23815cb58489e8df129e0bace4d61cf8ba3ddd03cb26`

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

const output = await replicate.run("fofr/color-matcher", {
  input: {
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/color-matcher",
    input={
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/color-matcher/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_image": "https://example.com/input.png"}}'
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
| `input_image` | string (URL) | **Yes** |  | The input image |
| `reference_image` | string (URL) | No |  | The reference image. If not provided, only white balance fixes will be applied. |
| `method` | enum: `mkl`, `hm`, `reinhard`, `mvgd`, `hm-mvgd-hm`, `hm-mkl-hm` | No | `"mkl"` | The method to use for color transfer |
| `strength` | float | No | `1` | Strength of the color transfer effect (0.0 to 1.0) |
| `fix_white_balance` | boolean | No | `false` | Apply automatic white balance to input image (before color transfer) |
| `white_balance_percentile` | float | No | `95` | Percentile for white balance calculation (0.0 to 100.0) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/color-matcher",
  input: {
        "input_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/fofr/color-matcher
- API page: https://replicate.com/fofr/color-matcher/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
