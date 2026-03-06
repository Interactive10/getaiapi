---
name: replicate-ideogram-ai-ideogram-v2a-turbo
description: >
  Use this skill for the Replicate Ideogram V2A Turbo model (ideogram-ai/ideogram-v2a-turbo). Use the Ideogram V2A Turbo model via Replicate API.
---

# Ideogram V2A Turbo

**Model:** `ideogram-ai/ideogram-v2a-turbo`
**Source:** https://replicate.com/ideogram-ai/ideogram-v2a-turbo
**Version:** `0afb968f42d1f96ab92f9c8d669c0e819fa36ccc74f02a7cd057595c9e42da01`

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

const output = await replicate.run("ideogram-ai/ideogram-v2a-turbo", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("ideogram-ai/ideogram-v2a-turbo",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/ideogram-ai/ideogram-v2a-turbo/predictions \
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
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | Aspect ratio. Ignored if a resolution or inpainting image is given. |
| `resolution` | enum (69 values) | No | `"None"` | Resolution. Overrides aspect ratio. Ignored if an inpainting image is given. |
| `magic_prompt_option` | enum: `Auto`, `On`, `Off` | No | `"Auto"` | Magic Prompt will interpret your prompt and optimize it to maximize variety and quality of the images generated. You ... |
| `style_type` | enum (7 values) | No | `"None"` | The styles help define the specific aesthetic of the image you want to generate. |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `prompt` | string | **Yes** |  | Text prompt for image generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "ideogram-ai/ideogram-v2a-turbo",
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

- Model page: https://replicate.com/ideogram-ai/ideogram-v2a-turbo
- API page: https://replicate.com/ideogram-ai/ideogram-v2a-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
