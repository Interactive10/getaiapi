---
name: replicate-yoyo-nb-thin-plate-spline-motion-model
description: >
  Use this skill for the Replicate Thin Plate Spline Motion Model model (yoyo-nb/thin-plate-spline-motion-model). Use the Thin Plate Spline Motion Model model via Replicate API.
---

# Thin Plate Spline Motion Model

**Model:** `yoyo-nb/thin-plate-spline-motion-model`
**Source:** https://replicate.com/yoyo-nb/thin-plate-spline-motion-model
**Version:** `382ceb8a9439737020bad407dec813e150388873760ad4a5a83a2ad01b039977`

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

const output = await replicate.run("yoyo-nb/thin-plate-spline-motion-model", {
  input: {
        "source_image": "https://example.com/input.png",
        "driving_video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("yoyo-nb/thin-plate-spline-motion-model",
    input={
        "source_image": "https://example.com/input.png",
        "driving_video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/yoyo-nb/thin-plate-spline-motion-model/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"source_image": "https://example.com/input.png", "driving_video": "https://example.com/input.png"}}'
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
| `source_image` | string (URL) | **Yes** |  | Input source image. |
| `driving_video` | string (URL) | **Yes** |  | Choose a micromotion. |
| `dataset_name` | enum: `vox`, `taichi`, `ted`, `mgif` | No | `"vox"` | Choose a dataset. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "yoyo-nb/thin-plate-spline-motion-model",
  input: {
        "source_image": "https://example.com/input.png",
        "driving_video": "https://example.com/input.png"
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

- Model page: https://replicate.com/yoyo-nb/thin-plate-spline-motion-model
- API page: https://replicate.com/yoyo-nb/thin-plate-spline-motion-model/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
