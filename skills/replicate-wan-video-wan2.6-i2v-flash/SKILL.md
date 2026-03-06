---
name: replicate-wan-video-wan2.6-i2v-flash
description: >
  Use this skill for the Replicate Wan2.6 I2V Flash model (wan-video/wan2.6-i2v-flash). Use the Wan2.6 I2V Flash model via Replicate API.
---

# Wan2.6 I2V Flash

**Model:** `wan-video/wan2.6-i2v-flash`
**Source:** https://replicate.com/wan-video/wan2.6-i2v-flash
**Version:** `735e10a03f2576105c76169aa10afc22179ce07c94001ec7aaaaf9c6b99af47f`

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

const output = await replicate.run("wan-video/wan2.6-i2v-flash", {
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

output = replicate.run("wan-video/wan2.6-i2v-flash",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan2.6-i2v-flash/predictions \
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
| `image` | string (URL) | **Yes** |  | Input image for video generation |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements |
| `audio` | string (URL) | No |  | Audio file (wav/mp3, 3-30s, ≤15MB) for voice/music synchronization |
| `audio_enabled` | boolean | No | `true` | Whether to generate video with audio. When enabled, the model will auto-generate audio or use provided audio file. Di... |
| `resolution` | enum: `720p`, `1080p` | No | `"720p"` | Video resolution |
| `duration` | enum: `5`, `10`, `15` | No | `5` | Duration of the generated video in seconds |
| `enable_prompt_expansion` | boolean | No | `true` | If set to true, the prompt optimizer will be enabled |
| `multi_shots` | boolean | No | `false` | Enable intelligent multi-shot segmentation (only active when enable_prompt_expansion is enabled). True enables multi-... |
| `seed` | integer | No |  | Random seed for reproducible generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan2.6-i2v-flash",
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

- Model page: https://replicate.com/wan-video/wan2.6-i2v-flash
- API page: https://replicate.com/wan-video/wan2.6-i2v-flash/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
