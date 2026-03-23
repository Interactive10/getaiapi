---
name: replicate-kwaivgi-kling-v2.0
description: >
  Use this skill for the Replicate Kling V2.0 model (kwaivgi/kling-v2.0). Use the Kling V2.0 model via Replicate API.
---

# Kling V2.0

**Model:** `kwaivgi/kling-v2.0`
**Source:** https://replicate.com/kwaivgi/kling-v2.0
**Version:** `52b5e4c10d12e89be0b8f8e9462412cecc5d041f4201a8d8b05dc7e29a70f938`

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

const output = await replicate.run("kwaivgi/kling-v2.0", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-v2.0",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-v2.0/predictions \
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
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the video. Ignored if start_image is provided. |
| `duration` | enum: `5`, `10` | No | `5` | Duration of the video in seconds |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `cfg_scale` | float | No | `0.5` | Flexibility in video generation; The higher the value, the lower the model's degree of flexibility, and the stronger ... |
| `start_image` | string (URL) | No |  | First frame of the video (optional) |
| `negative_prompt` | string | No | `""` | Things you do not want to see in the video |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "kwaivgi/kling-v2.0",
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

- Model page: https://replicate.com/kwaivgi/kling-v2.0
- API page: https://replicate.com/kwaivgi/kling-v2.0/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
