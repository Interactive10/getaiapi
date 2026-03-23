---
name: replicate-lucataco-ip_adapter-sdxl-face
description: >
  Use this skill for the Replicate Ip Adapter Sdxl Face model (lucataco/ip_adapter-sdxl-face). Use the Ip Adapter Sdxl Face model via Replicate API.
---

# Ip Adapter Sdxl Face

**Model:** `lucataco/ip_adapter-sdxl-face`
**Source:** https://replicate.com/lucataco/ip_adapter-sdxl-face
**Version:** `226c6bf67a75a129b0f978e518fed33e1fb13956e15761c1ac53c9d2f898c9af`

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

const output = await replicate.run("lucataco/ip_adapter-sdxl-face", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/ip_adapter-sdxl-face",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/ip_adapter-sdxl-face/predictions \
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
| `image` | string (URL) | **Yes** |  | Input face image |
| `prompt` | string | No | `""` | Prompt (leave blank for image variations) |
| `negative_prompt` | string | No | `""` | Negative Prompt |
| `scale` | float | No | `0.6` | Scale (influence of input image on generation) |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
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
  model: "lucataco/ip_adapter-sdxl-face",
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

- Model page: https://replicate.com/lucataco/ip_adapter-sdxl-face
- API page: https://replicate.com/lucataco/ip_adapter-sdxl-face/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
