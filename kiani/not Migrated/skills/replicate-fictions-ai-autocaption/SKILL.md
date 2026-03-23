---
name: replicate-fictions-ai-autocaption
description: >
  Use this skill for the Replicate Autocaption model (fictions-ai/autocaption). Use the Autocaption model via Replicate API.
---

# Autocaption

**Model:** `fictions-ai/autocaption`
**Source:** https://replicate.com/fictions-ai/autocaption
**Version:** `18a45ff0d95feb4449d192bbdc06b4a6df168fa33def76dfc51b78ae224b599b`

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

const output = await replicate.run("fictions-ai/autocaption", {
  input: {
        "video_file_input": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fictions-ai/autocaption",
    input={
        "video_file_input": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fictions-ai/autocaption/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video_file_input": "https://example.com/input.png"}}'
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
| `video_file_input` | string (URL) | **Yes** |  | Video file |
| `transcript_file_input` | string (URL) | No |  | Transcript file, if provided will use this for words rather than whisper. |
| `output_video` | boolean | No | `true` | Output video, if true will output the video with subtitles |
| `output_transcript` | boolean | No | `true` | Output transcript json, if true will output a transcript file that you can edit and use for the next run in transcrip... |
| `subs_position` | enum: `bottom75`, `center`, `top`, `bottom`, `left`, `right` | No | `"bottom75"` | Subtitles position |
| `color` | string | No | `"white"` | Caption color |
| `highlight_color` | string | No | `"yellow"` | Highlight color |
| `fontsize` | float | No | `7` | Font size. 7.0 is good for videos, 4.0 is good for reels |
| `MaxChars` | integer | No | `20` | Max characters space for subtitles. 20 is good for videos, 10 is good for reels |
| `opacity` | float | No | `0` | Opacity for the subtitles background |
| `font` | enum (14 values) | No | `"Poppins/Poppins-ExtraBold.ttf"` | Font |
| `stroke_color` | string | No | `"black"` | Stroke color |
| `stroke_width` | float | No | `2.6` | Stroke width |
| `kerning` | float | No | `-5` | Kerning for the subtitles |
| `right_to_left` | boolean | No | `false` | Right to left subtitles, for right to left languages. Only Arial fonts are supported. |
| `translate` | boolean | No | `false` | Translate the subtitles to English |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fictions-ai/autocaption",
  input: {
        "video_file_input": "https://example.com/input.png"
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

- Model page: https://replicate.com/fictions-ai/autocaption
- API page: https://replicate.com/fictions-ai/autocaption/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
