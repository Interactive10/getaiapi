---
name: replicate-prunaai-p-image-lora
description: >
  Use this skill for the Replicate P Image Lora model (prunaai/p-image-lora). Use the P Image Lora model via Replicate API.
---

# P Image Lora

**Model:** `prunaai/p-image-lora`
**Source:** https://replicate.com/prunaai/p-image-lora
**Version:** `077cbe9bf82aaf239c1802ebfd0f7353f2f471cbeca641a7780a141cdaea5701`

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

const output = await replicate.run("prunaai/p-image-lora", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/p-image-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/p-image-lora/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation. |
| `aspect_ratio` | enum (8 values) | No | `"16:9"` | Aspect ratio for the generated image. |
| `width` | integer | No |  | Width of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 16. |
| `height` | integer | No |  | Height of the generated image. Only used when aspect_ratio=custom. Must be a multiple of 16. |
| `prompt_upsampling` | boolean | No | `false` | Upsample the prompt with an LLM. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |
| `lora_weights` | string | No |  | Load LoRA weights. Supports HuggingFace URLs in the format huggingface.co/<owner>/<model-name>[/<lora-weights-file.sa... |
| `lora_scale` | float | No | `0.5` | Determines how strongly the main LoRA should be applied. 0.5 usually works well for most LoRAs. |
| `hf_api_token` | string | No |  | HuggingFace API token. If you're using a HuggingFace LoRAs that needs authentication, you'll need to provide an API t... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/p-image-lora",
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

- Model page: https://replicate.com/prunaai/p-image-lora
- API page: https://replicate.com/prunaai/p-image-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
