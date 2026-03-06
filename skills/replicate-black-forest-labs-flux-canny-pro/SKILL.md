---
name: replicate-black-forest-labs-flux-canny-pro
description: >
  Use this skill for the Replicate Flux Canny Pro model (black-forest-labs/flux-canny-pro). Use the Flux Canny Pro model via Replicate API.
---

# Flux Canny Pro

**Model:** `black-forest-labs/flux-canny-pro`
**Source:** https://replicate.com/black-forest-labs/flux-canny-pro
**Version:** `835f0372c2cf4b2e494c2b8626288212ea5c2694ccc2e29f00dfb8cbf2a5e0ce`

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

const output = await replicate.run("black-forest-labs/flux-canny-pro", {
  input: {
        "prompt": "your prompt here",
        "control_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("black-forest-labs/flux-canny-pro",
    input={
        "prompt": "your prompt here",
        "control_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/black-forest-labs/flux-canny-pro/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "control_image": "https://example.com/input.png"}}'
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
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Format of the output images. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `steps` | integer | No | `50` | Number of diffusion steps. Higher values yield finer details but increase processing time. |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `guidance` | float | No | `30` | Controls the balance between adherence to the text as well as image prompt and image quality/diversity. Higher values... |
| `control_image` | string (URL) | **Yes** |  | Image to use as control input. Must be jpeg, png, gif, or webp. |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 1 is most strict and 6 is most permissive |
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
  model: "black-forest-labs/flux-canny-pro",
  input: {
        "prompt": "your prompt here",
        "control_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/black-forest-labs/flux-canny-pro
- API page: https://replicate.com/black-forest-labs/flux-canny-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
