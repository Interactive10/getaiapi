---
name: replicate-ai-forever-kandinsky-2.2
description: >
  Use this skill for the Replicate Kandinsky 2.2 model (ai-forever/kandinsky-2.2). Use the Kandinsky 2.2 model via Replicate API.
---

# Kandinsky 2.2

**Model:** `ai-forever/kandinsky-2.2`
**Source:** https://replicate.com/ai-forever/kandinsky-2.2
**Version:** `ad9d7879fbffa2874e1d909d1d37d9bc682889cc65b31f7bb00d2362619f194a`

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

const output = await replicate.run("ai-forever/kandinsky-2.2", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ai-forever/kandinsky-2.2",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ai-forever/kandinsky-2.2/predictions \
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
| `prompt` | string | No | `"A moss covered astronaut with a black background"` | Input prompt |
| `negative_prompt` | string | No |  | Specify things to not see in the output |
| `width` | enum (13 values) | No | `512` | Width of output image. Lower the setting if hits memory limits. |
| `height` | enum (13 values) | No | `512` | Height of output image. Lower the setting if hits memory limits. |
| `num_inference_steps` | integer | No | `75` | Number of denoising steps |
| `num_inference_steps_prior` | integer | No | `25` | Number of denoising steps for priors |
| `num_outputs` | integer | No | `1` | Number of images to output. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `output_format` | enum: `webp`, `jpeg`, `png` | No | `"webp"` | Output image format |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ai-forever/kandinsky-2.2",
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

- Model page: https://replicate.com/ai-forever/kandinsky-2.2
- API page: https://replicate.com/ai-forever/kandinsky-2.2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
