---
name: replicate-andreasjansson-stable-diffusion-animation
description: >
  Use this skill for the Replicate Stable Diffusion Animation model (andreasjansson/stable-diffusion-animation). Use the Stable Diffusion Animation model via Replicate API.
---

# Stable Diffusion Animation

**Model:** `andreasjansson/stable-diffusion-animation`
**Source:** https://replicate.com/andreasjansson/stable-diffusion-animation
**Version:** `ca1f5e306e5721e19c473e0d094e6603f0456fe759c10715fcd6c1b79242d4a5`

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

const output = await replicate.run("andreasjansson/stable-diffusion-animation", {
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

output = replicate.run("andreasjansson/stable-diffusion-animation",
    input={
        "prompt_end": "your prompt here",
        "prompt_start": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/stable-diffusion-animation/predictions \
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
| `width` | enum: `128`, `256`, `512`, `768`, `1024` | No | `512` | Width of output image |
| `height` | enum: `128`, `256`, `512`, `768` | No | `512` | Height of output image |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps |
| `prompt_strength` | float | No | `0.8` | Lower prompt strength generates more coherent gifs, higher respects prompts more but can be jumpy |
| `num_animation_frames` | integer | No | `10` | Number of frames to animate |
| `num_interpolation_steps` | integer | No | `5` | Number of steps to interpolate between animation frames |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `gif_frames_per_second` | integer | No | `20` | Frames/second in output GIF |
| `gif_ping_pong` | boolean | No | `false` | Whether to reverse the animation and go back to the beginning before looping |
| `film_interpolation` | boolean | No | `true` | Whether to use FILM for between-frame interpolation (film-net.github.io) |
| `intermediate_output` | boolean | No | `false` | Whether to display intermediate outputs during generation |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `output_format` | enum: `gif`, `mp4` | No | `"gif"` | Output file format |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/stable-diffusion-animation",
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

- Model page: https://replicate.com/andreasjansson/stable-diffusion-animation
- API page: https://replicate.com/andreasjansson/stable-diffusion-animation/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
