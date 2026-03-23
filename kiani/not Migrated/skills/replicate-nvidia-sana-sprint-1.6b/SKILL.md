---
name: replicate-nvidia-sana-sprint-1.6b
description: >
  Use this skill for the Replicate Sana Sprint 1.6B model (nvidia/sana-sprint-1.6b). Use the Sana Sprint 1.6B model via Replicate API.
---

# Sana Sprint 1.6B

**Model:** `nvidia/sana-sprint-1.6b`
**Source:** https://replicate.com/nvidia/sana-sprint-1.6b
**Version:** `038aee6907b53a5c148780983e39a50ce7cd0747b4e2642e78387f48cf36039a`

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

const output = await replicate.run("nvidia/sana-sprint-1.6b", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("nvidia/sana-sprint-1.6b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/nvidia/sana-sprint-1.6b/predictions \
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
| `prompt` | string | No | `"a tiny astronaut hatching from an egg on the moon"` | Input prompt |
| `width` | integer | No | `1024` | Width of output image |
| `height` | integer | No | `1024` | Height of output image |
| `inference_steps` | integer | No | `2` | Number of sampling steps |
| `intermediate_timesteps` | float | No | `1.3` | Intermediate timestep value (only used when inference_steps=2, recommended values: 1.0-1.4) |
| `guidance_scale` | float | No | `4.5` | CFG guidance scale |
| `seed` | integer | No | `-1` | Seed value. Set to a value less than 0 to randomize the seed |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"jpg"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "nvidia/sana-sprint-1.6b",
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

- Model page: https://replicate.com/nvidia/sana-sprint-1.6b
- API page: https://replicate.com/nvidia/sana-sprint-1.6b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
