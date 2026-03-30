---
name: replicate-flux-kontext-apps-multi-image-list
description: >
  Use this skill for the Replicate Multi Image List model (flux-kontext-apps/multi-image-list). Use the Multi Image List model via Replicate API.
---

# Multi Image List

**Model:** `flux-kontext-apps/multi-image-list`
**Source:** https://replicate.com/flux-kontext-apps/multi-image-list
**Version:** `02f073c63abec2c72f0638164a25a64bd0ca70bce780c0ac75c6851252bb4c70`

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

const output = await replicate.run("flux-kontext-apps/multi-image-list", {
  input: {
        "prompt": "your prompt here",
        "input_images": []
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("flux-kontext-apps/multi-image-list",
    input={
        "prompt": "your prompt here",
        "input_images": []
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/flux-kontext-apps/multi-image-list/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "input_images": []}}'
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
| `aspect_ratio` | enum (14 values) | No | `"match_input_image"` | Aspect ratio of the generated image. Use 'match_input_image' to match the aspect ratio of the input image. |
| `output_format` | enum: `jpg`, `png` | No | `"png"` | Output format for the generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `prompt` | string | **Yes** |  | Text description of how to combine or transform the input images |
| `input_images` | list<string (URL)> | **Yes** |  | List of input images. Must be jpeg, png, gif, or webp. |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 0 is most strict and 2 is most permissive. 2 is currently the maximum allowed. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "flux-kontext-apps/multi-image-list",
  input: {
        "prompt": "your prompt here",
        "input_images": []
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

- Model page: https://replicate.com/flux-kontext-apps/multi-image-list
- API page: https://replicate.com/flux-kontext-apps/multi-image-list/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
