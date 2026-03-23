---
name: replicate-lucataco-ip-adapter-faceid
description: >
  Use this skill for the Replicate Ip Adapter Faceid model (lucataco/ip-adapter-faceid). Use the Ip Adapter Faceid model via Replicate API.
---

# Ip Adapter Faceid

**Model:** `lucataco/ip-adapter-faceid`
**Source:** https://replicate.com/lucataco/ip-adapter-faceid
**Version:** `fb81ef963e74776af72e6f380949013533d46dd5c6228a9e586c57db6303d7cd`

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

const output = await replicate.run("lucataco/ip-adapter-faceid", {
  input: {
        "face_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/ip-adapter-faceid",
    input={
        "face_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/ip-adapter-faceid/predictions \
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
| `prompt` | string | No | `"photo of a woman in red dress in a garden"` | Input prompt |
| `negative_prompt` | string | No | `"monochrome, lowres, bad anatomy, worst quality, low quality, blurry"` | Input Negative Prompt |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `num_outputs` | integer | No | `1` | Number of images to output |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `agree_to_research_only` | boolean | No | `false` | You must agree to use this model only for research. It is not for commercial use. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/ip-adapter-faceid",
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

- Model page: https://replicate.com/lucataco/ip-adapter-faceid
- API page: https://replicate.com/lucataco/ip-adapter-faceid/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
