---
name: replicate-nvidia-parakeet-rnnt-1.1b
description: >
  Use this skill for the Replicate Parakeet Rnnt 1.1B model (nvidia/parakeet-rnnt-1.1b). Use the Parakeet Rnnt 1.1B model via Replicate API.
---

# Parakeet Rnnt 1.1B

**Model:** `nvidia/parakeet-rnnt-1.1b`
**Source:** https://replicate.com/nvidia/parakeet-rnnt-1.1b
**Version:** `73ddbebaef172a47c8dfdd79381f110bfdc7691bcc7a4edde82f0a39e380ce50`

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

const output = await replicate.run("nvidia/parakeet-rnnt-1.1b", {
  input: {
        "audio_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nvidia/parakeet-rnnt-1.1b",
    input={
        "audio_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nvidia/parakeet-rnnt-1.1b/predictions \
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
| `audio_file` | string (URL) | **Yes** |  | Input audio file to be transcribed by the ASR model |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "nvidia/parakeet-rnnt-1.1b",
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

- Model page: https://replicate.com/nvidia/parakeet-rnnt-1.1b
- API page: https://replicate.com/nvidia/parakeet-rnnt-1.1b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
