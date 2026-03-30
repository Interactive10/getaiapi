---
name: replicate-nvidia-sana
description: >
  Use this skill for the Replicate Sana model (nvidia/sana). Use the Sana model via Replicate API.
---

# Sana

**Model:** `nvidia/sana`
**Source:** https://replicate.com/nvidia/sana
**Version:** `c6b5d2b7459910fec94432e9e1203c3cdce92d6db20f714f1355747990b52fa6`

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

const output = await replicate.run("nvidia/sana", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nvidia/sana",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nvidia/sana/predictions \
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
| `prompt` | string | No | `"a cyberpunk cat with a neon sign that says "Sana""` | Input prompt |
| `negative_prompt` | string | No | `""` | Specify things to not see in the output |
| `model_variant` | enum: `1600M-1024px`, `1600M-1024px-multilang`, `1600M-512px`, `600M-1024px-multilang`, `600M-512px-multilang` | No | `"1600M-1024px"` | Model variant. 1600M variants are slower but produce higher quality than 600M, 1024px variants are optimized for 1024... |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `num_inference_steps` | integer | No | `18` | Number of denoising steps |
| `guidance_scale` | float | No | `5` | Classifier-free guidance scale |
| `pag_guidance_scale` | float | No | `2` | PAG Guidance scale |
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
  model: "nvidia/sana",
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

- Model page: https://replicate.com/nvidia/sana
- API page: https://replicate.com/nvidia/sana/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
