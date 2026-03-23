---
name: replicate-zsxkib-flux-music
description: >
  Use this skill for the Replicate Flux Music model (zsxkib/flux-music). Use the Flux Music model via Replicate API.
---

# Flux Music

**Model:** `zsxkib/flux-music`
**Source:** https://replicate.com/zsxkib/flux-music
**Version:** `eebfed4a1749bb1172f005f71fac5a1e0377502ec149c9d02b56ac1de3aa9f07`

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

const output = await replicate.run("zsxkib/flux-music", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/flux-music",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/flux-music/predictions \
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
| `prompt` | string | No | `"The song is an epic blend of space-rock, rock, and post-rock genres."` | Text prompt for music generation |
| `negative_prompt` | string | No | `"low quality, gentle"` | Text prompt for negative guidance (unconditioned prompt) |
| `guidance_scale` | float | No | `7` | Classifier-free guidance scale |
| `model_version` | enum: `small`, `base`, `large`, `giant` | No | `"base"` | Select the model version to use |
| `steps` | integer | No | `50` | Number of sampling steps |
| `save_spectrogram` | boolean | No | `false` | Whether to save the spectrogram image |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `wav` | string (URL) |  |
| `melspectrogram` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/flux-music",
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

- Model page: https://replicate.com/zsxkib/flux-music
- API page: https://replicate.com/zsxkib/flux-music/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
