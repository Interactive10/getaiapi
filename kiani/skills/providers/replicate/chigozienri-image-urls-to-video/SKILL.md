---
name: replicate-chigozienri-image-urls-to-video
description: >
  Use this skill for the Replicate Image Urls To Video model (chigozienri/image-urls-to-video). Use the Image Urls To Video model via Replicate API.
---

# Image Urls To Video

**Model:** `chigozienri/image-urls-to-video`
**Source:** https://replicate.com/chigozienri/image-urls-to-video
**Version:** `f3afb57de840ebb8dfc623726608d5b00e6c4ef17564283fb3945631446ede76`

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

const output = await replicate.run("chigozienri/image-urls-to-video", {
  input: {
        "image_urls": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("chigozienri/image-urls-to-video",
    input={
        "image_urls": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/chigozienri/image-urls-to-video/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image_urls": "https://example.com/input.png"}}'
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
| `image_urls` | string | **Yes** |  | A comma-separated list of input urls |
| `mp4` | boolean | No | `false` | Returns .mp4 if true or .gif if false |
| `fps` | float | No | `4` | Frames per second of output video |
| `output_zip` | boolean | No | `false` | Also returns a zip of the input images if true |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `zip` | string (URL) |  |
| `video` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "chigozienri/image-urls-to-video",
  input: {
        "image_urls": "https://example.com/input.png"
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

- Model page: https://replicate.com/chigozienri/image-urls-to-video
- API page: https://replicate.com/chigozienri/image-urls-to-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
