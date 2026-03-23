---
name: replicate-sync-lipsync-2-pro
description: >
  Use this skill for the Replicate Lipsync 2 Pro model (sync/lipsync-2-pro). Use the Lipsync 2 Pro model via Replicate API.
---

# Lipsync 2 Pro

**Model:** `sync/lipsync-2-pro`
**Source:** https://replicate.com/sync/lipsync-2-pro
**Version:** `eaad6bceea4938d05f5d984b22897e5a7d389d4fff9a70888af5718502b57d39`

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

const output = await replicate.run("sync/lipsync-2-pro", {
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

output = replicate.run("sync/lipsync-2-pro",
    input={
        "audio": "your value here",
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sync/lipsync-2-pro/predictions \
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
| `sync_mode` | enum: `loop`, `bounce`, `cut_off`, `silence`, `remap` | No | `"loop"` | Lipsync mode when audio and video durations are out of sync |
| `audio` | string (URL) | **Yes** |  | Input audio file (.wav) |
| `video` | string (URL) | **Yes** |  | Input video file (.mp4) |
| `temperature` | float | No | `0.5` | How expressive lipsync can be (0-1) |
| `active_speaker` | boolean | No | `false` | Whether to detect active speaker (i.e. whoever is speaking in the clip will be used for lipsync) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sync/lipsync-2-pro",
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

- Model page: https://replicate.com/sync/lipsync-2-pro
- API page: https://replicate.com/sync/lipsync-2-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
