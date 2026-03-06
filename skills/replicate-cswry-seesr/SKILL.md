---
name: replicate-cswry-seesr
description: >
  Use this skill for the Replicate Seesr model (cswry/seesr). Use the Seesr model via Replicate API.
---

# Seesr

**Model:** `cswry/seesr`
**Source:** https://replicate.com/cswry/seesr
**Version:** `989cf3a66fd209363de347c3129d95d9fe639e44533ab47e07a6dfb3f250b6e3`

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

const output = await replicate.run("cswry/seesr", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cswry/seesr",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cswry/seesr/predictions \
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
| `user_prompt` | string | No | `""` | Prompt to condition on |
| `positive_prompt` | string | No | `"clean, high-resolution, 8k"` | Prompt to add |
| `negative_prompt` | string | No | `"dotted, noise, blur, lowres, smooth"` | Prompt to remove |
| `cfg_scale` | float | No | `5.5` | Guidance scale, set value to >1 to use |
| `num_inference_steps` | integer | No | `50` | Number of inference steps |
| `sample_times` | integer | No | `1` | Number of samples to generate |
| `latent_tiled_size` | integer | No | `320` | Size of latent tiles |
| `latent_tiled_overlap` | integer | No | `4` | Overlap of latent tiles |
| `scale_factor` | integer | No | `4` | Scale factor |
| `seed` | integer | No | `231` | Seed |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cswry/seesr",
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

- Model page: https://replicate.com/cswry/seesr
- API page: https://replicate.com/cswry/seesr/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
