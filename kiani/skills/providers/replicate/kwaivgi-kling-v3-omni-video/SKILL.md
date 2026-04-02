---
name: replicate-kwaivgi-kling-v3-omni-video
description: >
  Use this skill for the Replicate Kling V3 Omni Video model (kwaivgi/kling-v3-omni-video). Use the Kling V3 Omni Video model via Replicate API.
---

# Kling V3 Omni Video

**Model:** `kwaivgi/kling-v3-omni-video`
**Source:** https://replicate.com/kwaivgi/kling-v3-omni-video
**Version:** `1d449e255319a7c07feca688cf0596cb82cc8a96ceddff6c44fd0d090b4e830c`

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

const output = await replicate.run("kwaivgi/kling-v3-omni-video", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("kwaivgi/kling-v3-omni-video",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/kwaivgi/kling-v3-omni-video/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation. Supports <<<image_1>>>, <<<video_1>>> template references. Max 2500 characters. |
| `start_image` | string (URL) | No |  | First frame image. Supports .jpg/.jpeg/.png, max 10MB, min 300px, aspect ratio 1:2.5 to 2.5:1. |
| `end_image` | string (URL) | No |  | Last frame image. Requires start_image. Supports .jpg/.jpeg/.png, max 10MB, min 300px. |
| `reference_images` | list<> | No |  | Reference images for elements, scenes, or styles. Supports .jpg/.jpeg/.png. Max 7 without video, 4 with video. |
| `reference_video` | string (URL) | No |  | Reference video (.mp4/.mov). Duration 3-10s, resolution 720-2160px per side, max 200MB. |
| `video_reference_type` | enum: `feature`, `base` | No | `"feature"` | How to use reference video: 'feature' for style/camera reference, 'base' for video editing. |
| `keep_original_sound` | boolean | No | `true` | Keep original sound from reference video. |
| `generate_audio` | boolean | No | `false` | Generate native audio. Mutually exclusive with reference video. |
| `mode` | enum: `standard`, `pro` | No | `"pro"` | 'standard' generates 720p, 'pro' generates 1080p. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio. Required when not using start frame or video editing. |
| `duration` | integer | No | `5` | Video duration in seconds (3-15). Ignored for video editing (base). |
| `multi_prompt` | string | No |  | JSON array of shot definitions for multi-shot mode. Each shot: {"prompt": "...", "duration": N}. Max 6 shots, min dur... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "kwaivgi/kling-v3-omni-video",
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

- Model page: https://replicate.com/kwaivgi/kling-v3-omni-video
- API page: https://replicate.com/kwaivgi/kling-v3-omni-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
