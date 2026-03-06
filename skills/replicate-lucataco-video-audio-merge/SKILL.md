---
name: replicate-lucataco-video-audio-merge
description: >
  Use this skill for the Replicate Video Audio Merge model (lucataco/video-audio-merge). Use the Video Audio Merge model via Replicate API.
---

# Video Audio Merge

**Model:** `lucataco/video-audio-merge`
**Source:** https://replicate.com/lucataco/video-audio-merge
**Version:** `8c3d57c9c9a1aaa05feabafbcd2dff9f68a5cb394e54ec020c1c2dcc42bde109`

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

const output = await replicate.run("lucataco/video-audio-merge", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/video-audio-merge",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/video-audio-merge/predictions \
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
| `video_file` | string (URL) | No |  | Input video file (MP4, MOV, AVI, etc.) |
| `audio_file` | string (URL) | No |  | Input audio file (MP3, WAV, AAC, etc.) |
| `duration_mode` | enum: `video`, `audio` | No | `"video"` | How to handle duration when video and audio lengths differ |
| `replace_audio` | boolean | No | `true` | Replace original audio completely (True) or mix with original audio (False) |
| `audio_volume` | float | No | `1` | Audio volume multiplier (1.0 = original volume) |
| `output_format` | enum: `mp4`, `mov`, `avi`, `mkv` | No | `"mp4"` | Output video format |
| `video_codec` | enum: `h264`, `h265`, `vp9`, `copy` | No | `"h264"` | Video codec for output |
| `audio_codec` | enum: `aac`, `mp3`, `copy` | No | `"aac"` | Audio codec for output |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/video-audio-merge",
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

- Model page: https://replicate.com/lucataco/video-audio-merge
- API page: https://replicate.com/lucataco/video-audio-merge/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
