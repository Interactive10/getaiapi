---
name: replicate-cjwbw-controlvideo
description: >
  Use this skill for the Replicate Controlvideo model (cjwbw/controlvideo). Use the Controlvideo model via Replicate API.
---

# Controlvideo

**Model:** `cjwbw/controlvideo`
**Source:** https://replicate.com/cjwbw/controlvideo
**Version:** `91710b3f53c9c1cb958e7bf0ea982d21b666f6a3ff28c1670ee0c08355ced925`

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

const output = await replicate.run("cjwbw/controlvideo", {
  input: {
        "video_path": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/controlvideo",
    input={
        "video_path": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/controlvideo/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video_path": "https://example.com/input.png"}}'
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
| `prompt` | string | No | `"A striking mallard floats effortlessly on the sparkling pond."` | Text description of target video |
| `video_path` | string (URL) | **Yes** |  | source video |
| `condition` | enum: `depth`, `canny`, `pose` | No | `"depth"` | Condition of structure sequence |
| `video_length` | integer | No | `15` | Length of synthesized video |
| `smoother_steps` | string | No | `"19, 20"` | Timesteps at which using interleaved-frame smoother, separate with comma |
| `is_long_video` | boolean | No | `false` | Whether to use hierarchical sampler to produce long video |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `guidance_scale` | float | No | `12.5` | Scale for classifier-free guidance |
| `seed` | string | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/controlvideo",
  input: {
        "video_path": "https://example.com/input.png"
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

- Model page: https://replicate.com/cjwbw/controlvideo
- API page: https://replicate.com/cjwbw/controlvideo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
