---
name: replicate-leonardoai-motion-2.0
description: >
  Use this skill for the Replicate Motion 2.0 model (leonardoai/motion-2.0). Use the Motion 2.0 model via Replicate API.
---

# Motion 2.0

**Model:** `leonardoai/motion-2.0`
**Source:** https://replicate.com/leonardoai/motion-2.0
**Version:** `0cd08fd133f6bfffec01dcb8e21488169f8ce9676dd825a45e99b7c5476d7b40`

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

const output = await replicate.run("leonardoai/motion-2.0", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("leonardoai/motion-2.0",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/leonardoai/motion-2.0/predictions \
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
| `aspect_ratio` | enum: `9:16`, `16:9`, `2:3`, `4:5` | No | `"16:9"` | Aspect ratio of the output video. Ignored if image is provided. |
| `vibe_style` | enum (10 values) | No | `"None"` | Style for the overall vibe of the video. Ignored if image is provided. |
| `lighting_style` | enum (16 values) | No | `"None"` | Style for the lighting of the video. Ignored if image is provided. |
| `shot_type_style` | enum (7 values) | No | `"None"` | Style for the shot type of the video. Ignored if image is provided. |
| `color_theme_style` | enum (14 values) | No | `"None"` | Style for the color theme of the video. Ignored if image is provided. |
| `image` | string (URL) | No |  | Image to use for the first frame of the video |
| `prompt` | string | **Yes** |  | Text prompt for generation |
| `prompt_enhance` | boolean | No | `true` | Whether to enhance the prompt |
| `negative_prompt` | string | No |  | The negative prompt used for the video generation |
| `frame_interpolation` | boolean | No | `true` | Smoothly blend frames for fluid video transitions |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "leonardoai/motion-2.0",
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

- Model page: https://replicate.com/leonardoai/motion-2.0
- API page: https://replicate.com/leonardoai/motion-2.0/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
