---
name: replicate-usamaehsan-controlnet-1.1-x-realistic-vision-v2.0
description: >
  Use this skill for the Replicate Controlnet 1.1 X Realistic Vision V2.0 model (usamaehsan/controlnet-1.1-x-realistic-vision-v2.0). Use the Controlnet 1.1 X Realistic Vision V2.0 model via Replicate API.
---

# Controlnet 1.1 X Realistic Vision V2.0

**Model:** `usamaehsan/controlnet-1.1-x-realistic-vision-v2.0`
**Source:** https://replicate.com/usamaehsan/controlnet-1.1-x-realistic-vision-v2.0
**Version:** `51778c7522eb99added82c0c52873d7a391eecf5fcc3ac7856613b7e6443f2f7`

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

const output = await replicate.run("usamaehsan/controlnet-1.1-x-realistic-vision-v2.0", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("usamaehsan/controlnet-1.1-x-realistic-vision-v2.0",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/usamaehsan/controlnet-1.1-x-realistic-vision-v2.0/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Input image |
| `prompt` | string | No | `"(a tabby cat)+++, high resolution, sitting on a park bench"` |  |
| `negative_prompt` | string | No | `"(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck"` |  |
| `strength` | float | No | `0.8` | control strength/weight |
| `max_height` | float | No | `612` | max height of mask/image |
| `max_width` | float | No | `612` | max width of mask/image |
| `steps` | integer | No | `20` | num_inference_steps |
| `seed` | integer | No |  | Leave blank to randomize |
| `guidance_scale` | integer | No | `10` | guidance_scale |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "usamaehsan/controlnet-1.1-x-realistic-vision-v2.0",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/usamaehsan/controlnet-1.1-x-realistic-vision-v2.0
- API page: https://replicate.com/usamaehsan/controlnet-1.1-x-realistic-vision-v2.0/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
