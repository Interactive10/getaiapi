---
name: replicate-veed-fabric-1.0
description: >
  Use this skill for the Replicate Fabric 1.0 model (veed/fabric-1.0). Use the Fabric 1.0 model via Replicate API.
---

# Fabric 1.0

**Model:** `veed/fabric-1.0`
**Source:** https://replicate.com/veed/fabric-1.0
**Version:** `739bbce4edc07b0b1bd055998983324fe9a8ea18d854b5979423c5d6f62e5b78`

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

const output = await replicate.run("veed/fabric-1.0", {
  input: {
        "audio": "your value here",
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("veed/fabric-1.0",
    input={
        "audio": "your value here",
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/veed/fabric-1.0/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here", "image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Image to generate video from |
| `audio` | string (URL) | **Yes** |  | Audio to generate video from |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "veed/fabric-1.0",
  input: {
        "audio": "your value here",
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

- Model page: https://replicate.com/veed/fabric-1.0
- API page: https://replicate.com/veed/fabric-1.0/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
