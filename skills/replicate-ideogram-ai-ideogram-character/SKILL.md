---
name: replicate-ideogram-ai-ideogram-character
description: >
  Use this skill for the Replicate Ideogram Character model (ideogram-ai/ideogram-character). Use the Ideogram Character model via Replicate API.
---

# Ideogram Character

**Model:** `ideogram-ai/ideogram-character`
**Source:** https://replicate.com/ideogram-ai/ideogram-character
**Version:** `1f8e198263a0d8171b76c55907c294e933e1e7d55e2d0c54f319c0e4a42c723d`

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

const output = await replicate.run("ideogram-ai/ideogram-character", {
  input: {
        "prompt": "your prompt here",
        "character_reference_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ideogram-ai/ideogram-character",
    input={
        "prompt": "your prompt here",
        "character_reference_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ideogram-ai/ideogram-character/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "character_reference_image": "https://example.com/input.png"}}'
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
| `rendering_speed` | enum: `Default`, `Turbo`, `Quality` | No | `"Default"` | Rendering speed. Turbo for faster and cheaper generation, quality for higher quality and more expensive generation, d... |
| `style_type` | enum: `Auto`, `Fiction`, `Realistic` | No | `"Auto"` | The character style type. Auto, Fiction, or Realistic. |
| `aspect_ratio` | enum (15 values) | No | `"1:1"` | Aspect ratio. Ignored if a resolution or inpainting image is given. |
| `resolution` | enum (70 values) | No | `"None"` | Resolution. Overrides aspect ratio. Ignored if an inpainting image is given. |
| `magic_prompt_option` | enum: `Auto`, `On`, `Off` | No | `"Auto"` | Magic Prompt will interpret your prompt and optimize it to maximize variety and quality of the images generated. You ... |
| `mask` | string (URL) | No |  | A black and white image. Black pixels are inpainted, white pixels are preserved. The mask will be resized to match th... |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `image` | string (URL) | No |  | An image file to use for inpainting. You must also use a mask. |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `character_reference_image` | string (URL) | **Yes** |  | An image to use as a character reference. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ideogram-ai/ideogram-character",
  input: {
        "prompt": "your prompt here",
        "character_reference_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/ideogram-ai/ideogram-character
- API page: https://replicate.com/ideogram-ai/ideogram-character/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
