---
name: replicate-minimax-music-01
description: >
  Use this skill for the Replicate Music 01 model (minimax/music-01). Use the Music 01 model via Replicate API.
---

# Music 01

**Model:** `minimax/music-01`
**Source:** https://replicate.com/minimax/music-01
**Version:** `0254c7e2f54315b667dbae03da7c155822ba29ffe0457be5bc246d564be486bd`

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

const output = await replicate.run("minimax/music-01", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("minimax/music-01",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/minimax/music-01/predictions \
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
| `sample_rate` | enum: `16000`, `24000`, `32000`, `44100` | No | `44100` | Sample rate for the generated music |
| `bitrate` | enum: `32000`, `64000`, `128000`, `256000` | No | `256000` | Bitrate for the generated music |
| `lyrics` | string | No | `""` | Lyrics with optional formatting. You can use a newline to separate each line of lyrics. You can use two newlines to a... |
| `voice_id` | string | No |  | Reuse a previously uploaded voice ID |
| `song_file` | string (URL) | No |  | Reference song, should contain music and vocals. Must be a .wav or .mp3 file longer than 15 seconds. |
| `voice_file` | string (URL) | No |  | Voice reference. Must be a .wav or .mp3 file longer than 15 seconds. If only a voice reference is given, an a cappell... |
| `instrumental_id` | string | No |  | Reuse a previously uploaded instrumental ID |
| `instrumental_file` | string (URL) | No |  | Instrumental reference. Must be a .wav or .mp3 file longer than 15 seconds. If only an instrumental reference is give... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "minimax/music-01",
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

- Model page: https://replicate.com/minimax/music-01
- API page: https://replicate.com/minimax/music-01/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
