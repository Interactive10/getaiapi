---
name: replicate-fofr-audio-to-waveform
description: >
  Use this skill for the Replicate Audio To Waveform model (fofr/audio-to-waveform). Use the Audio To Waveform model via Replicate API.
---

# Audio To Waveform

**Model:** `fofr/audio-to-waveform`
**Source:** https://replicate.com/fofr/audio-to-waveform
**Version:** `116cf9b97d0a117cfe64310637bf99ae8542cc35d813744c6ab178a3e134ff5a`

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

const output = await replicate.run("fofr/audio-to-waveform", {
  input: {
        "audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/audio-to-waveform",
    input={
        "audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/audio-to-waveform/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"audio": "your value here"}}'
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
| `audio` | string (URL) | **Yes** |  | Audio file to create waveform from |
| `bg_color` | string | No | `"#000000"` | Background color of waveform |
| `fg_alpha` | float | No | `0.75` | Opacity of foreground waveform |
| `bars_color` | string | No | `"#ffffff"` | Color of waveform bars |
| `bar_count` | integer | No | `100` | Number of bars in waveform |
| `bar_width` | float | No | `0.4` | Width of bars in waveform. 1 represents full width, 0.5 represents half width, etc. |
| `caption_text` | string | No | `""` | Caption text for the video |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/audio-to-waveform",
  input: {
        "audio": "your value here"
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

- Model page: https://replicate.com/fofr/audio-to-waveform
- API page: https://replicate.com/fofr/audio-to-waveform/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
