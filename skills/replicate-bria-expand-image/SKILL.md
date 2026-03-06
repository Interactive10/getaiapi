---
name: replicate-bria-expand-image
description: >
  Use this skill for the Replicate Expand Image model (bria/expand-image). Use the Expand Image model via Replicate API.
---

# Expand Image

**Model:** `bria/expand-image`
**Source:** https://replicate.com/bria/expand-image
**Version:** `0d8d951a482d1f94125a7adbde188d7aa280a13fe0a444b9e786fce905e2af9a`

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

const output = await replicate.run("bria/expand-image", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bria/expand-image",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bria/expand-image/predictions \
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
| `image` | string (URL) | No |  | Image file |
| `image_url` | string | No |  | Image URL |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Aspect ratio for expansion. Either aspect_ratio or canvas_size with original_image_size/location must be provided. Ca... |
| `canvas_size` | list<integer> | No |  | Desired output canvas dimensions [width, height]. Default [1000, 1000]. Max 5000x5000 pixels. |
| `original_image_size` | list<integer> | No |  | Size of original image in canvas [width, height] |
| `original_image_location` | list<integer> | No |  | Position of original image in canvas [x, y] |
| `prompt` | string | No |  | Text prompt for image generation |
| `negative_prompt` | string | No |  | Negative prompt for image generation |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `preserve_alpha` | boolean | No | `true` | Preserve alpha channel in output. When true, maintains original transparency. When false, output is fully opaque. |
| `sync` | boolean | No | `true` | Synchronous response mode |
| `content_moderation` | boolean | No | `false` | Enable content moderation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bria/expand-image",
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

- Model page: https://replicate.com/bria/expand-image
- API page: https://replicate.com/bria/expand-image/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
