---
name: replicate-kwaivgi-kling-v1.5-pro
description: >
  Use this skill for the Replicate Kling V1.5 Pro model (kwaivgi/kling-v1.5-pro). Use the Kling V1.5 Pro model via Replicate API.
---

# Kling V1.5 Pro

**Model:** `kwaivgi/kling-v1.5-pro`
**Source:** https://replicate.com/kwaivgi/kling-v1.5-pro
**Version:** `416c7db6149368b01e73f5c83bb81537e5e34bbfa49aa0a90db0478fc1b2e75d`

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

const output = await replicate.run("kwaivgi/kling-v1.5-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-v1.5-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-v1.5-pro/predictions \
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
| `end_image` | string (URL) | No |  | Last frame of the video. A start or end image is required. |
| `start_image` | string (URL) | No |  | First frame of the video. A start or end image is required. |
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
  model: "kwaivgi/kling-v1.5-pro",
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

- Model page: https://replicate.com/kwaivgi/kling-v1.5-pro
- API page: https://replicate.com/kwaivgi/kling-v1.5-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
