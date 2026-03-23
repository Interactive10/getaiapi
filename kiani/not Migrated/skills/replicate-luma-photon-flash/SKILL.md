---
name: replicate-luma-photon-flash
description: >
  Use this skill for the Replicate Photon Flash model (luma/photon-flash). Use the Photon Flash model via Replicate API.
---

# Photon Flash

**Model:** `luma/photon-flash`
**Source:** https://replicate.com/luma/photon-flash
**Version:** `8cee7d47f81d8f4f77c1aec44ffb3d1ce09d36388db637ceaa8a6cbcf30b63e1`

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

const output = await replicate.run("luma/photon-flash", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("luma/photon-flash",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/luma/photon-flash/predictions \
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
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio of the generated image |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `image_reference` | string (URL) | No |  | Reference image to guide generation |
| `style_reference` | string (URL) | No |  | Style reference image to guide generation |
| `character_reference` | string (URL) | No |  | Character reference image to guide generation |
| `image_reference_url` | string | No |  | Deprecated: Use image_reference instead |
| `style_reference_url` | string | No |  | Deprecated: Use style_reference instead |
| `image_reference_weight` | float | No | `0.85` | Weight of the reference image. Larger values will make the reference image have a stronger influence on the generated... |
| `style_reference_weight` | float | No | `0.85` | Weight of the style reference image |
| `character_reference_url` | string | No |  | Deprecated: Use character_reference instead |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "luma/photon-flash",
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

- Model page: https://replicate.com/luma/photon-flash
- API page: https://replicate.com/luma/photon-flash/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
