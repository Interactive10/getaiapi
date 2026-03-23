---
name: replicate-kwaivgi-kling-v3-motion-control
description: >
  Use this skill for the Replicate Kling V3 Motion Control model (kwaivgi/kling-v3-motion-control). Use the Kling V3 Motion Control model via Replicate API.
---

# Kling V3 Motion Control

**Model:** `kwaivgi/kling-v3-motion-control`
**Source:** https://replicate.com/kwaivgi/kling-v3-motion-control
**Version:** `15430b300f8c044e8f9e3567fd6daadf6d62e9bb0cee23fdb7969d3b26542f40`

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

const output = await replicate.run("kwaivgi/kling-v3-motion-control", {
  input: {
        "image": "https://example.com/input.png",
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-v3-motion-control",
    input={
        "image": "https://example.com/input.png",
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-v3-motion-control/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "video": "https://example.com/input.png"}}'
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
| `prompt` | string | No | `""` | Text prompt for video generation. You can add elements to the screen and achieve motion effects through prompt words. |
| `image` | string (URL) | **Yes** |  | Reference image. The characters, backgrounds, and other elements in the generated video are based on the reference im... |
| `video` | string (URL) | **Yes** |  | Reference video. The character actions in the generated video are consistent with the reference video. Supports .mp4/... |
| `character_orientation` | enum: `image`, `video` | No | `"image"` | Orientation of the character in the generated video. 'image': same orientation as the person in the picture (max 10s ... |
| `mode` | enum: `std`, `pro` | No | `"pro"` | Video generation mode. 'std': Standard mode (720p, cost-effective). 'pro': Professional mode (1080p, higher quality). |
| `keep_original_sound` | boolean | No | `true` | Whether to keep the original sound of the reference video |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "kwaivgi/kling-v3-motion-control",
  input: {
        "image": "https://example.com/input.png",
        "video": "https://example.com/input.png"
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

- Model page: https://replicate.com/kwaivgi/kling-v3-motion-control
- API page: https://replicate.com/kwaivgi/kling-v3-motion-control/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
