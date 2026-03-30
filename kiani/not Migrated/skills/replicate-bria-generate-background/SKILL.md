---
name: replicate-bria-generate-background
description: >
  Use this skill for the Replicate Generate Background model (bria/generate-background). Use the Generate Background model via Replicate API.
---

# Generate Background

**Model:** `bria/generate-background`
**Source:** https://replicate.com/bria/generate-background
**Version:** `2555256f9a283b27092a99741d35251c180d6712e572d19a1c3912b45c80c995`

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

const output = await replicate.run("bria/generate-background", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bria/generate-background",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bria/generate-background/predictions \
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
| `bg_prompt` | string | No |  | Text description of the new scene or background. Either bg_prompt or ref_image_url must be provided |
| `ref_image_url` | string | No |  | URL of reference image for background generation. Either bg_prompt or ref_image_url must be provided |
| `ref_image_file` | string (URL) | No |  | Reference image file for background generation |
| `negative_prompt` | string | No |  | Negative prompt for image generation |
| `sync` | boolean | No | `true` | Synchronous response mode |
| `refine_prompt` | boolean | No | `true` | Refine the prompt for optimal results |
| `original_quality` | boolean | No | `false` | Retain original input image size, otherwise scale to 1MP |
| `content_moderation` | boolean | No | `false` | Enable content moderation |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `fast` | boolean | No | `true` | [DEPRECATED] Use fast mode. No longer used in V2 API. |
| `enhance_ref_image` | boolean | No | `true` | [DEPRECATED] Enhance reference image. No longer used in V2 API. |
| `force_rmbg` | boolean | No | `false` | [DEPRECATED] Force background removal. No longer used in V2 API. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bria/generate-background",
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

- Model page: https://replicate.com/bria/generate-background
- API page: https://replicate.com/bria/generate-background/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
