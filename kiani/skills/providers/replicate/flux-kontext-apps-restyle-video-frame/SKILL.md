---
name: replicate-flux-kontext-apps-restyle-video-frame
description: >
  Use this skill for the Replicate Restyle Video Frame model (flux-kontext-apps/restyle-video-frame). Use the Restyle Video Frame model via Replicate API.
---

# Restyle Video Frame

**Model:** `flux-kontext-apps/restyle-video-frame`
**Source:** https://replicate.com/flux-kontext-apps/restyle-video-frame
**Version:** `cd74e8a39e5fe89ebf2f5cc24601658e2041b32ef30c2c0727a83fc48bdcfea1`

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

const output = await replicate.run("flux-kontext-apps/restyle-video-frame", {
  input: {
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("flux-kontext-apps/restyle-video-frame",
    input={
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/flux-kontext-apps/restyle-video-frame/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `frame` | enum: `first`, `last` | No | `"first"` | First or last frame to restyle |
| `output_format` | enum: `jpg`, `png` | No | `"png"` | Output format for the generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `video` | string (URL) | **Yes** |  | Video to extract the first frame from and restyle |
| `prompt` | string | **Yes** |  | Text description of how to restyle the video frame |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 0 is most strict and 2 is most permissive. 2 is currently the maximum allowed. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "flux-kontext-apps/restyle-video-frame",
  input: {
        "video": "https://example.com/input.png",
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

- Model page: https://replicate.com/flux-kontext-apps/restyle-video-frame
- API page: https://replicate.com/flux-kontext-apps/restyle-video-frame/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
