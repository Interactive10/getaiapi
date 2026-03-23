---
name: replicate-lucataco-omnigen2
description: >
  Use this skill for the Replicate Omnigen2 model (lucataco/omnigen2). Use the Omnigen2 model via Replicate API.
---

# Omnigen2

**Model:** `lucataco/omnigen2`
**Source:** https://replicate.com/lucataco/omnigen2
**Version:** `5b9ea1d0821a60be9c861ebfc3513d121ecd8cab1932d3aa8d703e517988502e`

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

const output = await replicate.run("lucataco/omnigen2", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/omnigen2",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/omnigen2/predictions \
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
| `prompt` | string | No | `"Make the person smile"` | Text prompt describing the desired image edit |
| `image` | string (URL) | **Yes** |  | Input image to edit |
| `image_2` | string (URL) | No |  | Optional second input image for multi-image operations |
| `image_3` | string (URL) | No |  | Optional third input image for multi-image operations |
| `negative_prompt` | string | No | `"(((deformed))), blurry, over saturation, bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), fused fingers, messy drawing, broken legs censor, censored, censor_bar"` | Negative prompt to guide what should not be in the image |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `text_guidance_scale` | float | No | `5` | Guidance scale for text prompt |
| `image_guidance_scale` | float | No | `2` | Guidance scale for input image. Higher values increase consistency with input image |
| `cfg_range_start` | float | No | `0` | CFG range start |
| `cfg_range_end` | float | No | `1` | CFG range end |
| `scheduler` | enum: `euler`, `dpmsolver` | No | `"euler"` | Scheduler to use |
| `max_input_image_side_length` | integer | No | `2048` | Maximum input image side length |
| `max_pixels` | integer | No | `1048576` | Maximum number of pixels in output |
| `seed` | integer | No | `-1` | Random seed. Set to -1 for random seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/omnigen2",
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

- Model page: https://replicate.com/lucataco/omnigen2
- API page: https://replicate.com/lucataco/omnigen2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
