---
name: replicate-zsxkib-ic-light-background
description: >
  Use this skill for the Replicate Ic Light Background model (zsxkib/ic-light-background). Use the Ic Light Background model via Replicate API.
---

# Ic Light Background

**Model:** `zsxkib/ic-light-background`
**Source:** https://replicate.com/zsxkib/ic-light-background
**Version:** `60015df78a8a795470da6494822982140d57b150b9ef14354e79302ff89f69e3`

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

const output = await replicate.run("zsxkib/ic-light-background", {
  input: {
        "prompt": "your prompt here",
        "subject_image": "https://example.com/input.png",
        "background_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/ic-light-background",
    input={
        "prompt": "your prompt here",
        "subject_image": "https://example.com/input.png",
        "background_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/ic-light-background/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "subject_image": "https://example.com/input.png", "background_image": "https://example.com/input.png"}}'
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
| `subject_image` | string (URL) | **Yes** |  | The main foreground image to be relighted |
| `background_image` | string (URL) | **Yes** |  | The background image that will be used to relight the main foreground image |
| `prompt` | string | **Yes** |  | A text description guiding the relighting and generation process |
| `appended_prompt` | string | No | `"best quality"` | Additional text to be appended to the main prompt, enhancing image quality |
| `negative_prompt` | string | No | `"lowres, bad anatomy, bad hands, cropped, worst quality"` | A text description of attributes to avoid in the generated images |
| `compute_normal` | boolean | No | `false` | Whether to compute the normal maps (slower but provides additional output images) |
| `width` | enum (13 values) | No | `512` | The width of the generated images in pixels |
| `height` | enum (13 values) | No | `640` | The height of the generated images in pixels |
| `steps` | integer | No | `25` | The number of diffusion steps to perform during generation (more steps generally improves image quality but increases... |
| `cfg` | float | No | `2` | Classifier-Free Guidance scale - higher values encourage adherence to prompt, lower values encourage more creative in... |
| `highres_scale` | float | No | `1.5` | The multiplier for the final output resolution relative to the initial latent resolution |
| `highres_denoise` | float | No | `0.5` | Controls the amount of denoising applied when refining the high resolution output (higher = more adherence to the ups... |
| `light_source` | enum (7 values) | No | `"Use Background Image"` | The type and position of lighting to apply to the initial background latent |
| `seed` | integer | No |  | A fixed random seed for reproducible results (omit this parameter for a randomized seed) |
| `number_of_images` | integer | No | `1` | The number of unique images to generate from the given input and settings |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | The image file format of the generated output images |
| `output_quality` | integer | No | `80` | The image compression quality (for lossy formats like JPEG and WebP). 100 = best quality, 0 = lowest quality. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/ic-light-background",
  input: {
        "prompt": "your prompt here",
        "subject_image": "https://example.com/input.png",
        "background_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/zsxkib/ic-light-background
- API page: https://replicate.com/zsxkib/ic-light-background/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
