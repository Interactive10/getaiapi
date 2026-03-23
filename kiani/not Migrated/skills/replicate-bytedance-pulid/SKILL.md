---
name: replicate-bytedance-pulid
description: >
  Use this skill for the Replicate Pulid model (bytedance/pulid). Use the Pulid model via Replicate API.
---

# Pulid

**Model:** `bytedance/pulid`
**Source:** https://replicate.com/bytedance/pulid
**Version:** `43d309c37ab4e62361e5e29b8e9e867fb2dcbcec77ae91206a8d95ac5dd451a0`

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

const output = await replicate.run("bytedance/pulid", {
  input: {
        "main_face_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/pulid",
    input={
        "main_face_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/pulid/predictions \
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
| `main_face_image` | string (URL) | **Yes** |  | ID image (main) |
| `auxiliary_face_image1` | string (URL) | No |  | Additional ID image (auxiliary) |
| `auxiliary_face_image2` | string (URL) | No |  | Additional ID image (auxiliary) |
| `auxiliary_face_image3` | string (URL) | No |  | Additional ID image (auxiliary) |
| `prompt` | string | No | `"portrait,color,cinematic,in garden,soft light,detailed face"` | Prompt |
| `negative_prompt` | string | No | `"flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry"` | Negative Prompt |
| `cfg_scale` | float | No | `1.2` | CFG, recommend value range [1, 1.5], 1 will be faster |
| `num_steps` | integer | No | `4` | Steps |
| `image_height` | integer | No | `1024` | Height |
| `image_width` | integer | No | `768` | Width |
| `identity_scale` | float | No | `0.8` | ID scale |
| `generation_mode` | enum: `fidelity`, `extremely style` | No | `"fidelity"` | mode |
| `mix_identities` | boolean | No | `false` | ID Mix (if you want to mix two ID image, please turn this on, otherwise, turn this off) |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `num_samples` | integer | No | `4` | Num samples |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality of the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/pulid",
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

- Model page: https://replicate.com/bytedance/pulid
- API page: https://replicate.com/bytedance/pulid/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
