---
name: replicate-chigozienri-mediapipe-face
description: >
  Use this skill for the Replicate Mediapipe Face model (chigozienri/mediapipe-face). Use the Mediapipe Face model via Replicate API.
---

# Mediapipe Face

**Model:** `chigozienri/mediapipe-face`
**Source:** https://replicate.com/chigozienri/mediapipe-face
**Version:** `b52b4833a810a8b8d835d6339b72536d63590918b185588be2def78a89e7ca7b`

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

const output = await replicate.run("chigozienri/mediapipe-face", {
  input: {
        "images": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("chigozienri/mediapipe-face",
    input={
        "images": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/chigozienri/mediapipe-face/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"images": "https://example.com/input.png"}}'
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
| `images` | string (URL) | **Yes** |  | Input image as png or jpeg, or zip/tar of input images |
| `blur_amount` | float | No | `0.0` | Blur to apply to mask |
| `bias` | float | No | `0.0` | Bias to apply to mask (lightens background) |
| `output_transparent_image` | boolean | No | `false` | if true, outputs face image with transparent background |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "chigozienri/mediapipe-face",
  input: {
        "images": "https://example.com/input.png"
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

- Model page: https://replicate.com/chigozienri/mediapipe-face
- API page: https://replicate.com/chigozienri/mediapipe-face/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
