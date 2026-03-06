---
name: replicate-suno-ai-bark
description: >
  Use this skill for the Replicate Bark model (suno-ai/bark). Use the Bark model via Replicate API.
---

# Bark

**Model:** `suno-ai/bark`
**Source:** https://replicate.com/suno-ai/bark
**Version:** `b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787`

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

const output = await replicate.run("suno-ai/bark", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("suno-ai/bark",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/suno-ai/bark/predictions \
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
| `prompt` | string | No | `"Hello, my name is Suno. And, uh — and I like pizza. [laughs] But I also have other interests such as playing tic tac toe."` | Input prompt |
| `history_prompt` | enum (131 values) | No |  | history choice for audio cloning, choose from the list |
| `custom_history_prompt` | string (URL) | No |  | Provide your own .npz file with history choice for audio cloning, this will override the previous history_prompt setting |
| `text_temp` | float | No | `0.7` | generation temperature (1.0 more diverse, 0.0 more conservative) |
| `waveform_temp` | float | No | `0.7` | generation temperature (1.0 more diverse, 0.0 more conservative) |
| `output_full` | boolean | No | `false` | return full generation as a .npz file to be used as a history prompt |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio_out` | string (URL) |  |
| `prompt_npz` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "suno-ai/bark",
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

- Model page: https://replicate.com/suno-ai/bark
- API page: https://replicate.com/suno-ai/bark/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
