---
name: replicate-black-forest-labs-flux-pro-finetuned
description: >
  Use this skill for the Replicate Flux Pro Finetuned model (black-forest-labs/flux-pro-finetuned). Use the Flux Pro Finetuned model via Replicate API.
---

# Flux Pro Finetuned

**Model:** `black-forest-labs/flux-pro-finetuned`
**Source:** https://replicate.com/black-forest-labs/flux-pro-finetuned
**Version:** `0515c6ddb21c9de66774a3b14be551de7030e4c1d06d5ca1c7f6038420647028`

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

const output = await replicate.run("black-forest-labs/flux-pro-finetuned", {
  input: {
        "prompt": "your prompt here",
        "finetune_id": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-pro-finetuned",
    input={
        "prompt": "your prompt here",
        "finetune_id": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-pro-finetuned/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "finetune_id": "your value here"}}'
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
| `aspect_ratio` | enum (10 values) | No | `"1:1"` | Aspect ratio for the generated image |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Format of the output images. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `steps` | integer | No | `40` | Number of diffusion steps |
| `width` | integer | No |  | Width of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if ... |
| `height` | integer | No |  | Height of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if... |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `guidance` | float | No | `3` | Controls the balance between adherence to the text prompt and image quality/diversity. Higher values make the output ... |
| `finetune_id` | string | **Yes** |  | Finetune ID for making images using a previously trained fine-tune. Only IDs from trainings made using Replicate's Fl... |
| `image_prompt` | string (URL) | No |  | Image to use with Flux Redux. This is used together with the text prompt to guide the generation towards the composit... |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 1 is most strict and 6 is most permissive |
| `finetune_strength` | float | No | `1` | Controls finetune influence |
| `prompt_upsampling` | boolean | No | `false` | Automatically modify the prompt for more creative generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-pro-finetuned",
  input: {
        "prompt": "your prompt here",
        "finetune_id": "your value here"
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

- Model page: https://replicate.com/black-forest-labs/flux-pro-finetuned
- API page: https://replicate.com/black-forest-labs/flux-pro-finetuned/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
