---
name: replicate-google-research-maxim
description: >
  Use this skill for the Replicate Maxim model (google-research/maxim). Use the Maxim model via Replicate API.
---

# Maxim

**Model:** `google-research/maxim`
**Source:** https://replicate.com/google-research/maxim
**Version:** `494ca4d578293b4b93945115601b6a38190519da18467556ca223d219c3af9f9`

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

const output = await replicate.run("google-research/maxim", {
  input: {
        "image": "https://example.com/input.png",
        "model": "Image Denoising"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google-research/maxim",
    input={
        "image": "https://example.com/input.png",
        "model": "Image Denoising"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google-research/maxim/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "model": "Image Denoising"}}'
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
| `model` | enum (11 values) | **Yes** |  | Choose a model. |
| `image` | string (URL) | **Yes** |  | Input image. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "google-research/maxim",
  input: {
        "image": "https://example.com/input.png",
        "model": "Image Denoising"
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

- Model page: https://replicate.com/google-research/maxim
- API page: https://replicate.com/google-research/maxim/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
