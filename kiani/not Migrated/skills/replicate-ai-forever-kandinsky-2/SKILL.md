---
name: replicate-ai-forever-kandinsky-2
description: >
  Use this skill for the Replicate Kandinsky 2 model (ai-forever/kandinsky-2). Use the Kandinsky 2 model via Replicate API.
---

# Kandinsky 2

**Model:** `ai-forever/kandinsky-2`
**Source:** https://replicate.com/ai-forever/kandinsky-2
**Version:** `3c6374e7a9a17e01afe306a5218cc67de55b19ea536466d6ea2602cfecea40a9`

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

const output = await replicate.run("ai-forever/kandinsky-2", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ai-forever/kandinsky-2",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ai-forever/kandinsky-2/predictions \
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
| `prompt` | string | No | `"red cat, 4k photo"` | Input Prompt |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `guidance_scale` | float | No | `4` | Scale for classifier-free guidance |
| `scheduler` | enum: `ddim_sampler`, `p_sampler`, `plms_sampler` | No | `"p_sampler"` | Choose a scheduler |
| `prior_cf_scale` | integer | No | `4` |  |
| `prior_steps` | string | No | `"5"` |  |
| `width` | enum (7 values) | No | `512` | Choose width. Lower the setting if out of memory. |
| `height` | enum (7 values) | No | `512` | Choose height. Lower the setting if out of memory. |
| `batch_size` | enum: `1`, `2`, `3`, `4` | No | `1` | Choose batch size. Lower the setting if out of memory. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality of the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ai-forever/kandinsky-2",
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

- Model page: https://replicate.com/ai-forever/kandinsky-2
- API page: https://replicate.com/ai-forever/kandinsky-2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
