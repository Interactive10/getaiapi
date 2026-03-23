---
name: replicate-bytedance-seedream-3
description: >
  Use this skill for the Replicate Seedream 3 model (bytedance/seedream-3). Use the Seedream 3 model via Replicate API.
---

# Seedream 3

**Model:** `bytedance/seedream-3`
**Source:** https://replicate.com/bytedance/seedream-3
**Version:** `ed344813bc9f4996be6de4febd8b9c14c7849ad7b21ab047572e3620ee374ee7`

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

const output = await replicate.run("bytedance/seedream-3", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/seedream-3",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/seedream-3/predictions \
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
| `aspect_ratio` | enum (9 values) | No | `"16:9"` | Image aspect ratio. Set to 'custom' to specify width and height. |
| `size` | enum: `small`, `regular`, `big` | No | `"regular"` | Big images will have their longest dimension be 2048px. Small images will have their shortest dimension be 512px. Reg... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `width` | integer | No | `2048` | Image width |
| `height` | integer | No | `2048` | Image height |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `guidance_scale` | float | No | `2.5` | Prompt adherence. Higher = more literal. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/seedream-3",
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

- Model page: https://replicate.com/bytedance/seedream-3
- API page: https://replicate.com/bytedance/seedream-3/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
