---
name: replicate-bytedance-seedance-1-pro-fast
description: >
  Use this skill for the Replicate Seedance 1 Pro Fast model (bytedance/seedance-1-pro-fast). Use the Seedance 1 Pro Fast model via Replicate API.
---

# Seedance 1 Pro Fast

**Model:** `bytedance/seedance-1-pro-fast`
**Source:** https://replicate.com/bytedance/seedance-1-pro-fast
**Version:** `155d6d446da5e7cd4a2ef72725461ba8687bdf63a2a1fb7bb574f25af24dc7b5`

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

const output = await replicate.run("bytedance/seedance-1-pro-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/seedance-1-pro-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/seedance-1-pro-fast/predictions \
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
| `resolution` | enum: `480p`, `720p`, `1080p` | No | `"1080p"` | Video resolution |
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Video aspect ratio. Ignored if an image is used. |
| `fps` | enum: `24` | No | `24` | Frame rate (frames per second) |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `image` | string (URL) | No |  | Input image for image-to-video generation |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `duration` | integer | No | `5` | Video duration in seconds |
| `camera_fixed` | boolean | No | `false` | Whether to fix camera position |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/seedance-1-pro-fast",
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

- Model page: https://replicate.com/bytedance/seedance-1-pro-fast
- API page: https://replicate.com/bytedance/seedance-1-pro-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
