---
name: replicate-cjwbw-supir-v0f
description: >
  Use this skill for the Replicate Supir V0F model (cjwbw/supir-v0f). Use the Supir V0F model via Replicate API.
---

# Supir V0F

**Model:** `cjwbw/supir-v0f`
**Source:** https://replicate.com/cjwbw/supir-v0f
**Version:** `b9c26267b41f3617099b53f09f2d894a621ebf4a59b632bfedb5031eeabd8959`

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

const output = await replicate.run("cjwbw/supir-v0f", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/supir-v0f",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/supir-v0f/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Low quality input image. |
| `upscale` | integer | No | `1` | Upsampling ratio of given inputs. |
| `min_size` | float | No | `1024` | Minimum resolution of output images. |
| `edm_steps` | integer | No | `50` | Number of steps for EDM Sampling Schedule. |
| `a_prompt` | string | No | `"Cinematic, High Contrast, highly detailed, taken using a Canon EOS R camera, hyper detailed photo - realistic maximum detail, 32k, Color Grading, ultra HD, extreme meticulous detailing, skin pore detailing, hyper sharpness, perfect without deformations."` | Additive positive prompt for the inputs. |
| `n_prompt` | string | No | `"painting, oil painting, illustration, drawing, art, sketch, oil painting, cartoon, CG Style, 3D render, unreal engine, blurring, dirty, messy, worst quality, low quality, frames, watermark, signature, jpeg artifacts, deformed, lowres, over-smooth"` | Negative prompt for the inputs. |
| `color_fix_type` | enum: `None`, `AdaIn`, `Wavelet` | No | `"Wavelet"` | Color Fixing Type.. |
| `s_stage1` | integer | No | `-1` | Control Strength of Stage1 (negative means invalid). |
| `s_churn` | float | No | `5` | Original churn hy-param of EDM. |
| `s_noise` | float | No | `1.003` | Original noise hy-param of EDM. |
| `s_cfg` | float | No | `7.5` | Classifier-free guidance scale for prompts. |
| `s_stage2` | float | No | `1` | Control Strength of Stage2. |
| `linear_CFG` | boolean | No | `false` | Linearly (with sigma) increase CFG from 'spt_linear_CFG' to s_cfg. |
| `linear_s_stage2` | boolean | No | `false` | Linearly (with sigma) increase s_stage2 from 'spt_linear_s_stage2' to s_stage2. |
| `spt_linear_CFG` | float | No | `1` | Start point of linearly increasing CFG. |
| `spt_linear_s_stage2` | float | No | `0` | Start point of linearly increasing s_stage2. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/supir-v0f",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/cjwbw/supir-v0f
- API page: https://replicate.com/cjwbw/supir-v0f/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
