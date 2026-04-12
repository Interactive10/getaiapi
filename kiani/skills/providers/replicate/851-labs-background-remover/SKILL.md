---
name: replicate-851-labs-background-remover
description: >
  Use this skill for the Replicate Background Remover model (851-labs/background-remover). Use the Background Remover model via Replicate API.
---

# Background Remover

**Model:** `851-labs/background-remover`
**Source:** https://replicate.com/851-labs/background-remover
**Version:** `a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc`

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

const output = await replicate.run("851-labs/background-remover", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("851-labs/background-remover",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/851-labs/background-remover/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Input image |
| `threshold` | float | No | `0` | Threshold for hard segmentation (0.0-1.0). If 0.0, uses soft alpha. |
| `reverse` | boolean | No | `false` | If True, remove the foreground instead of the background. |
| `background_type` | string | No | `"rgba"` | Background type: 'rgba', 'map', 'green', 'white', [R,G,B] array, 'blur', 'overlay', or path to an image. |
| `format` | string | No | `"png"` | Output format (e.g., png, jpg). Defaults to png. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "851-labs/background-remover",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/851-labs/background-remover
- API page: https://replicate.com/851-labs/background-remover/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
