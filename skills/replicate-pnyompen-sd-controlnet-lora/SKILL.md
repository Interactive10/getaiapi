---
name: replicate-pnyompen-sd-controlnet-lora
description: >
  Use this skill for the Replicate Sd Controlnet Lora model (pnyompen/sd-controlnet-lora). Use the Sd Controlnet Lora model via Replicate API.
---

# Sd Controlnet Lora

**Model:** `pnyompen/sd-controlnet-lora`
**Source:** https://replicate.com/pnyompen/sd-controlnet-lora
**Version:** `37ceaf8d4df13e7fe7f1320413189c641c825210df7e40bc21072634a10029bb`

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

const output = await replicate.run("pnyompen/sd-controlnet-lora", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("pnyompen/sd-controlnet-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/pnyompen/sd-controlnet-lora/predictions \
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
| `image` | string (URL) | No |  | Input image for img2img or inpaint mode |
| `img2img` | boolean | No | `false` | Use img2img pipeline, it will use the image input both as the control image and the base image. |
| `auto_generate_caption` | boolean | No | `false` | Use BLIP to generate captions for the input images |
| `generated_caption_weight` | float | No | `0.5` | Weight for the generated caption |
| `condition_scale` | float | No | `1.1` | The bigger this number is, the more ControlNet interferes |
| `strength` | float | No | `0.8` | When img2img is active, the denoising strength. 1 means total destruction of the input image. |
| `ip_adapter_scale` | float | No | `1` | Scale for the IP Adapter |
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `num_outputs` | integer | No | `1` | Number of images to output |
| `scheduler` | enum (7 values) | No | `"K_EULER"` | scheduler |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `lora_scale` | float | No | `0.95` | LoRA additive scale. Only applicable on trained models. |
| `lora_weights` | string | No |  | Replicate LoRA weights to use. Leave blank to use the default weights. |
| `remove_bg` | boolean | No | `false` | Remove background from the input image |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "pnyompen/sd-controlnet-lora",
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

- Model page: https://replicate.com/pnyompen/sd-controlnet-lora
- API page: https://replicate.com/pnyompen/sd-controlnet-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
