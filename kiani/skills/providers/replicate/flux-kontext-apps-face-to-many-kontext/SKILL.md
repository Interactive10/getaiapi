---
name: replicate-flux-kontext-apps-face-to-many-kontext
description: >
  Use this skill for the Replicate Face To Many Kontext model (flux-kontext-apps/face-to-many-kontext). Use the Face To Many Kontext model via Replicate API.
---

# Face To Many Kontext

**Model:** `flux-kontext-apps/face-to-many-kontext`
**Source:** https://replicate.com/flux-kontext-apps/face-to-many-kontext
**Version:** `e70dc4c85c82c3c195190c227b965a4093b2871d2071d997dbd509435d0b19b9`

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

const output = await replicate.run("flux-kontext-apps/face-to-many-kontext", {
  input: {
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("flux-kontext-apps/face-to-many-kontext",
    input={
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/flux-kontext-apps/face-to-many-kontext/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_image": "https://example.com/input.png"}}'
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
| `style` | enum (16 values) | No | `"Random"` | The artistic style to apply to the image |
| `persona` | enum (13 values) | No | `"None"` | The persona to apply to the image |
| `aspect_ratio` | enum (14 values) | No | `"match_input_image"` | Aspect ratio of the generated image. Use 'match_input_image' to match the aspect ratio of the input image. |
| `output_format` | enum: `jpg`, `png` | No | `"png"` | Output format for the generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `num_images` | integer | No | `1` | The number of images to generate |
| `input_image` | string (URL) | **Yes** |  | Image of the person to transform. Must be jpeg, png, gif, or webp. |
| `preserve_outfit` | boolean | No | `false` | Whether to preserve the outfit |
| `safety_tolerance` | integer | No | `2` | Safety tolerance, 0 is most strict and 2 is most permissive. 2 is currently the maximum allowed. |
| `preserve_background` | boolean | No | `false` | Whether to preserve the background |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "flux-kontext-apps/face-to-many-kontext",
  input: {
        "input_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/flux-kontext-apps/face-to-many-kontext
- API page: https://replicate.com/flux-kontext-apps/face-to-many-kontext/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
