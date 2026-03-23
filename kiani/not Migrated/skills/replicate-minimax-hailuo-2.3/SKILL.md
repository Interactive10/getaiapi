---
name: replicate-minimax-hailuo-2.3
description: >
  Use this skill for the Replicate Hailuo 2.3 model (minimax/hailuo-2.3). Use the Hailuo 2.3 model via Replicate API.
---

# Hailuo 2.3

**Model:** `minimax/hailuo-2.3`
**Source:** https://replicate.com/minimax/hailuo-2.3
**Version:** `23a02633b5a44780345a59d4d43f8bd510efa239c56f08f29639ff24fa6615e1`

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

const output = await replicate.run("minimax/hailuo-2.3", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/hailuo-2.3",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/hailuo-2.3/predictions \
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
| `duration` | enum: `6`, `10` | No | `6` | Duration of the video in seconds. 10 seconds is only available for 768p resolution. |
| `resolution` | enum: `768p`, `1080p` | No | `"768p"` | Pick between 768p or 1080p resolution. 1080p supports only 6-second duration. |
| `prompt` | string | **Yes** |  | Text prompt for generation |
| `prompt_optimizer` | boolean | No | `true` | Use prompt optimizer |
| `first_frame_image` | string (URL) | No |  | First frame image for video generation. The output video will have the same aspect ratio as this image. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/hailuo-2.3",
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

- Model page: https://replicate.com/minimax/hailuo-2.3
- API page: https://replicate.com/minimax/hailuo-2.3/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
