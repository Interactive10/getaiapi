---
name: replicate-stability-ai-stable-audio-2.5
description: >
  Use this skill for the Replicate Stable Audio 2.5 model (stability-ai/stable-audio-2.5). Use the Stable Audio 2.5 model via Replicate API.
---

# Stable Audio 2.5

**Model:** `stability-ai/stable-audio-2.5`
**Source:** https://replicate.com/stability-ai/stable-audio-2.5
**Version:** `a61ac8edbb27cd2eda1b2eff2bbc03dcff1131f5560836ff77a052df05b77491`

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

const output = await replicate.run("stability-ai/stable-audio-2.5", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("stability-ai/stable-audio-2.5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/stability-ai/stable-audio-2.5/predictions \
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
| `seed` | integer | No |  | Random seed for reproducible results. Leave blank for random seed. |
| `steps` | integer | No | `8` | Number of diffusion steps (higher = better quality but slower) |
| `prompt` | string | **Yes** |  | Text prompt describing the desired audio |
| `duration` | integer | No | `190` | Duration of generated audio in seconds |
| `cfg_scale` | float | No | `1` | Classifier-free guidance scale (higher = more prompt adherence) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "stability-ai/stable-audio-2.5",
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

- Model page: https://replicate.com/stability-ai/stable-audio-2.5
- API page: https://replicate.com/stability-ai/stable-audio-2.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
