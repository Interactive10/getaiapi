---
name: replicate-jaaari-kokoro-82m
description: >
  Use this skill for the Replicate Kokoro 82M model (jaaari/kokoro-82m). Use the Kokoro 82M model via Replicate API.
---

# Kokoro 82M

**Model:** `jaaari/kokoro-82m`
**Source:** https://replicate.com/jaaari/kokoro-82m
**Version:** `f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13`

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

const output = await replicate.run("jaaari/kokoro-82m", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("jaaari/kokoro-82m",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/jaaari/kokoro-82m/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "your value here"}}'
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
| `text` | string | **Yes** |  | Text input (long text is automatically split) |
| `voice` | enum (46 values) | No | `"af_bella"` | Voice to use for synthesis |
| `speed` | float | No | `1` | Speech speed multiplier (0.5 = half speed, 2.0 = double speed) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "jaaari/kokoro-82m",
  input: {
        "text": "your value here"
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

- Model page: https://replicate.com/jaaari/kokoro-82m
- API page: https://replicate.com/jaaari/kokoro-82m/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
