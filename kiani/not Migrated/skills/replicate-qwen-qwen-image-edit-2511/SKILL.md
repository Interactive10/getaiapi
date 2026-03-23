---
name: replicate-qwen-qwen-image-edit-2511
description: >
  Use this skill for the Replicate Qwen Image Edit 2511 model (qwen/qwen-image-edit-2511). Use the Qwen Image Edit 2511 model via Replicate API.
---

# Qwen Image Edit 2511

**Model:** `qwen/qwen-image-edit-2511`
**Source:** https://replicate.com/qwen/qwen-image-edit-2511
**Version:** `a0670a7f47d5975347c105b6ce71456c4377d511993975988127dee03ca6c729`

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

const output = await replicate.run("qwen/qwen-image-edit-2511", {
  input: {
        "image": [],
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-image-edit-2511",
    input={
        "image": [],
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-image-edit-2511/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": [], "prompt": "your prompt here"}}'
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
| `prompt` | string | **Yes** |  | Text instruction on how to edit the given image. |
| `image` | list<string (URL)> | **Yes** |  | Images to use as reference. Must be jpeg, png, gif, or webp. |
| `aspect_ratio` | enum: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `match_input_image` | No | `"match_input_image"` | Aspect ratio for the generated image. |
| `go_fast` | boolean | No | `true` | Run faster predictions with additional optimizations. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images. |
| `output_quality` | integer | No | `95` | Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png... |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "qwen/qwen-image-edit-2511",
  input: {
        "image": [],
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

- Model page: https://replicate.com/qwen/qwen-image-edit-2511
- API page: https://replicate.com/qwen/qwen-image-edit-2511/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
