---
name: replicate-juergengunz-ultimate-portrait-upscale
description: >
  Use this skill for the Replicate Ultimate Portrait Upscale model (juergengunz/ultimate-portrait-upscale). Use the Ultimate Portrait Upscale model via Replicate API.
---

# Ultimate Portrait Upscale

**Model:** `juergengunz/ultimate-portrait-upscale`
**Source:** https://replicate.com/juergengunz/ultimate-portrait-upscale
**Version:** `f7fdace4ec7adab7fa02688a160eee8057f070ead7fbb84e0904864fd2324be5`

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

const output = await replicate.run("juergengunz/ultimate-portrait-upscale", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("juergengunz/ultimate-portrait-upscale",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/juergengunz/ultimate-portrait-upscale/predictions \
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
| `image` | string (URL) | **Yes** |  | Input image |
| `positive_prompt` | string | No | `"business portrait, detailed skin, perfect skin, soft lighting, beautiful eyes, photorealistic, perfect teeth"` | Positive Prompt |
| `negative_prompt` | string | No | `"cartoon, cgi, render, painting, illustration, drawing"` | Negative Prompt |
| `upscaler` | enum: `4x-UltraSharp` | No | `"4x-UltraSharp"` | Upscaler |
| `upscale_by` | float | No | `2` | Upscale By |
| `use_controlnet_tile` | boolean | No | `true` | Use ControlNet Tile |
| `controlnet_strength` | float | No | `1` | ControlNet Strength |
| `seed` | integer | No |  | Sampling seed, leave Empty for Random |
| `steps` | integer | No | `20` | Steps |
| `cfg` | float | No | `8` | CFG |
| `sampler_name` | enum (20 values) | No | `"euler"` | Sampler |
| `scheduler` | enum: `normal`, `karras`, `exponential`, `sgm_uniform`, `simple`, `ddim_uniform` | No | `"normal"` | Scheduler |
| `denoise` | float | No | `0.1` | Denoise |
| `mode_type` | enum: `Linear`, `Chess`, `None` | No | `"Linear"` | Mode Type |
| `tile_width` | integer | No | `512` | Tile Width |
| `tile_height` | integer | No | `512` | Tile Height |
| `mask_blur` | integer | No | `8` | Mask Blur |
| `tile_padding` | integer | No | `32` | Tile Padding |
| `seam_fix_mode` | enum: `None`, `Band Pass`, `Half Tile`, `Half Tile + Intersections` | No | `"None"` | Seam Fix Mode |
| `seam_fix_denoise` | float | No | `1` | Seam Fix Denoise |
| `seam_fix_width` | integer | No | `64` | Seam Fix Width |
| `seam_fix_mask_blur` | integer | No | `8` | Seam Fix Mask Blur |
| `seam_fix_padding` | integer | No | `16` | Seam Fix Padding |
| `force_uniform_tiles` | boolean | No | `true` | Force Uniform Tiles |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "juergengunz/ultimate-portrait-upscale",
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

- Model page: https://replicate.com/juergengunz/ultimate-portrait-upscale
- API page: https://replicate.com/juergengunz/ultimate-portrait-upscale/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
