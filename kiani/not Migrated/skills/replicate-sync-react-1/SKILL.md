---
name: replicate-sync-react-1
description: >
  Use this skill for the Replicate React 1 model (sync/react-1). Use the React 1 model via Replicate API.
---

# React 1

**Model:** `sync/react-1`
**Source:** https://replicate.com/sync/react-1
**Version:** `c44d8de5ebd918b788e8c0f09a550b60c095d1c6873c2c1abfe3fd8ba3c77fd8`

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

const output = await replicate.run("sync/react-1", {
  input: {
        "audio": "your value here",
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("sync/react-1",
    input={
        "audio": "your value here",
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sync/react-1/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here", "video": "https://example.com/input.png"}}'
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
| `video` | string (URL) | **Yes** |  | Input video file (.mp4) |
| `audio` | string (URL) | **Yes** |  | Input audio file (.wav) |
| `emotion` | enum: `happy`, `sad`, `angry`, `disgusted`, `surprised`, `neutral` | No | `"neutral"` | Emotion prompt for the generation (single word emotions only) |
| `model_mode` | enum: `lips`, `face`, `head` | No | `"face"` | Edit region for the model (lips/face/head). When head is selected, model generates natural talking head movements alo... |
| `sync_mode` | enum: `loop`, `bounce`, `cut_off`, `silence`, `remap` | No | `"loop"` | Lipsync mode when audio and video durations are out of sync |
| `temperature` | float | No | `0.5` | How expressive lipsync can be (0-1) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sync/react-1",
  input: {
        "audio": "your value here",
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

- Model page: https://replicate.com/sync/react-1
- API page: https://replicate.com/sync/react-1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
