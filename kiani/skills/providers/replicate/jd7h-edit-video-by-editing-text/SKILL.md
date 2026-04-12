---
name: replicate-jd7h-edit-video-by-editing-text
description: >
  Use this skill for the Replicate Edit Video By Editing Text model (jd7h/edit-video-by-editing-text). Use the Edit Video By Editing Text model via Replicate API.
---

# Edit Video By Editing Text

**Model:** `jd7h/edit-video-by-editing-text`
**Source:** https://replicate.com/jd7h/edit-video-by-editing-text
**Version:** `e010b880347314d07e3ce3b21cbd4c57add51fea3474677a6cb1316751c4cb90`

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

const output = await replicate.run("jd7h/edit-video-by-editing-text", {
  input: {
        "video_in": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("jd7h/edit-video-by-editing-text",
    input={
        "video_in": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/jd7h/edit-video-by-editing-text/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video_in": "https://example.com/input.png"}}'
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
| `video_in` | string (URL) | **Yes** |  | Video file to transcribe or edit |
| `mode` | enum: `edit`, `transcribe` | No | `"transcribe"` | Mode: either transcribe or edit |
| `transcription` | string | No |  | When using mode 'edit', this should be the transcription of the desired output video. Use mode 'transcribe' to create... |
| `split_at` | enum: `word`, `character` | No | `"word"` | When using mode 'edit', split transcription at the word level or character level. Default: word level. Character leve... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | string (URL) |  |
| `transcription` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "jd7h/edit-video-by-editing-text",
  input: {
        "video_in": "https://example.com/input.png"
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

- Model page: https://replicate.com/jd7h/edit-video-by-editing-text
- API page: https://replicate.com/jd7h/edit-video-by-editing-text/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
