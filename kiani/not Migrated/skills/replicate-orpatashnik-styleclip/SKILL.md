---
name: replicate-orpatashnik-styleclip
description: >
  Use this skill for the Replicate Styleclip model (orpatashnik/styleclip). Use the Styleclip model via Replicate API.
---

# Styleclip

**Model:** `orpatashnik/styleclip`
**Source:** https://replicate.com/orpatashnik/styleclip
**Version:** `7af9a66f36f97fee2fece7dcc927551a951f0022cbdd23747b9212f23fc17021`

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

const output = await replicate.run("orpatashnik/styleclip", {
  input: {
        "input": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("orpatashnik/styleclip",
    input={
        "input": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/orpatashnik/styleclip/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input": "your value here"}}'
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
| `input` | string (URL) | **Yes** |  | Input image |
| `neutral` | string | No | `"a face"` | Neutral image description |
| `target` | string | No | `"a face with a bowlcut"` | Target image description |
| `manipulation_strength` | float | No | `4.1` | The higher the manipulation strength, the closer the generated image becomes to the target description. Negative valu... |
| `disentanglement_threshold` | float | No | `0.15` | The higher the disentanglement threshold, the more specific the changes are to the target attribute. Lower values mea... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "orpatashnik/styleclip",
  input: {
        "input": "your value here"
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

- Model page: https://replicate.com/orpatashnik/styleclip
- API page: https://replicate.com/orpatashnik/styleclip/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
