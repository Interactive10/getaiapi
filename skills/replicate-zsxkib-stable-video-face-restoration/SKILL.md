---
name: replicate-zsxkib-stable-video-face-restoration
description: >
  Use this skill for the Replicate Stable Video Face Restoration model (zsxkib/stable-video-face-restoration). Use the Stable Video Face Restoration model via Replicate API.
---

# Stable Video Face Restoration

**Model:** `zsxkib/stable-video-face-restoration`
**Source:** https://replicate.com/zsxkib/stable-video-face-restoration
**Version:** `63512c77555a80ca5c84c590641036ba9f938d38b9a1841ea369780072561373`

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

const output = await replicate.run("zsxkib/stable-video-face-restoration", {
  input: {
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/stable-video-face-restoration",
    input={
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/stable-video-face-restoration/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png"}}'
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
| `video` | string (URL) | **Yes** |  | Input video file (e.g. MP4). |
| `tasks` | enum: `face-restoration`, `face-restoration-and-colorization`, `face-restoration-and-colorization-and-inpainting` | No | `"face-restoration"` | Which restoration tasks to apply. |
| `mask` | string (URL) | No |  | An inpainting mask image (white areas will be restored). Only required when tasks includes inpainting. |
| `num_inference_steps` | integer | No | `30` | Number of diffusion steps. |
| `decode_chunk_size` | integer | No | `16` | Chunk size for decoding long videos. |
| `overlap` | integer | No | `3` | Number of overlapping frames between segments. |
| `noise_aug_strength` | float | No | `0` | Noise augmentation strength. |
| `min_appearance_guidance_scale` | float | No | `2` | Minimum guidance scale for restoration. |
| `max_appearance_guidance_scale` | float | No | `2` | Maximum guidance scale for restoration. |
| `i2i_noise_strength` | float | No | `1` | Image-to-image noise strength. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/stable-video-face-restoration",
  input: {
        "video": "https://example.com/input.png"
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

- Model page: https://replicate.com/zsxkib/stable-video-face-restoration
- API page: https://replicate.com/zsxkib/stable-video-face-restoration/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
