---
name: replicate-bytedance-omni-human-1.5
description: >
  Use this skill for the Replicate Omni Human 1.5 model (bytedance/omni-human-1.5). Use the Omni Human 1.5 model via Replicate API.
---

# Omni Human 1.5

**Model:** `bytedance/omni-human-1.5`
**Source:** https://replicate.com/bytedance/omni-human-1.5
**Version:** `b0f93aebf8c36a35da4ba2e7a5ce22c443df7e9e9c3bc1e8b170d55bc05f9b62`

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

const output = await replicate.run("bytedance/omni-human-1.5", {
  input: {
        "audio": "your value here",
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/omni-human-1.5",
    input={
        "audio": "your value here",
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/omni-human-1.5/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here", "image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Input image containing a human subject, face or character. |
| `audio` | string (URL) | **Yes** |  | Input audio file (MP3, WAV, etc.). Duration must be less than 35 seconds. If the audio exceeds 35 seconds, an error w... |
| `prompt` | string | No |  | Optional prompt for precise control of the scene, movements, camera movements, etc. Supports Chinese, English, Japane... |
| `fast_mode` | boolean | No | `false` | Enable fast mode to speed up generation by sacrificing some effects. |
| `seed` | integer | No |  | Random seed for reproducible generation. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/omni-human-1.5",
  input: {
        "audio": "your value here",
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

- Model page: https://replicate.com/bytedance/omni-human-1.5
- API page: https://replicate.com/bytedance/omni-human-1.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
