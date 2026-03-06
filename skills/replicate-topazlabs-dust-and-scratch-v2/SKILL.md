---
name: replicate-topazlabs-dust-and-scratch-v2
description: >
  Use this skill for the Replicate Dust And Scratch V2 model (topazlabs/dust-and-scratch-v2). Use the Dust And Scratch V2 model via Replicate API.
---

# Dust And Scratch V2

**Model:** `topazlabs/dust-and-scratch-v2`
**Source:** https://replicate.com/topazlabs/dust-and-scratch-v2
**Version:** `f9848c7feb1604b71c4d09a70ccfde538c86e3c82dbdacecb93cdc2513163c44`

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

const output = await replicate.run("topazlabs/dust-and-scratch-v2", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("topazlabs/dust-and-scratch-v2",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/topazlabs/dust-and-scratch-v2/predictions \
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
| `image` | string (URL) | **Yes** |  | Image with dust, scratches, or surface imperfections to restore |
| `grain` | boolean | No | `false` | Apply film grain effect to the output |
| `grain_model` | enum: `silver rich`, `gaussian`, `grey` | No | `"silver rich"` | Type of grain to apply: silver rich (classic film look), gaussian (uniform noise), or grey (monochromatic grain) |
| `grain_strength` | integer | No | `30` | Intensity of the grain effect from 0 to 60 |
| `grain_density` | integer | No | `30` | Density of the grain particles from 0 to 60 |
| `grain_size` | integer | No | `1` | Size of the grain particles from 1 to 5 |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Output format |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "topazlabs/dust-and-scratch-v2",
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

- Model page: https://replicate.com/topazlabs/dust-and-scratch-v2
- API page: https://replicate.com/topazlabs/dust-and-scratch-v2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
