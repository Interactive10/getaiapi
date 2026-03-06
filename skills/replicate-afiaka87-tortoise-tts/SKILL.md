---
name: replicate-afiaka87-tortoise-tts
description: >
  Use this skill for the Replicate Tortoise Tts model (afiaka87/tortoise-tts). Use the Tortoise Tts model via Replicate API.
---

# Tortoise Tts

**Model:** `afiaka87/tortoise-tts`
**Source:** https://replicate.com/afiaka87/tortoise-tts
**Version:** `e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71`

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

const output = await replicate.run("afiaka87/tortoise-tts", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("afiaka87/tortoise-tts",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/afiaka87/tortoise-tts/predictions \
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
| `text` | string | No | `"The expressiveness of autoregressive transformers is literally nuts! I absolutely adore them."` | Text to speak. |
| `voice_a` | enum (33 values) | No | `"random"` | Selects the voice to use for generation. Use `random` to select a random voice. Use `custom_voice` to use a custom vo... |
| `custom_voice` | string (URL) | No |  | (Optional) Create a custom voice based on an mp3 file of a speaker. Audio should be at least 15 seconds, only contain... |
| `voice_b` | enum (33 values) | No | `"disabled"` | (Optional) Create new voice from averaging the latents for `voice_a`, `voice_b` and `voice_c`. Use `disabled` to disa... |
| `voice_c` | enum (33 values) | No | `"disabled"` | (Optional) Create new voice from averaging the latents for `voice_a`, `voice_b` and `voice_c`. Use `disabled` to disa... |
| `preset` | enum: `ultra_fast`, `fast`, `standard`, `high_quality` | No | `"fast"` | Which voice preset to use. See the documentation for more information. |
| `seed` | integer | No | `0` | Random seed which can be used to reproduce results. |
| `cvvp_amount` | float | No | `0` | How much the CVVP model should influence the output. Increasing this can in some cases reduce the likelyhood of multi... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "afiaka87/tortoise-tts",
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

- Model page: https://replicate.com/afiaka87/tortoise-tts
- API page: https://replicate.com/afiaka87/tortoise-tts/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
