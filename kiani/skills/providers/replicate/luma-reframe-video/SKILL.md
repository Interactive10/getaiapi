---
name: replicate-luma-reframe-video
description: >
  Use this skill for the Replicate Reframe Video model (luma/reframe-video). Use the Reframe Video model via Replicate API.
---

# Reframe Video

**Model:** `luma/reframe-video`
**Source:** https://replicate.com/luma/reframe-video
**Version:** `7a27619ccb64e4f1942e9a53e503142be08d505587313afa1da037b631a6760e`

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

const output = await replicate.run("luma/reframe-video", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("luma/reframe-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/luma/reframe-video/predictions \
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
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio of the output |
| `video` | string (URL) | No |  | The video to reframe. Maximum video duration is 10 seconds. |
| `x_end` | integer | No |  | The x end of the crop bounds, in pixels. Defines the right boundary where your source will be placed in the output fr... |
| `y_end` | integer | No |  | The y end of the crop bounds, in pixels. Defines the bottom boundary where your source will be placed in the output f... |
| `prompt` | string | No |  | A prompt to guide the reframing generation |
| `x_start` | integer | No |  | The x start of the crop bounds, in pixels. Defines the left boundary where your source will be placed in the output f... |
| `y_start` | integer | No |  | The y start of the crop bounds, in pixels. Defines the top boundary where your source will be placed in the output fr... |
| `video_url` | string | No |  | URL of the video to reframe. Maximum video duration is 10 seconds. |
| `grid_position_x` | integer | No |  | The x position of the input in the grid, in pixels. Controls horizontal positioning of the source within the target o... |
| `grid_position_y` | integer | No |  | The y position of the input in the grid, in pixels. Controls vertical positioning of the source within the target out... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "luma/reframe-video",
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

- Model page: https://replicate.com/luma/reframe-video
- API page: https://replicate.com/luma/reframe-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
