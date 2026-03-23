---
name: replicate-wan-video-wan-2.5-i2v-fast
description: >
  Use this skill for the Replicate Wan 2.5 I2V Fast model (wan-video/wan-2.5-i2v-fast). Use the Wan 2.5 I2V Fast model via Replicate API.
---

# Wan 2.5 I2V Fast

**Model:** `wan-video/wan-2.5-i2v-fast`
**Source:** https://replicate.com/wan-video/wan-2.5-i2v-fast
**Version:** `66226b38d223f8ac7a81aa33b8519759e300c2f9818a215e32900827ad6d2db5`

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

const output = await replicate.run("wan-video/wan-2.5-i2v-fast", {
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

output = replicate.run("wan-video/wan-2.5-i2v-fast",
    input={
        "image": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.5-i2v-fast/predictions \
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
| `resolution` | enum: `720p`, `1080p` | No | `"720p"` | Video resolution |
| `duration` | enum: `5`, `10` | No | `5` | Duration of the generated video in seconds |
| `seed` | integer | No |  | Random seed for reproducible generation |
| `audio` | string (URL) | No |  | Audio file (wav/mp3, 3-30s, ≤15MB) for voice/music synchronization |
| `image` | string (URL) | **Yes** |  | Input image for video generation |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements |
| `enable_prompt_expansion` | boolean | No | `true` | If set to true, the prompt optimizer will be enabled |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.5-i2v-fast",
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

- Model page: https://replicate.com/wan-video/wan-2.5-i2v-fast
- API page: https://replicate.com/wan-video/wan-2.5-i2v-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
