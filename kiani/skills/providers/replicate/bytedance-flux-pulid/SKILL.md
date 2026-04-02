---
name: replicate-bytedance-flux-pulid
description: >
  Use this skill for the Replicate Flux Pulid model (bytedance/flux-pulid). Use the Flux Pulid model via Replicate API.
---

# Flux Pulid

**Model:** `bytedance/flux-pulid`
**Source:** https://replicate.com/bytedance/flux-pulid
**Version:** `8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b`

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

const output = await replicate.run("bytedance/flux-pulid", {
  input: {
        "main_face_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/flux-pulid",
    input={
        "main_face_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/flux-pulid/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"main_face_image": "https://example.com/input.png"}}'
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
| `main_face_image` | string (URL) | **Yes** |  | Upload an ID image for face generation |
| `prompt` | string | No | `"portrait, color, cinematic"` | Enter a text prompt to guide image generation |
| `negative_prompt` | string | No | `"bad quality, worst quality, text, signature, watermark, extra limbs, low resolution, partially rendered objects, deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed, blurry"` | Enter a negative prompt to specify what to avoid in the image |
| `width` | integer | No | `896` | Set the width of the generated image (256-1536 pixels) |
| `height` | integer | No | `1152` | Set the height of the generated image (256-1536 pixels) |
| `num_steps` | integer | No | `20` | Set the number of denoising steps (1-20) |
| `start_step` | integer | No | `0` | Set the timestep to start inserting ID (0-4 recommended, 0 for highest fidelity, 4 for more editability) |
| `guidance_scale` | float | No | `4` | Set the guidance scale for text prompt influence (1.0-10.0) |
| `id_weight` | float | No | `1` | Set the weight of the ID image influence (0.0-3.0) |
| `seed` | integer | No |  | Set a random seed for generation (leave blank or -1 for random) |
| `true_cfg` | float | No | `1` | Set the Classifier-Free Guidance (CFG) scale. 1.0 uses standard CFG, while values >1.0 enable True CFG for more preci... |
| `max_sequence_length` | integer | No | `128` | Set the max sequence length for prompt (T5), smaller is faster (128-512) |
| `output_format` | enum: `png`, `jpg`, `webp` | No | `"webp"` | Choose the format of the output image |
| `output_quality` | integer | No | `80` | Set the quality of the output image for jpg and webp (1-100) |
| `num_outputs` | integer | No | `1` | Set the number of images to generate (1-4) |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/flux-pulid",
  input: {
        "main_face_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/bytedance/flux-pulid
- API page: https://replicate.com/bytedance/flux-pulid/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
