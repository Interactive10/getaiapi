---
name: replicate-adirik-kosmos-g
description: >
  Use this skill for the Replicate Kosmos G model (adirik/kosmos-g). Use the Kosmos G model via Replicate API.
---

# Kosmos G

**Model:** `adirik/kosmos-g`
**Source:** https://replicate.com/adirik/kosmos-g
**Version:** `56f9fde586eeecfd03c9c34da1c40f5e513af2d511d4b1961f810df1334cc6e9`

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

const output = await replicate.run("adirik/kosmos-g", {
  input: {
        "image1": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("adirik/kosmos-g",
    input={
        "image1": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/adirik/kosmos-g/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image1": "https://example.com/input.png"}}'
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
| `image1` | string (URL) | **Yes** |  | First input image |
| `image2` | string (URL) | No |  | Optional second input image |
| `prompt` | string | No | `"<i>"` | Target prompt, use <i> to represent the images in prompt |
| `negative_prompt` | string | No | `""` | Negative prompt |
| `text_guidance_scale` | float | No | `6` | Text guidance scale |
| `num_inference_steps` | integer | No | `50` | Number of inference steps |
| `num_images` | integer | No | `4` | Number of images to generate |
| `seed` | integer | No |  | Seed for reproducibility |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "adirik/kosmos-g",
  input: {
        "image1": "https://example.com/input.png"
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

- Model page: https://replicate.com/adirik/kosmos-g
- API page: https://replicate.com/adirik/kosmos-g/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
