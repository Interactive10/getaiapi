---
name: replicate-minimax-music-1.5
description: >
  Use this skill for the Replicate Music 1.5 model (minimax/music-1.5). Use the Music 1.5 model via Replicate API.
---

# Music 1.5

**Model:** `minimax/music-1.5`
**Source:** https://replicate.com/minimax/music-1.5
**Version:** `70c8395540eae909be2c09a0b4897d22ee2455a5e5c9826b71161743b5cc45f1`

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

const output = await replicate.run("minimax/music-1.5", {
  input: {
        "lyrics": "your value here",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/music-1.5",
    input={
        "lyrics": "your value here",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/music-1.5/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"lyrics": "your value here", "prompt": "your prompt here"}}'
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
| `sample_rate` | enum: `16000`, `24000`, `32000`, `44100` | No | `44100` | Sample rate for the generated music |
| `bitrate` | enum: `32000`, `64000`, `128000`, `256000` | No | `256000` | Bitrate for the generated music |
| `audio_format` | enum: `mp3`, `wav`, `pcm` | No | `"mp3"` | Audio format |
| `lyrics` | string | **Yes** |  | Lyrics. Use   to separate lines. Supports [intro][verse][chorus][bridge][outro]. Valid input: 10-600 characters. |
| `prompt` | string | **Yes** |  | Control music generation with a text prompt. Valid input: 10-300 characters. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/music-1.5",
  input: {
        "lyrics": "your value here",
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

- Model page: https://replicate.com/minimax/music-1.5
- API page: https://replicate.com/minimax/music-1.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
