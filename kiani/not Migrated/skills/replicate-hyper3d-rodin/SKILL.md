---
name: replicate-hyper3d-rodin
description: >
  Use this skill for the Replicate Rodin model (hyper3d/rodin). Use the Rodin model via Replicate API.
---

# Rodin

**Model:** `hyper3d/rodin`
**Source:** https://replicate.com/hyper3d/rodin
**Version:** `9492be065b4a8b671ea929e63f8411ebcfa245e9af641400035e7ece20e1ba28`

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

const output = await replicate.run("hyper3d/rodin", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("hyper3d/rodin",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/hyper3d/rodin/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for 3D model generation |
| `images` | list<string (URL)> | No | `[]` | Input images for 3D generation (up to 5 images) |
| `seed` | integer | No |  | Random seed for reproducible generation |
| `tier` | string | No | `"Gen-2"` | Generation tier |
| `use_original_alpha` | boolean | No | `false` | Use original transparency channel |
| `geometry_file_format` | enum: `glb`, `usdz`, `fbx`, `obj`, `stl` | No | `"glb"` | Output geometry format |
| `material` | enum: `PBR`, `Shaded`, `All` | No | `"PBR"` | Material type |
| `quality` | enum: `high`, `medium`, `low`, `extra-low` | No | `"medium"` | Generation quality |
| `quality_override` | integer | No |  | Custom poly count for generation |
| `tapose` | boolean | No | `false` | Generate T/A pose for human-like models |
| `bbox_condition` | list<integer> | No |  | Bounding box condition [Width, Height, Length] |
| `mesh_mode` | enum: `Quad`, `Raw` | No | `"Quad"` | Mesh face type |
| `addons` | list<string> | No |  | Additional features |
| `preview_render` | boolean | No | `false` | Generate preview render |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "hyper3d/rodin",
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

- Model page: https://replicate.com/hyper3d/rodin
- API page: https://replicate.com/hyper3d/rodin/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
