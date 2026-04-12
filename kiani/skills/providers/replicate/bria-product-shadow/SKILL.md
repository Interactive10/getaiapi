---
name: replicate-bria-product-shadow
description: >
  Use this skill for the Replicate Product Shadow model (bria/product-shadow). Use the Product Shadow model via Replicate API.
---

# Product Shadow

**Model:** `bria/product-shadow`
**Source:** https://replicate.com/bria/product-shadow
**Version:** `ffed8143e81736c5fb32ed63ba7362935d8228687fa3b5173eab2fbf86f54ee6`

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

const output = await replicate.run("bria/product-shadow", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bria/product-shadow",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bria/product-shadow/predictions \
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
| `image` | string (URL) | **Yes** |  | Product image to add shadow effects to |
| `shadow_type` | enum: `regular`, `float` | No | `"regular"` | Type of shadow to apply: regular or float |
| `background_color` | string | No | `"#FFFFFF"` | The background hex color code (e.g., #FFFFFF) or 'transparent' |
| `shadow_color` | string | No | `"#000000"` | Shadow color hex code |
| `shadow_offset_x` | integer | No | `0` | Horizontal shadow offset in pixels |
| `shadow_offset_y` | integer | No | `15` | Vertical shadow offset in pixels |
| `shadow_intensity` | integer | No | `60` | Adjusts the intensity of the shadow (0-100) |
| `shadow_blur` | integer | No |  | Controls the blur level of the shadow's edges |
| `shadow_width` | integer | No |  | Controls the width of the elliptical shadow in pixels (for floating shadows) |
| `shadow_height` | integer | No | `70` | Controls the height of the elliptical shadow in pixels (for floating shadows) |
| `force_rmbg` | boolean | No | `false` | Force background removal even if image has alpha channel |
| `preserve_alpha` | boolean | No | `true` | Preserve alpha channel in output |
| `content_moderation` | boolean | No | `false` | Enable content moderation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bria/product-shadow",
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

- Model page: https://replicate.com/bria/product-shadow
- API page: https://replicate.com/bria/product-shadow/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
