---
name: replicate-lightricks-ltx-2-distilled
description: >
  Use this skill for the Replicate Ltx 2 Distilled model (lightricks/ltx-2-distilled). Use the Ltx 2 Distilled model via Replicate API.
---

# Ltx 2 Distilled

**Model:** `lightricks/ltx-2-distilled`
**Source:** https://replicate.com/lightricks/ltx-2-distilled
**Version:** `6707072d3b2a513cee6ab771021d355b5aa52997dded5e1c97d1bebe8d93f920`

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

const output = await replicate.run("lightricks/ltx-2-distilled", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-2-distilled",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-2-distilled/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation. |
| `image` | string (URL) | No |  | Optional input image for image-to-video generation. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`, `21:9` | No | `"16:9"` | Aspect ratio of the generated video. Ignored if an image is provided. |
| `num_frames` | integer | No | `121` | Number of frames to generate. Must follow formula: 8*k + 1 (e.g., 81, 97, 113, 121). |
| `seed` | integer | No |  | Random seed for reproducibility. |
| `enhance_prompt` | boolean | No | `false` | Use the model's prompt enhancement to expand and improve your prompt. |
| `image_strength` | float | No | `1` | Strength of image conditioning for i2v (0.0-1.0). Higher values follow the image more closely. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-2-distilled",
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

- Model page: https://replicate.com/lightricks/ltx-2-distilled
- API page: https://replicate.com/lightricks/ltx-2-distilled/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
