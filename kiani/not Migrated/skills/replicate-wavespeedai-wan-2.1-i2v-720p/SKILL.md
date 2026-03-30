---
name: replicate-wavespeedai-wan-2.1-i2v-720p
description: >
  Use this skill for the Replicate Wan 2.1 I2V 720P model (wavespeedai/wan-2.1-i2v-720p). Use the Wan 2.1 I2V 720P model via Replicate API.
---

# Wan 2.1 I2V 720P

**Model:** `wavespeedai/wan-2.1-i2v-720p`
**Source:** https://replicate.com/wavespeedai/wan-2.1-i2v-720p
**Version:** `1f0a7fa066689a087b597a314f60ef74d1a720fa1fb9a7083487c4b01db3395f`

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

const output = await replicate.run("wavespeedai/wan-2.1-i2v-720p", {
  input: {
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wavespeedai/wan-2.1-i2v-720p",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wavespeedai/wan-2.1-i2v-720p/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of the output video. |
| `image` | string (URL) | **Yes** |  | Image for use as the initial frame of the video. |
| `fast_mode` | enum: `Off`, `Balanced`, `Fast` | No | `"Balanced"` | Speed up generation with different levels of acceleration. Faster modes may degrade quality somewhat. The speedup is ... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `sample_guide_scale` | float | No | `5` | Guidance scale for generation |
| `sample_steps` | integer | No | `30` | Number of inference steps |
| `sample_shift` | integer | No | `3` | Flow shift parameter for video generation |
| `lora_weights` | string | No |  | Load LoRA weights. Supports HuggingFace URLs in the format huggingface.co/<owner>/<model-name>, CivitAI URLs in the f... |
| `lora_scale` | float | No | `1` | Determines how strongly the main LoRA should be applied. Sane results between 0 and 1 for base inference. You may sti... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated videos |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wavespeedai/wan-2.1-i2v-720p",
  input: {
        "image": "https://example.com/input.png",
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

- Model page: https://replicate.com/wavespeedai/wan-2.1-i2v-720p
- API page: https://replicate.com/wavespeedai/wan-2.1-i2v-720p/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
