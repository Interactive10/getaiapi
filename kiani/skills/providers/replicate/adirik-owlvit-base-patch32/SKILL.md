---
name: replicate-adirik-owlvit-base-patch32
description: >
  Use this skill for the Replicate Owlvit Base Patch32 model (adirik/owlvit-base-patch32). Use the Owlvit Base Patch32 model via Replicate API.
---

# Owlvit Base Patch32

**Model:** `adirik/owlvit-base-patch32`
**Source:** https://replicate.com/adirik/owlvit-base-patch32
**Version:** `5e899f155a1913c4b7304d09082d842ca7fe6cb1f22e066c83eb1d7849dc37c2`

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

const output = await replicate.run("adirik/owlvit-base-patch32", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("adirik/owlvit-base-patch32",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/adirik/owlvit-base-patch32/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here"}}'
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
| `image` | string (URL) | No |  | Input image to query |
| `query` | string | No |  | Comma seperated names of the objects to be detected in the image |
| `threshold` | float | No | `0.1` | Confidence level for object detection |
| `show_visualisation` | boolean | No | `true` | Draw and visualize bounding boxes on the image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `json_data` | Json Data |  |
| `result_image` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "adirik/owlvit-base-patch32",
  input: {
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

- Model page: https://replicate.com/adirik/owlvit-base-patch32
- API page: https://replicate.com/adirik/owlvit-base-patch32/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
