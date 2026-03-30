---
name: replicate-minimax-music-2.5
description: >
  Use this skill for the Replicate Music 2.5 model (minimax/music-2.5). Use the Music 2.5 model via Replicate API.
---

# Music 2.5

**Model:** `minimax/music-2.5`
**Source:** https://replicate.com/minimax/music-2.5
**Version:** `671479498076193e8197f6c906cc2ea24daf83412e177144d4c678f47066290f`

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

const output = await replicate.run("minimax/music-2.5", {
  input: {
        "lyrics": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/music-2.5",
    input={
        "lyrics": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/music-2.5/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"lyrics": "your value here"}}'
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
| `lyrics` | string | **Yes** |  | Lyrics for the song. Use \n to separate lines. You can add structure tags like [Intro], [Verse], [Pre Chorus], [Choru... |
| `prompt` | string | No | `""` | A description of the music style, mood, and scenario. For example: 'Pop, melancholic, perfect for a rainy night'. 0-2... |
| `sample_rate` | enum: `16000`, `24000`, `32000`, `44100` | No | `44100` | Sample rate for the generated music |
| `bitrate` | enum: `32000`, `64000`, `128000`, `256000` | No | `256000` | Bitrate for the generated music |
| `audio_format` | enum: `mp3`, `wav`, `pcm` | No | `"mp3"` | Audio format for the output |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/music-2.5",
  input: {
        "lyrics": "your value here"
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

- Model page: https://replicate.com/minimax/music-2.5
- API page: https://replicate.com/minimax/music-2.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
