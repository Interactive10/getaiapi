---
name: replicate-mirelo-video-to-sfx-v1
description: >
  Use this skill for the Replicate Video To Sfx V1 model (mirelo/video-to-sfx-v1). Use the Video To Sfx V1 model via Replicate API.
---

# Video To Sfx V1

**Model:** `mirelo/video-to-sfx-v1`
**Source:** https://replicate.com/mirelo/video-to-sfx-v1
**Version:** `34ea7bf892b6e989be29a9ee613d36a31d62fcbccc79b8c3f27852e0f01f2f87`

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

const output = await replicate.run("mirelo/video-to-sfx-v1", {
  input: {
        "video_path": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("mirelo/video-to-sfx-v1",
    input={
        "video_path": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/mirelo/video-to-sfx-v1/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video_path": "https://example.com/input.png"}}'
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
| `video_path` | string (URL) | **Yes** |  | Video file to process for sound effects. Video will be trimmed to 10 sec if longer |
| `text_prompt` | string | No | `""` | Text prompt to guide sound effect generation. Optional text to guide the sound generation process. |
| `seed` | integer | No |  | Random seed for reproducibility. Leave blank (None) or use -1 for random seed, or any integer for deterministic results. |
| `num_samples` | integer | No | `2` | Number of sound effects to generate. Each sample will be a different variation. |
| `duration` | integer | No | `10` | Duration of the generated sound effects in seconds. |
| `steps` | integer | No | `25` | Number of processing steps for the generation model. Higher values may improve quality but take longer. |
| `creativity_coef` | float | No | `4.5` | Creativity coefficient to control the creativity of the generated sound. Higher values are more creative. |
| `start_offset` | float | No | `0` | Starting point in the video (in seconds) from which to generate audio. 0 means start from the beginning. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "mirelo/video-to-sfx-v1",
  input: {
        "video_path": "https://example.com/input.png"
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

- Model page: https://replicate.com/mirelo/video-to-sfx-v1
- API page: https://replicate.com/mirelo/video-to-sfx-v1/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
