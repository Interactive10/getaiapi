---
name: replicate-nateraw-autotune
description: >
  Use this skill for the Replicate Autotune model (nateraw/autotune). Use the Autotune model via Replicate API.
---

# Autotune

**Model:** `nateraw/autotune`
**Source:** https://replicate.com/nateraw/autotune
**Version:** `53d58aea27ccd949e5f9d77e4b2a74ffe90e1fa534295b257cea50f011e233dd`

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

const output = await replicate.run("nateraw/autotune", {
  input: {
        "audio_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nateraw/autotune",
    input={
        "audio_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nateraw/autotune/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio_file": "your value here"}}'
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
| `audio_file` | string (URL) | **Yes** |  | Audio input file |
| `scale` | enum (25 values) | No | `"closest"` | Strategy for normalizing audio. |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output format for generated audio. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "nateraw/autotune",
  input: {
        "audio_file": "your value here"
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

- Model page: https://replicate.com/nateraw/autotune
- API page: https://replicate.com/nateraw/autotune/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
