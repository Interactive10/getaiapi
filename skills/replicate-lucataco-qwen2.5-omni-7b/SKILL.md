---
name: replicate-lucataco-qwen2.5-omni-7b
description: >
  Use this skill for the Replicate Qwen2.5 Omni 7B model (lucataco/qwen2.5-omni-7b). Use the Qwen2.5 Omni 7B model via Replicate API.
---

# Qwen2.5 Omni 7B

**Model:** `lucataco/qwen2.5-omni-7b`
**Source:** https://replicate.com/lucataco/qwen2.5-omni-7b
**Version:** `0ca8160f7aaf85703a6aac282d6c79aa64d3541b239fa4c5c1688b10cb1faef1`

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

const output = await replicate.run("lucataco/qwen2.5-omni-7b", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/qwen2.5-omni-7b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/qwen2.5-omni-7b/predictions \
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
| `prompt` | string | No |  | Text prompt for the model |
| `image` | string (URL) | No |  | Optional image input |
| `audio` | string (URL) | No |  | Optional audio input |
| `video` | string (URL) | No |  | Optional video input |
| `system_prompt` | string | No | `"You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."` | System prompt for the model |
| `use_audio_in_video` | boolean | No | `true` | Whether to use audio in video |
| `voice_type` | enum: `Chelsie`, `Ethan` | No | `"Chelsie"` | Voice type for audio output |
| `generate_audio` | boolean | No | `true` | Whether to generate audio output |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string |  |
| `voice` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/qwen2.5-omni-7b",
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

- Model page: https://replicate.com/lucataco/qwen2.5-omni-7b
- API page: https://replicate.com/lucataco/qwen2.5-omni-7b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
