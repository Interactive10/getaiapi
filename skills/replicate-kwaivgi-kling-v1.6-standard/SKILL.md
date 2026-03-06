---
name: replicate-kwaivgi-kling-v1.6-standard
description: >
  Use this skill for the Replicate Kling V1.6 Standard model (kwaivgi/kling-v1.6-standard). Use the Kling V1.6 Standard model via Replicate API.
---

# Kling V1.6 Standard

**Model:** `kwaivgi/kling-v1.6-standard`
**Source:** https://replicate.com/kwaivgi/kling-v1.6-standard
**Version:** `e6f571e8d6990da3c96abf8d3082894024d652822f0ca3cd244acece84a1cc3e`

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

const output = await replicate.run("kwaivgi/kling-v1.6-standard", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-v1.6-standard",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-v1.6-standard/predictions \
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
| `start_image` | string (URL) | No |  | First frame of the video |
| `negative_prompt` | string | No | `""` | Things you do not want to see in the video |
| `reference_images` | list<string (URL)> | No |  | Reference images to use in video generation (up to 4 images). Also known as scene elements. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "kwaivgi/kling-v1.6-standard",
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

- Model page: https://replicate.com/kwaivgi/kling-v1.6-standard
- API page: https://replicate.com/kwaivgi/kling-v1.6-standard/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
