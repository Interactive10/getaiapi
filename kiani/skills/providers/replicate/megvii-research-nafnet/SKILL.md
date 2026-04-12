---
name: replicate-megvii-research-nafnet
description: >
  Use this skill for the Replicate Nafnet model (megvii-research/nafnet). Use the Nafnet model via Replicate API.
---

# Nafnet

**Model:** `megvii-research/nafnet`
**Source:** https://replicate.com/megvii-research/nafnet
**Version:** `018241a6c880319404eaa2714b764313e27e11f950a7ff0a7b5b37b27b74dcf7`

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

const output = await replicate.run("megvii-research/nafnet", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("megvii-research/nafnet",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/megvii-research/nafnet/predictions \
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
| `task_type` | enum: `Image Denoising`, `Image Debluring (GoPro)`, `Image Debluring (REDS)`, `Stereo Image Super-Resolution` | No | `"Image Debluring (REDS)"` | Choose task type. |
| `image` | string (URL) | **Yes** |  | Input image. Stereo Image Super-Resolution, upload the left image here. |
| `image_r` | string (URL) | No |  | Right Input image for Stereo Image Super-Resolution. Optional, only valid for Stereo Image Super-Resolution task. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "megvii-research/nafnet",
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

- Model page: https://replicate.com/megvii-research/nafnet
- API page: https://replicate.com/megvii-research/nafnet/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
