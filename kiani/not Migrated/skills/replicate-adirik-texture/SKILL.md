---
name: replicate-adirik-texture
description: >
  Use this skill for the Replicate Texture model (adirik/texture). Use the Texture model via Replicate API.
---

# Texture

**Model:** `adirik/texture`
**Source:** https://replicate.com/adirik/texture
**Version:** `456e72c47358d0da0a1b3002c8cf9f4eb123afa4bb8ff2b521fea40a71746a7f`

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

const output = await replicate.run("adirik/texture", {
  input: {
        "shape_path": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("adirik/texture",
    input={
        "shape_path": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/adirik/texture/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"shape_path": "your value here"}}'
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
| `shape_path` | string (URL) | **Yes** |  | 3D object (shape) file to generate the texture onto |
| `prompt` | string | No | `"A next gen nascar"` | Prompt to generate the texture from |
| `shape_scale` | float | No | `0.6` | Factor to scale image by |
| `texture_resolution` | integer | No | `1024` | Resolution of the texture to generate |
| `guidance_scale` | float | No | `10` | Factor to scale the guidance image by |
| `texture_interpolation_mode` | string | No | `"bilinear"` | Texture mapping interpolation mode from texture image, options: 'nearest', 'bilinear', 'bicubic' |
| `seed` | integer | No | `0` | Seed for the inference |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "adirik/texture",
  input: {
        "shape_path": "your value here"
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

- Model page: https://replicate.com/adirik/texture
- API page: https://replicate.com/adirik/texture/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
