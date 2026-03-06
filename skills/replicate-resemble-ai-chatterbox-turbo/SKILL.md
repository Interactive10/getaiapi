---
name: replicate-resemble-ai-chatterbox-turbo
description: >
  Use this skill for the Replicate Chatterbox Turbo model (resemble-ai/chatterbox-turbo). Use the Chatterbox Turbo model via Replicate API.
---

# Chatterbox Turbo

**Model:** `resemble-ai/chatterbox-turbo`
**Source:** https://replicate.com/resemble-ai/chatterbox-turbo
**Version:** `95c87b883ff3e842a1643044dff67f9d204f70a80228f24ff64bffe4a4b917d4`

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

const output = await replicate.run("resemble-ai/chatterbox-turbo", {
  input: {
        "text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("resemble-ai/chatterbox-turbo",
    input={
        "text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/resemble-ai/chatterbox-turbo/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "your value here"}}'
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
| `text` | string | **Yes** |  | Text to synthesize into speech (maximum 500 characters).  Supported paralinguistic tags you can include in your text:... |
| `voice` | enum (20 values) | No | `"Andy"` | Pre-made voice to use for synthesis. Ignored if reference_audio is provided. |
| `reference_audio` | string (URL) | No |  | Reference audio file for voice cloning (optional). Must be longer than 5 seconds. If provided, overrides the voice se... |
| `temperature` | float | No | `0.8` | Controls randomness in generation. Higher values produce more varied speech. |
| `top_p` | float | No | `0.95` | Nucleus sampling threshold. Lower values make output more focused. |
| `top_k` | integer | No | `1000` | Top-k sampling. Limits vocabulary to top k tokens at each step. |
| `repetition_penalty` | float | No | `1.2` | Penalizes token repetition. Higher values reduce repetition. |
| `seed` | integer | No |  | Random seed for reproducible results. Leave blank for random generation. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "resemble-ai/chatterbox-turbo",
  input: {
        "text": "your value here"
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

- Model page: https://replicate.com/resemble-ai/chatterbox-turbo
- API page: https://replicate.com/resemble-ai/chatterbox-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
