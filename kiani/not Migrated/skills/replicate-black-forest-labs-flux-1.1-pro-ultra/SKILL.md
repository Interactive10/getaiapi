---
name: replicate-black-forest-labs-flux-1.1-pro-ultra
description: >
  Use this skill for the Replicate Flux 1.1 Pro Ultra model (black-forest-labs/flux-1.1-pro-ultra). Use the Flux 1.1 Pro Ultra model via Replicate API.
---

# Flux 1.1 Pro Ultra

**Model:** `black-forest-labs/flux-1.1-pro-ultra`
**Source:** https://replicate.com/black-forest-labs/flux-1.1-pro-ultra
**Version:** `5ea10f739af9f6d4002fae9aee4c15be14c3c8d7f8b309e634bf68df09159863`

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

const output = await replicate.run("black-forest-labs/flux-1.1-pro-ultra", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-1.1-pro-ultra",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro-ultra/predictions \
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
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio for the generated image |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Format of the output images. |
| `raw` | boolean | No | `false` | Generate less processed, more natural-looking images |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `image_prompt` | string (URL) | No |  | Image to use with Flux Redux. This is used together with the text prompt to guide the generation towards the composit... |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 1 is most strict and 6 is most permissive |
| `image_prompt_strength` | float | No | `0.1` | Blend between the prompt and the image prompt. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "black-forest-labs/flux-1.1-pro-ultra",
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

- Model page: https://replicate.com/black-forest-labs/flux-1.1-pro-ultra
- API page: https://replicate.com/black-forest-labs/flux-1.1-pro-ultra/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
