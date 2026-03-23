---
name: replicate-tencent-hunyuan-video
description: >
  Use this skill for the Replicate Hunyuan Video model (tencent/hunyuan-video). Use the Hunyuan Video model via Replicate API.
---

# Hunyuan Video

**Model:** `tencent/hunyuan-video`
**Source:** https://replicate.com/tencent/hunyuan-video
**Version:** `6c9132aee14409cd6568d030453f1ba50f5f3412b844fe67f78a9eb62d55664f`

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

const output = await replicate.run("tencent/hunyuan-video", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tencent/hunyuan-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tencent/hunyuan-video/predictions \
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
| `prompt` | string | No | `"A cat walks on the grass, realistic style"` | The prompt to guide the video generation |
| `width` | integer | No | `864` | Width of the video in pixels (must be divisible by 16) |
| `height` | integer | No | `480` | Height of the video in pixels (must be divisible by 16) |
| `video_length` | integer | No | `129` | Number of frames to generate (must be 4k+1, ex: 49 or 129) |
| `infer_steps` | integer | No | `50` | Number of denoising steps |
| `embedded_guidance_scale` | float | No | `6` | Guidance scale |
| `fps` | integer | No | `24` | Frames per second of the output video |
| `seed` | integer | No |  | Random seed (leave empty for random) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tencent/hunyuan-video",
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

- Model page: https://replicate.com/tencent/hunyuan-video
- API page: https://replicate.com/tencent/hunyuan-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
