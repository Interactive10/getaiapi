---
name: replicate-luma-ray-flash-2-540p
description: >
  Use this skill for the Replicate Ray Flash 2 540P model (luma/ray-flash-2-540p). Use the Ray Flash 2 540P model via Replicate API.
---

# Ray Flash 2 540P

**Model:** `luma/ray-flash-2-540p`
**Source:** https://replicate.com/luma/ray-flash-2-540p
**Version:** `ab7a8dbfe56fe6712c7a64f684930372677a31a3470d260f4786928395c1c5cc`

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

const output = await replicate.run("luma/ray-flash-2-540p", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("luma/ray-flash-2-540p",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/luma/ray-flash-2-540p/predictions \
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
| `duration` | enum: `5`, `9` | No | `5` | Duration of the video in seconds |
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | Aspect ratio of the generated video |
| `loop` | boolean | No | `false` | Whether the video should loop, with the last frame matching the first frame for smooth, continuous playback. |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `concepts` | list<string> | No |  | List of camera concepts to apply to the video generation. Concepts include: truck_left, pan_right, pedestal_down, low... |
| `end_image` | string (URL) | No |  | An optional last frame of the video to use as the ending frame. |
| `start_image` | string (URL) | No |  | An optional first frame of the video to use as the starting frame. |
| `end_image_url` | string | No |  | Deprecated: Use end_image instead |
| `start_image_url` | string | No |  | Deprecated: Use start_image instead |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "luma/ray-flash-2-540p",
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

- Model page: https://replicate.com/luma/ray-flash-2-540p
- API page: https://replicate.com/luma/ray-flash-2-540p/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
