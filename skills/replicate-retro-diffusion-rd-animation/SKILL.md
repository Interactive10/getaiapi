---
name: replicate-retro-diffusion-rd-animation
description: >
  Use this skill for the Replicate Rd Animation model (retro-diffusion/rd-animation). Use the Rd Animation model via Replicate API.
---

# Rd Animation

**Model:** `retro-diffusion/rd-animation`
**Source:** https://replicate.com/retro-diffusion/rd-animation
**Version:** `a9f33da7d9a985064dbc2d99621b87da5b8a22ed4d412c3a1c34ab4b807a6d8f`

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

const output = await replicate.run("retro-diffusion/rd-animation", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("retro-diffusion/rd-animation",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/retro-diffusion/rd-animation/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for generation |
| `style` | enum: `four_angle_walking`, `walking_and_idle`, `small_sprites`, `vfx` | No | `"four_angle_walking"` | Style to apply to the generated image  four_angle_walking: Consistent 4 direction, 4 frame long walking animations of... |
| `width` | integer | No | `48` | Animation width. four_angle_walking and walking_and_idle only support 48. small_sprites only supports 32. vfx support... |
| `height` | integer | No | `48` | Animation height. four_angle_walking and walking_and_idle only support 48. small_sprites only supports 32. vfx suppor... |
| `input_image` | string (URL) | No |  | Input image for image-to-image generation or reference. Will be converted to RGB without transparency. |
| `return_spritesheet` | boolean | No | `false` | Return animation as a spritesheet PNG instead of animated GIF |
| `bypass_prompt_expansion` | boolean | No | `false` | Disable automatic prompt expansion |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "retro-diffusion/rd-animation",
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

- Model page: https://replicate.com/retro-diffusion/rd-animation
- API page: https://replicate.com/retro-diffusion/rd-animation/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
