---
name: replicate-bytedance-seedream-4
description: >
  Use this skill for the Replicate Seedream 4 model (bytedance/seedream-4). Use the Seedream 4 model via Replicate API.
---

# Seedream 4

**Model:** `bytedance/seedream-4`
**Source:** https://replicate.com/bytedance/seedream-4
**Version:** `cf7d431991436f19d1c8dad83fe463c729c816d7a21056c5105e75c84a0aa7e9`

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

const output = await replicate.run("bytedance/seedream-4", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bytedance/seedream-4",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bytedance/seedream-4/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `image_input` | list<string (URL)> | No | `[]` | Input image(s) for image-to-image generation. List of 1-10 images for single or multi-reference generation. |
| `size` | enum: `1K`, `2K`, `4K`, `custom` | No | `"2K"` | Image resolution: 1K (1024px), 2K (2048px), 4K (4096px), or 'custom' for specific dimensions. |
| `aspect_ratio` | enum (9 values) | No | `"match_input_image"` | Image aspect ratio. Only used when size is not 'custom'. Use 'match_input_image' to automatically match the input ima... |
| `width` | integer | No | `2048` | Custom image width (only used when size='custom'). Range: 1024-4096 pixels. |
| `height` | integer | No | `2048` | Custom image height (only used when size='custom'). Range: 1024-4096 pixels. |
| `sequential_image_generation` | enum: `disabled`, `auto` | No | `"disabled"` | Group image generation mode. 'disabled' generates a single image. 'auto' lets the model decide whether to generate mu... |
| `max_images` | integer | No | `1` | Maximum number of images to generate when sequential_image_generation='auto'. Range: 1-15. Total images (input + gene... |
| `enhance_prompt` | boolean | No | `true` | Enable prompt enhancement for higher quality results, this will take longer to generate. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bytedance/seedream-4",
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

- Model page: https://replicate.com/bytedance/seedream-4
- API page: https://replicate.com/bytedance/seedream-4/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
