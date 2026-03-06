---
name: replicate-midllle-material-maker
description: >
  Use this skill for the Replicate Material Maker model (midllle/material-maker). Use the Material Maker model via Replicate API.
---

# Material Maker

**Model:** `midllle/material-maker`
**Source:** https://replicate.com/midllle/material-maker
**Version:** `92fb3df0bf2a5f3bb60af26366677e0a98866ea5b8b5aa4a229f98322118c74e`

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

const output = await replicate.run("midllle/material-maker", {
  input: {
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("midllle/material-maker",
    input={
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/midllle/material-maker/predictions \
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
| `input_image` | string (URL) | **Yes** |  | Input image |
| `tile_size` | integer | No | `512` | Tile size for splitting |
| `seamless` | boolean | No | `false` | Seamless upscaling |
| `mirror` | boolean | No | `false` | Mirrored seamless upscaling |
| `replicate` | boolean | No | `false` | Replicate edge pixels for padding |
| `ishiiruka` | boolean | No | `false` | Save textures in Ishiiruka Dolphin material map texture pack format |
| `ishiiruka_texture_encoder` | boolean | No | `false` | Save textures in Ishiiruka Dolphin's Texture Encoder format |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "midllle/material-maker",
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

- Model page: https://replicate.com/midllle/material-maker
- API page: https://replicate.com/midllle/material-maker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
