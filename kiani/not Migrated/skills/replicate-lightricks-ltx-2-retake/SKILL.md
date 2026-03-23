---
name: replicate-lightricks-ltx-2-retake
description: >
  Use this skill for the Replicate Ltx 2 Retake model (lightricks/ltx-2-retake). Use the Ltx 2 Retake model via Replicate API.
---

# Ltx 2 Retake

**Model:** `lightricks/ltx-2-retake`
**Source:** https://replicate.com/lightricks/ltx-2-retake
**Version:** `a9cade39a5658fc35aa90346ea7d1fe33dc3d277eb2020b1923ac945fd313771`

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

const output = await replicate.run("lightricks/ltx-2-retake", {
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

output = replicate.run("lightricks/ltx-2-retake",
    input={
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-2-retake/predictions \
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
| `video` | string (URL) | **Yes** |  | Input video to edit |
| `prompt` | string | **Yes** |  | Text prompt describing the edit |
| `start_time` | float | No | `0` | Start time of the edit in seconds |
| `duration` | float | No | `6` | Duration of the edited section in seconds |
| `mode` | enum: `replace_audio`, `replace_video`, `replace_audio_and_video` | No | `"replace_video"` | Mode of operation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-2-retake",
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

- Model page: https://replicate.com/lightricks/ltx-2-retake
- API page: https://replicate.com/lightricks/ltx-2-retake/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
