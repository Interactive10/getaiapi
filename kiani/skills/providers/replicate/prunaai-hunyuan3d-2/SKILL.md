---
name: replicate-prunaai-hunyuan3d-2
description: >
  Use this skill for the Replicate Hunyuan3D 2 model (prunaai/hunyuan3d-2). Use the Hunyuan3D 2 model via Replicate API.
---

# Hunyuan3D 2

**Model:** `prunaai/hunyuan3d-2`
**Source:** https://replicate.com/prunaai/hunyuan3d-2
**Version:** `6dd3e3e1f8a29a38807e8f23aaf8953a0051996ccc8c1861f709a5b1ee6826b5`

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

const output = await replicate.run("prunaai/hunyuan3d-2", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/hunyuan3d-2",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/hunyuan3d-2/predictions \
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
| `image_path` | string (URL) | No |  | Input image for hunyuan3d control |
| `speed_mode` | enum: `Unsqueezed 🍋 (highest quality)`, `Juiced 🔥 (fast)` | No | `"Juiced 🔥 (fast)"` | Speed optimization level |
| `num_inference_steps` | integer | No | `50` | Number of inference steps |
| `octree_resolution` | integer | No | `200` | Octree resolution |
| `num_chunks` | integer | No | `20000` | Number of chunks |
| `generator_seed` | integer | No | `12345` | Seed for random generator |
| `face_count` | integer | No | `40000` | Target number of faces for simplification |
| `file_type` | enum: `glb`, `obj` | No | `"glb"` | File type |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `mesh_paint` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/hunyuan3d-2",
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

- Model page: https://replicate.com/prunaai/hunyuan3d-2
- API page: https://replicate.com/prunaai/hunyuan3d-2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
