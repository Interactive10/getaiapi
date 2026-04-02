---
name: replicate-tstramer-material-diffusion
description: >
  Use this skill for the Replicate Material Diffusion model (tstramer/material-diffusion). Use the Material Diffusion model via Replicate API.
---

# Material Diffusion

**Model:** `tstramer/material-diffusion`
**Source:** https://replicate.com/tstramer/material-diffusion
**Version:** `a42692c54c0f407f803a0a8a9066160976baedb77c91171a01730f9b0d7beeff`

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

const output = await replicate.run("tstramer/material-diffusion", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tstramer/material-diffusion",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tstramer/material-diffusion/predictions \
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
| `prompt` | string | No | `""` | Input prompt |
| `width` | enum (13 values) | No | `512` | Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits |
| `height` | enum (13 values) | No | `512` | Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits |
| `init_image` | string (URL) | No |  | Inital image to generate variations of. Will be resized to the specified width and height |
| `mask` | string (URL) | No |  | Black and white image to use as mask for inpainting over init_image. Black pixels are inpainted and white pixels are ... |
| `prompt_strength` | float | No | `0.8` | Prompt strength when using init image. 1.0 corresponds to full destruction of information in init image |
| `num_outputs` | integer | No | `1` | Number of images to output. If the NSFW filter is triggered, you may get fewer outputs than this. |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `scheduler` | enum: `DDIM`, `K-LMS`, `PNDM` | No | `"K-LMS"` | Choose a scheduler. If you use an init image, PNDM will be used |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tstramer/material-diffusion",
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

- Model page: https://replicate.com/tstramer/material-diffusion
- API page: https://replicate.com/tstramer/material-diffusion/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
