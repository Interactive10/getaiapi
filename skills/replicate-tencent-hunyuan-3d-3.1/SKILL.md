---
name: replicate-tencent-hunyuan-3d-3.1
description: >
  Use this skill for the Replicate Hunyuan 3D 3.1 model (tencent/hunyuan-3d-3.1). Use the Hunyuan 3D 3.1 model via Replicate API.
---

# Hunyuan 3D 3.1

**Model:** `tencent/hunyuan-3d-3.1`
**Source:** https://replicate.com/tencent/hunyuan-3d-3.1
**Version:** `a2838628b41a2e0ee2eb19b3ea98a40d75f8d7639bf5a1ddd37ea299bb334854`

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

const output = await replicate.run("tencent/hunyuan-3d-3.1", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tencent/hunyuan-3d-3.1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tencent/hunyuan-3d-3.1/predictions \
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
| `prompt` | string | No |  | Text description of the 3D model to generate. Either prompt OR image must be provided, but not both. Supports up to 1... |
| `image` | string (URL) | No |  | Input image to convert to 3D. Either prompt OR image must be provided, but not both. Recommendations: simple backgrou... |
| `enable_pbr` | boolean | No | `false` | Enable PBR (Physically Based Rendering) material generation. |
| `face_count` | integer | No | `500000` | Number of faces (polygons) in the generated 3D model. |
| `generate_type` | enum: `Normal`, `Geometry` | No | `"Normal"` | Type of 3D generation. 'Normal' generates textured model, 'Geometry' generates white model without textures (EnablePB... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tencent/hunyuan-3d-3.1",
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

- Model page: https://replicate.com/tencent/hunyuan-3d-3.1
- API page: https://replicate.com/tencent/hunyuan-3d-3.1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
