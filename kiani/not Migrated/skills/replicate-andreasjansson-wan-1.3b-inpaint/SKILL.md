---
name: replicate-andreasjansson-wan-1.3b-inpaint
description: >
  Use this skill for the Replicate Wan 1.3B Inpaint model (andreasjansson/wan-1.3b-inpaint). Use the Wan 1.3B Inpaint model via Replicate API.
---

# Wan 1.3B Inpaint

**Model:** `andreasjansson/wan-1.3b-inpaint`
**Source:** https://replicate.com/andreasjansson/wan-1.3b-inpaint
**Version:** `7abfdb3370aba087f9a5eb8b733c2174bc873a957e5c2c4835767247287dbf89`

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

const output = await replicate.run("andreasjansson/wan-1.3b-inpaint", {
  input: {
        "prompt": "your prompt here",
        "input_video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("andreasjansson/wan-1.3b-inpaint",
    input={
        "prompt": "your prompt here",
        "input_video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/wan-1.3b-inpaint/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "input_video": "https://example.com/input.png"}}'
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
| `prompt` | string | **Yes** |  | Prompt for inpainting the masked area |
| `input_video` | string (URL) | **Yes** |  | Original video to be inpainted |
| `mask_video` | string (URL) | No |  | Mask video (white areas will be inpainted). Leave blank for video-to-video |
| `negative_prompt` | string | No | `""` | Negative prompt |
| `strength` | float | No | `0.9` | Strength of inpainting effect, 1.0 is full regeneration |
| `guide_scale` | float | No | `5` | Guidance scale for prompt adherence |
| `sampling_steps` | integer | No | `50` | Number of sampling steps |
| `inpaint_fixup_steps` | integer | No | `0` | Number of steps for final inpaint fixup. Ignored when in video-to-video mode (when mask_video is empty) |
| `expand_mask` | integer | No | `10` | Expand the mask by a number of pixels |
| `keep_aspect_ratio` | boolean | No | `false` | Keep the aspect ratio of the input video. This will degrade the quality of the inpainting. |
| `frames_per_second` | integer | No | `16` | Output video FPS |
| `seed` | integer | No | `-1` | Random seed. Leave blank for random |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/wan-1.3b-inpaint",
  input: {
        "prompt": "your prompt here",
        "input_video": "https://example.com/input.png"
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

- Model page: https://replicate.com/andreasjansson/wan-1.3b-inpaint
- API page: https://replicate.com/andreasjansson/wan-1.3b-inpaint/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
