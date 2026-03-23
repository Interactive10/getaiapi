---
name: replicate-datacte-proteus-v0.3
description: >
  Use this skill for the Replicate Proteus V0.3 model (datacte/proteus-v0.3). Use the Proteus V0.3 model via Replicate API.
---

# Proteus V0.3

**Model:** `datacte/proteus-v0.3`
**Source:** https://replicate.com/datacte/proteus-v0.3
**Version:** `b28b79d725c8548b173b6a19ff9bffd16b9b80df5b18b8dc5cb9e1ee471bfa48`

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

const output = await replicate.run("datacte/proteus-v0.3", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("datacte/proteus-v0.3",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/datacte/proteus-v0.3/predictions \
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
| `prompt` | string | No | `"Anime full body portrait of a swordsman holding his weapon in front of him. He is facing the camera with a fierce look on his face. Anime key visual (best quality, HD, ~+~aesthetic~+~:1.2)"` | Input prompt |
| `negative_prompt` | string | No | `"worst quality, low quality"` | Negative Input prompt |
| `image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `mask` | string (URL) | No |  | Input mask for inpaint mode. Black areas will be preserved, white areas will be inpainted. |
| `width` | integer | No | `1024` | Width of output image. Recommended 1024 or 1280 |
| `height` | integer | No | `1024` | Height of output image. Recommended 1024 or 1280 |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `scheduler` | enum (8 values) | No | `"DPM++2MSDE"` | scheduler |
| `num_inference_steps` | integer | No | `20` | Number of denoising steps. 20 to 60 steps for more detail, 20 steps for faster results. |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance. Recommended 7-8 |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using img2img / inpaint. 1.0 corresponds to full destruction of information in image |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. This feature is only available through the API. See https://replicate.co... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "datacte/proteus-v0.3",
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

- Model page: https://replicate.com/datacte/proteus-v0.3
- API page: https://replicate.com/datacte/proteus-v0.3/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
