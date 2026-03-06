---
name: replicate-lightricks-ltx-video
description: >
  Use this skill for the Replicate Ltx Video model (lightricks/ltx-video). Use the Ltx Video model via Replicate API.
---

# Ltx Video

**Model:** `lightricks/ltx-video`
**Source:** https://replicate.com/lightricks/ltx-video
**Version:** `8c47da666861d081eeb4d1261853087de23923a268a69b63febdf5dc1dee08e4`

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

const output = await replicate.run("lightricks/ltx-video", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lightricks/ltx-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lightricks/ltx-video/predictions \
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
| `prompt` | string | No | `"best quality, 4k, HDR, a tracking shot of a beautiful scene"` | Text prompt for the video. This model needs long descriptive prompts, if the prompt is too short the quality won't be... |
| `negative_prompt` | string | No | `"low quality, worst quality, deformed, distorted"` | Things you do not want to see in your video |
| `image` | string (URL) | No |  | Optional input image to use as the starting frame |
| `image_noise_scale` | float | No | `0.15` | Lower numbers stick more closely to the input image |
| `target_size` | enum (9 values) | No | `640` | Target size for the output video |
| `aspect_ratio` | enum (13 values) | No | `"3:2"` | Aspect ratio of the output video. Ignored if an image is provided. |
| `cfg` | float | No | `3` | How strongly the video follows the prompt |
| `steps` | integer | No | `30` | Number of steps |
| `length` | enum: `97`, `129`, `161`, `193`, `225`, `257` | No | `97` | Length of the output video in frames |
| `model` | enum: `0.9.1`, `0.9` | No | `"0.9.1"` | Model version to use |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lightricks/ltx-video",
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

- Model page: https://replicate.com/lightricks/ltx-video
- API page: https://replicate.com/lightricks/ltx-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
