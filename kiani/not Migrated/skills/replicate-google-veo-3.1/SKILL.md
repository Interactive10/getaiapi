---
name: replicate-google-veo-3.1
description: >
  Use this skill for the Replicate Veo 3.1 model (google/veo-3.1). Use the Veo 3.1 model via Replicate API.
---

# Veo 3.1

**Model:** `google/veo-3.1`
**Source:** https://replicate.com/google/veo-3.1
**Version:** `ed5b1767b711dd15d954b162af1e890d27882680f463a85e94f02d604012b972`

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

const output = await replicate.run("google/veo-3.1", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google/veo-3.1",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google/veo-3.1/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Video aspect ratio |
| `duration` | enum: `4`, `6`, `8` | No | `8` | Video duration in seconds |
| `image` | string (URL) | No |  | Input image to start generating from. Ideal images are 16:9 or 9:16 and 1280x720 or 720x1280, depending on the aspect... |
| `last_frame` | string (URL) | No |  | Ending image for interpolation. When provided with an input image, creates a transition between the two images. |
| `reference_images` | list<string (URL)> | No | `[]` | 1 to 3 reference images for subject-consistent generation (reference-to-video, or R2V). Reference images only work wi... |
| `negative_prompt` | string | No |  | Description of what to exclude from the generated video |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | Resolution of the generated video |
| `generate_audio` | boolean | No | `true` | Generate audio with the video |
| `seed` | integer | No |  | Random seed. Omit for random generations |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "google/veo-3.1",
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

- Model page: https://replicate.com/google/veo-3.1
- API page: https://replicate.com/google/veo-3.1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
