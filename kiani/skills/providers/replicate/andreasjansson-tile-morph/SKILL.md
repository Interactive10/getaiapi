---
name: replicate-andreasjansson-tile-morph
description: >
  Use this skill for the Replicate Tile Morph model (andreasjansson/tile-morph). Use the Tile Morph model via Replicate API.
---

# Tile Morph

**Model:** `andreasjansson/tile-morph`
**Source:** https://replicate.com/andreasjansson/tile-morph
**Version:** `cbf059cce30a22d821a3c86309ae3b037dcd505dd2eba47f8ea6eba20adced85`

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

const output = await replicate.run("andreasjansson/tile-morph", {
  input: {
        "prompt_end": "your prompt here",
        "prompt_start": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("andreasjansson/tile-morph",
    input={
        "prompt_end": "your prompt here",
        "prompt_start": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/tile-morph/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt_end": "your prompt here", "prompt_start": "your prompt here"}}'
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
| `prompt_start` | string | **Yes** |  | Prompt to start the animation with |
| `prompt_end` | string | **Yes** |  | Prompt to end the animation with. You can include multiple prompts by separating the prompts with \| (the 'pipe' char... |
| `width` | enum: `128`, `256`, `512`, `768`, `1024` | No | `512` | Width of output video |
| `height` | enum: `128`, `256`, `512`, `768` | No | `512` | Height of output video |
| `num_interpolation_steps` | integer | No | `20` | Number of steps to interpolate between animation frames |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `num_animation_frames` | integer | No | `10` | Number of frames to animate |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `frames_per_second` | integer | No | `20` | Frames per second in output video |
| `intermediate_output` | boolean | No | `false` | Whether to display intermediate outputs during generation |
| `seed_start` | integer | No |  | Random seed for first prompt. Leave blank to randomize the seed |
| `seed_end` | integer | No |  | Random seed for last prompt. Leave blank to randomize the seed |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/tile-morph",
  input: {
        "prompt_end": "your prompt here",
        "prompt_start": "your prompt here"
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

- Model page: https://replicate.com/andreasjansson/tile-morph
- API page: https://replicate.com/andreasjansson/tile-morph/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
