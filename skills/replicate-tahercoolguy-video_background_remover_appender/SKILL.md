---
name: replicate-tahercoolguy-video_background_remover_appender
description: >
  Use this skill for the Replicate Video Background Remover Appender model (tahercoolguy/video_background_remover_appender). Use the Video Background Remover Appender model via Replicate API.
---

# Video Background Remover Appender

**Model:** `tahercoolguy/video_background_remover_appender`
**Source:** https://replicate.com/tahercoolguy/video_background_remover_appender
**Version:** `41e1405aad61e2c1b5d29c3573f96321128a0069d7ba10e3b1c1b9becf8c19c7`

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

const output = await replicate.run("tahercoolguy/video_background_remover_appender", {
  input: {
        "input_video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tahercoolguy/video_background_remover_appender",
    input={
        "input_video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tahercoolguy/video_background_remover_appender/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_video": "https://example.com/input.png"}}'
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
| `input_video` | string (URL) | **Yes** |  | Input video |
| `bg_type` | enum: `Color`, `Image`, `Video` | No | `"Color"` | Background Type |
| `bg_image` | string (URL) | No |  | Background Image |
| `bg_video` | string (URL) | No |  | Background Video |
| `bg_mode` | enum: `cover`, `blur`, `contain`, `mirror` | No | `"cover"` | Background Mode |
| `color` | string | No | `"#00FF00"` | Background Color |
| `fps` | integer | No | `0` | Output FPS |
| `video_handling` | enum: `loop`, `slow_down`, `freeze` | No | `"loop"` | Video Handling |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tahercoolguy/video_background_remover_appender",
  input: {
        "input_video": "https://example.com/input.png"
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

- Model page: https://replicate.com/tahercoolguy/video_background_remover_appender
- API page: https://replicate.com/tahercoolguy/video_background_remover_appender/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
