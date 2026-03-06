---
name: replicate-prunaai-p-image-edit
description: >
  Use this skill for the Replicate P Image Edit model (prunaai/p-image-edit). Use the P Image Edit model via Replicate API.
---

# P Image Edit

**Model:** `prunaai/p-image-edit`
**Source:** https://replicate.com/prunaai/p-image-edit
**Version:** `21572612bd5577c2cddc926e177b7e50640a8fae9cd51a69677f0d29d37e3df5`

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

const output = await replicate.run("prunaai/p-image-edit", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("prunaai/p-image-edit",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/prunaai/p-image-edit/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation. Make sure to describe your edit task clearly. You can refer to the images as 'image... |
| `images` | list<string (URL)> | No | `[]` | Images to use as a reference. For editing task, provide the main image as the first image. |
| `turbo` | boolean | No | `true` | If turned on, the model will run faster with additional optimizations. For complicated tasks, it is recommended to tu... |
| `aspect_ratio` | enum (8 values) | No | `"match_input_image"` | Aspect ratio for the generated image. `match_input_image` will match the aspect ratio of the first image. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation. |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "prunaai/p-image-edit",
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

- Model page: https://replicate.com/prunaai/p-image-edit
- API page: https://replicate.com/prunaai/p-image-edit/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
