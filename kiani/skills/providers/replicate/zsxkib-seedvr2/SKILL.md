---
name: replicate-zsxkib-seedvr2
description: >
  Use this skill for the Replicate Seedvr2 model (zsxkib/seedvr2). Use the Seedvr2 model via Replicate API.
---

# Seedvr2

**Model:** `zsxkib/seedvr2`
**Source:** https://replicate.com/zsxkib/seedvr2
**Version:** `ca98249be9cb623f02a80a7851a2b1a33d5104c251a8f5a1588f251f79bf7c78`

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

const output = await replicate.run("zsxkib/seedvr2", {
  input: {
        "media": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/seedvr2",
    input={
        "media": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/seedvr2/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"media": "your value here"}}'
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
| `media` | string (URL) | **Yes** |  | Video (mp4/mov) or image (png/jpg/webp) to restore. |
| `cfg_scale` | float | No | `1` | Classifier-free guidance scale (higher = stronger restoration). |
| `sample_steps` | integer | No | `1` | Sampling steps (1 = fast one-step mode). |
| `sp_size` | integer | No | `1` | Sequence-parallel shard heuristic (single-GPU build only accepts 1). |
| `fps` | integer | No | `24` | Frames-per-second for video outputs. |
| `seed` | integer | No |  | Random seed. Leave blank for a random seed each call. |
| `output_format` | enum: `png`, `webp`, `jpg` | No | `"webp"` | Image output format (only used for image inputs). |
| `output_quality` | integer | No | `90` | Image quality for lossy formats (jpg/webp). |
| `apply_color_fix` | boolean | No | `false` | Apply optional wavelet color correction (matches official demo). |
| `model_variant` | enum: `3b`, `7b` | No | `"3b"` | Model size to run. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/seedvr2",
  input: {
        "media": "your value here"
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

- Model page: https://replicate.com/zsxkib/seedvr2
- API page: https://replicate.com/zsxkib/seedvr2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
