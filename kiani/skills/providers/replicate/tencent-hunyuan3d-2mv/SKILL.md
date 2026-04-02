---
name: replicate-tencent-hunyuan3d-2mv
description: >
  Use this skill for the Replicate Hunyuan3D 2Mv model (tencent/hunyuan3d-2mv). Use the Hunyuan3D 2Mv model via Replicate API.
---

# Hunyuan3D 2Mv

**Model:** `tencent/hunyuan3d-2mv`
**Source:** https://replicate.com/tencent/hunyuan3d-2mv
**Version:** `71798fbc3c9f7b7097e3bb85496e5a797d8b8f616b550692e7c3e176a8e9e5db`

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

const output = await replicate.run("tencent/hunyuan3d-2mv", {
  input: {
        "front_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tencent/hunyuan3d-2mv",
    input={
        "front_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tencent/hunyuan3d-2mv/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"front_image": "https://example.com/input.png"}}'
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
| `front_image` | string (URL) | **Yes** |  | Front view image |
| `back_image` | string (URL) | No |  | Back view image |
| `left_image` | string (URL) | No |  | Left view image |
| `right_image` | string (URL) | No |  | Right view image |
| `steps` | integer | No | `30` | Number of inference steps |
| `guidance_scale` | float | No | `5` | Guidance scale |
| `seed` | integer | No | `1234` | Random seed |
| `octree_resolution` | integer | No | `256` | Octree resolution |
| `remove_background` | boolean | No | `true` | Remove image background |
| `num_chunks` | integer | No | `200000` | Number of chunks |
| `randomize_seed` | boolean | No | `true` | Randomize seed |
| `target_face_num` | integer | No | `10000` | Target number of faces for mesh simplification |
| `file_type` | enum: `glb`, `obj`, `ply`, `stl` | No | `"glb"` | Output file type |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tencent/hunyuan3d-2mv",
  input: {
        "front_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/tencent/hunyuan3d-2mv
- API page: https://replicate.com/tencent/hunyuan3d-2mv/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
