---
name: replicate-wan-video-wan-2.2-animate-animation
description: >
  Use this skill for the Replicate Wan 2.2 Animate Animation model (wan-video/wan-2.2-animate-animation). Use the Wan 2.2 Animate Animation model via Replicate API.
---

# Wan 2.2 Animate Animation

**Model:** `wan-video/wan-2.2-animate-animation`
**Source:** https://replicate.com/wan-video/wan-2.2-animate-animation
**Version:** `d6b167d60fdadef11966e5824b19b9c0fc7597d663192c278e67e9d1f2dbbf48`

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

const output = await replicate.run("wan-video/wan-2.2-animate-animation", {
  input: {
        "video": "https://example.com/input.png",
        "character_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.2-animate-animation",
    input={
        "video": "https://example.com/input.png",
        "character_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.2-animate-animation/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png", "character_image": "https://example.com/input.png"}}'
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
| `video` | string (URL) | **Yes** |  | Input video to use as motion reference |
| `character_image` | string (URL) | **Yes** |  | Character image to animate |
| `resolution` | enum: `720`, `480` | No | `"720"` | Resolution for processing |
| `frames_per_second` | integer | No | `24` | Frames per second for output video |
| `go_fast` | boolean | No | `true` | Go fast |
| `seed` | integer | No |  | Random seed. Leave blank for random |
| `merge_audio` | boolean | No | `false` | Merge audio from input video into output (experimental - may not sync perfectly) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.2-animate-animation",
  input: {
        "video": "https://example.com/input.png",
        "character_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/wan-video/wan-2.2-animate-animation
- API page: https://replicate.com/wan-video/wan-2.2-animate-animation/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
