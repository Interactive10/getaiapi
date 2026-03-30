---
name: replicate-retro-diffusion-rd-plus
description: >
  Use this skill for the Replicate Rd Plus model (retro-diffusion/rd-plus). Use the Rd Plus model via Replicate API.
---

# Rd Plus

**Model:** `retro-diffusion/rd-plus`
**Source:** https://replicate.com/retro-diffusion/rd-plus
**Version:** `60eb48db78cbd38cc6473d309a311db08244ed021567a9234970af971bab0d87`

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

const output = await replicate.run("retro-diffusion/rd-plus", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("retro-diffusion/rd-plus",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/retro-diffusion/rd-plus/predictions \
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
| `style` | enum (19 values) | No | `"default"` | Style to apply to the generated image  default: Clean pixel art style with bold colors and outlines retro: Classic pi... |
| `width` | integer | No | `256` | Image width |
| `height` | integer | No | `256` | Image height |
| `num_images` | integer | No | `1` | Number of images to generate |
| `input_image` | string (URL) | No |  | Input image for image-to-image generation or reference. Will be converted to RGB without transparency. |
| `strength` | float | No | `0.8` | Prompt strength in image-to-image generation. Higher values give closer adherence to the prompt, and lower values use... |
| `input_palette` | string (URL) | No |  | Reference palette image to guide color choices |
| `remove_bg` | boolean | No | `false` | Remove background to create transparent images |
| `tile_x` | boolean | No | `false` | Enable seamless tiling on X axis |
| `tile_y` | boolean | No | `false` | Enable seamless tiling on Y axis |
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
  model: "retro-diffusion/rd-plus",
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

- Model page: https://replicate.com/retro-diffusion/rd-plus
- API page: https://replicate.com/retro-diffusion/rd-plus/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
