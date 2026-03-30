---
name: replicate-retro-diffusion-rd-tile
description: >
  Use this skill for the Replicate Rd Tile model (retro-diffusion/rd-tile). Use the Rd Tile model via Replicate API.
---

# Rd Tile

**Model:** `retro-diffusion/rd-tile`
**Source:** https://replicate.com/retro-diffusion/rd-tile
**Version:** `c4f59be396f222aa021dec778f1cb49bdc4434ea4727bc084d2baae1447ed1b7`

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

const output = await replicate.run("retro-diffusion/rd-tile", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("retro-diffusion/rd-tile",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/retro-diffusion/rd-tile/predictions \
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
| `style` | enum: `tileset`, `tileset_advanced`, `single_tile`, `tile_variation`, `tile_object`, `scene_object` | No | `"tileset"` | Style to apply to the generated image  tileset: Create full tilesets from a simple prompt describing the textures or ... |
| `width` | integer | No | `32` | Tile width (for tilesets, this is the size of each individual tile, not the output image) |
| `height` | integer | No | `32` | Tile height (for tilesets, this is the size of each individual tile, not the output image) |
| `num_images` | integer | No | `1` | Number of images to generate |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `input_image` | string (URL) | No |  | Input image for image-to-image generation or reference. Will be converted to RGB without transparency. |
| `extra_input_image` | string (URL) | No |  | Extra input image for advanced tileset generation (tileset_advanced only) |
| `extra_prompt` | string | No |  | Extra prompt for advanced tileset generation (tileset_advanced only) |
| `bypass_prompt_expansion` | boolean | No | `false` | Disable automatic prompt expansion |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "retro-diffusion/rd-tile",
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

- Model page: https://replicate.com/retro-diffusion/rd-tile
- API page: https://replicate.com/retro-diffusion/rd-tile/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
