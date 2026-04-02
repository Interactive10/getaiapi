---
name: replicate-collectiveai-team-speaker-diarization-3
description: >
  Use this skill for the Replicate Speaker Diarization 3 model (collectiveai-team/speaker-diarization-3). Use the Speaker Diarization 3 model via Replicate API.
---

# Speaker Diarization 3

**Model:** `collectiveai-team/speaker-diarization-3`
**Source:** https://replicate.com/collectiveai-team/speaker-diarization-3
**Version:** `6e29843b8c1b751ec384ad96d3566af2392046465152fef3cc22ad701090b64c`

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

const output = await replicate.run("collectiveai-team/speaker-diarization-3", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("collectiveai-team/speaker-diarization-3",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/collectiveai-team/speaker-diarization-3/predictions \
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
| `audio` | string (URL) | No | `"https://replicate.delivery/pbxt/IZjTvet2ZGiyiYaMEEPrzn0xY1UDNsh0NfcO9qeTlpwCo7ig/lex-levin-4min.mp3"` | Audio file or url |
| `num_speakers` | integer | No |  | Number of speakers to diarize. Default: infer |
| `min_speakers` | integer | No |  | Minimum number of speakers to diarize. Default: None |
| `max_speakers` | integer | No |  | Maximum number of speakers to diarize. Default: None |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `segments` | list<SpeakerSegment> |  |
| `speakers` | Speakers |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "collectiveai-team/speaker-diarization-3",
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

- Model page: https://replicate.com/collectiveai-team/speaker-diarization-3
- API page: https://replicate.com/collectiveai-team/speaker-diarization-3/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
