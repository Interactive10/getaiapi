---
name: replicate-flux-kontext-apps-filters
description: >
  Use this skill for the Replicate Filters model (flux-kontext-apps/filters). Use the Filters model via Replicate API.
---

# Filters

**Model:** `flux-kontext-apps/filters`
**Source:** https://replicate.com/flux-kontext-apps/filters
**Version:** `0eb03e298a930a8236001fb6e739cdf6a184dffb0d6c6a59d3002b3e15eb37df`

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

const output = await replicate.run("flux-kontext-apps/filters", {
  input: {
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("flux-kontext-apps/filters",
    input={
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/flux-kontext-apps/filters/predictions \
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
| `image_filter` | enum: `Vivid`, `Black and White`, `Sepia`, `Grayscale`, `Warm`, `Cool` | No | `"Vivid"` | The filter to apply to the image |
| `aspect_ratio` | enum (14 values) | No | `"match_input_image"` | Aspect ratio of the generated image. Use 'match_input_image' to match the aspect ratio of the input image. |
| `output_format` | enum: `jpg`, `png` | No | `"png"` | Output format for the generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `input_image` | string (URL) | **Yes** |  | Image to apply filter to. Must be jpeg, png, gif, or webp. |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 0 is most strict and 2 is most permissive. 2 is currently the maximum allowed. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "flux-kontext-apps/filters",
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

- Model page: https://replicate.com/flux-kontext-apps/filters
- API page: https://replicate.com/flux-kontext-apps/filters/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
