---
name: replicate-genmoai-mochi-1
description: >
  Use this skill for the Replicate Mochi 1 model (genmoai/mochi-1). Use the Mochi 1 model via Replicate API.
---

# Mochi 1

**Model:** `genmoai/mochi-1`
**Source:** https://replicate.com/genmoai/mochi-1
**Version:** `1944af04d098ef69bed7f9d335d102e652203f268ec4aaa2d836f6217217e460`

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

const output = await replicate.run("genmoai/mochi-1", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("genmoai/mochi-1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/genmoai/mochi-1/predictions \
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
| `prompt` | string | No | `"Close-up of a chameleon's eye, with its scaly skin changing color. Ultra high resolution 4k."` | Focus on a single, central subject. Structure the prompt from coarse to fine details. Start with 'a close shot' or 'a... |
| `num_frames` | integer | No | `163` | Number of frames to generate |
| `num_inference_steps` | integer | No | `64` | Number of inference steps |
| `guidance_scale` | float | No | `6` | The guidance scale for the model |
| `fps` | integer | No | `30` | Frames per second |
| `seed` | integer | No |  | Random seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "genmoai/mochi-1",
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

- Model page: https://replicate.com/genmoai/mochi-1
- API page: https://replicate.com/genmoai/mochi-1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
