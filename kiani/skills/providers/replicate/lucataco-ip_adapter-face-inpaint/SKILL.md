---
name: replicate-lucataco-ip_adapter-face-inpaint
description: >
  Use this skill for the Replicate Ip Adapter Face Inpaint model (lucataco/ip_adapter-face-inpaint). Use the Ip Adapter Face Inpaint model via Replicate API.
---

# Ip Adapter Face Inpaint

**Model:** `lucataco/ip_adapter-face-inpaint`
**Source:** https://replicate.com/lucataco/ip_adapter-face-inpaint
**Version:** `b199f118e2133894551cc59ff0777276e275cf64e9e8e0369ca6c4c599097890`

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

const output = await replicate.run("lucataco/ip_adapter-face-inpaint", {
  input: {
        "face_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/ip_adapter-face-inpaint",
    input={
        "face_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/ip_adapter-face-inpaint/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"face_image": "https://example.com/input.png"}}'
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
| `face_image` | string (URL) | **Yes** |  | Input face image |
| `blur_amount` | float | No | `0` | Blur to apply to mask to face |
| `source_image` | string (URL) | No |  | Source image of body |
| `strength` | float | No | `0.7` | mask strength |
| `prompt` | string | No | `""` | Prompt |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/ip_adapter-face-inpaint",
  input: {
        "face_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/lucataco/ip_adapter-face-inpaint
- API page: https://replicate.com/lucataco/ip_adapter-face-inpaint/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
