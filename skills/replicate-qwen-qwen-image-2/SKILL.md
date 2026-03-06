---
name: replicate-qwen-qwen-image-2
description: >
  Use this skill for the Replicate Qwen Image 2 model (qwen/qwen-image-2). Use the Qwen Image 2 model via Replicate API.
---

# Qwen Image 2

**Model:** `qwen/qwen-image-2`
**Source:** https://replicate.com/qwen/qwen-image-2
**Version:** `266e594fa007032292c211586354fe193d7aa4e675a1eeb0aef0c6a424468ddd`

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

const output = await replicate.run("qwen/qwen-image-2", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("qwen/qwen-image-2",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/qwen/qwen-image-2/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation or editing |
| `image` | string (URL) | No |  | Optional reference image for image editing, style transfer, or image-to-image generation |
| `match_input_image` | boolean | No | `false` | When true and an image is provided, use the input image's aspect ratio and resolution instead of the aspect_ratio par... |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Aspect ratio of the generated image |
| `enable_prompt_expansion` | boolean | No | `true` | Automatically expand and optimize the prompt for better results |
| `negative_prompt` | string | No | `""` | Negative prompt to specify elements to avoid in the generated image |
| `seed` | integer | No |  | Random seed for reproducible generation. Range: 0-2147483647 |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "qwen/qwen-image-2",
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

- Model page: https://replicate.com/qwen/qwen-image-2
- API page: https://replicate.com/qwen/qwen-image-2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
