---
name: replicate-fermatresearch-magic-style-transfer
description: >
  Use this skill for the Replicate Magic Style Transfer model (fermatresearch/magic-style-transfer). Use the Magic Style Transfer model via Replicate API.
---

# Magic Style Transfer

**Model:** `fermatresearch/magic-style-transfer`
**Source:** https://replicate.com/fermatresearch/magic-style-transfer
**Version:** `3b5fa5d360c361090f11164292e45cc5d14cea8d089591d47c580cac9ec1c7ca`

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

const output = await replicate.run("fermatresearch/magic-style-transfer", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fermatresearch/magic-style-transfer",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fermatresearch/magic-style-transfer/predictions \
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
| `prompt` | string | No | `"An astronaut riding a rainbow unicorn"` | Input prompt |
| `image` | string (URL) | No |  | Input image |
| `ip_image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `condition_depth_scale` | float | No | `0.35` | The bigger this number is, the more ControlNet interferes |
| `condition_canny_scale` | float | No | `0.15` | The bigger this number is, the more ControlNet interferes |
| `lora_scale` | float | No | `0.9` | LoRA additive scale. Only applicable on trained models. |
| `ip_scale` | float | No | `0.3` | IP Adapter strength. |
| `strength` | float | No | `0.9` | When img2img is active, the denoising strength. 1 means total destruction of the input image. |
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `background_color` | string | No | `"#A2A2A2"` | When passing an image with alpha channel, it will be replaced with this color |
| `resizing_scale` | float | No | `1` | If you want the image to have a solid margin. Scale of the solid margin. 1.0 means no resizing. |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `num_outputs` | integer | No | `1` | Number of images to output |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `guidance_scale` | float | No | `4` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `apply_watermark` | boolean | No | `true` | Applies a watermark to enable determining if an image is generated in downstream applications. If you have other prov... |
| `lora_weights` | string | No |  | Replicate LoRA weights to use. Leave blank to use the default weights. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fermatresearch/magic-style-transfer",
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

- Model page: https://replicate.com/fermatresearch/magic-style-transfer
- API page: https://replicate.com/fermatresearch/magic-style-transfer/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
