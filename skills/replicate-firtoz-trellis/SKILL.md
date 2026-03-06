---
name: replicate-firtoz-trellis
description: >
  Use this skill for the Replicate Trellis model (firtoz/trellis). Use the Trellis model via Replicate API.
---

# Trellis

**Model:** `firtoz/trellis`
**Source:** https://replicate.com/firtoz/trellis
**Version:** `e8f6c45206993f297372f5436b90350817bd9b4a0d52d2a76df50c1c8afa2b3c`

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

const output = await replicate.run("firtoz/trellis", {
  input: {
        "images": []
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("firtoz/trellis",
    input={
        "images": []
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/firtoz/trellis/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"images": []}}'
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
| `images` | list<string (URL)> | **Yes** |  | List of input images to generate 3D asset from |
| `seed` | integer | No | `0` | Random seed for generation |
| `randomize_seed` | boolean | No | `true` | Randomize seed |
| `generate_color` | boolean | No | `true` | Generate color video render |
| `generate_normal` | boolean | No | `false` | Generate normal video render |
| `generate_model` | boolean | No | `false` | Generate 3D model file (GLB) |
| `save_gaussian_ply` | boolean | No | `false` | Save Gaussian point cloud as PLY file |
| `return_no_background` | boolean | No | `false` | Return the preprocessed images without background |
| `ss_guidance_strength` | float | No | `7.5` | Stage 1: Sparse Structure Generation - Guidance Strength |
| `ss_sampling_steps` | integer | No | `12` | Stage 1: Sparse Structure Generation - Sampling Steps |
| `slat_guidance_strength` | float | No | `3` | Stage 2: Structured Latent Generation - Guidance Strength |
| `slat_sampling_steps` | integer | No | `12` | Stage 2: Structured Latent Generation - Sampling Steps |
| `mesh_simplify` | float | No | `0.95` | GLB Extraction - Mesh Simplification (only used if generate_model=True) |
| `texture_size` | integer | No | `1024` | GLB Extraction - Texture Size (only used if generate_model=True) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_file` | string (URL) |  |
| `color_video` | string (URL) |  |
| `gaussian_ply` | string (URL) |  |
| `normal_video` | string (URL) |  |
| `combined_video` | string (URL) |  |
| `no_background_images` | list<string (URL)> |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "firtoz/trellis",
  input: {
        "images": []
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

- Model page: https://replicate.com/firtoz/trellis
- API page: https://replicate.com/firtoz/trellis/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
