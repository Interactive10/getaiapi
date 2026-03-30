---
name: replicate-andreasjansson-musicgen-looper
description: >
  Use this skill for the Replicate Musicgen Looper model (andreasjansson/musicgen-looper). Use the Musicgen Looper model via Replicate API.
---

# Musicgen Looper

**Model:** `andreasjansson/musicgen-looper`
**Source:** https://replicate.com/andreasjansson/musicgen-looper
**Version:** `f8140d0457c2b39ad8728a80736fea9a67a0ec0cd37b35f40b68cce507db2366`

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

const output = await replicate.run("andreasjansson/musicgen-looper", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("andreasjansson/musicgen-looper",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/andreasjansson/musicgen-looper/predictions \
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
| `prompt` | string | **Yes** |  | A description of the music you want to generate. |
| `bpm` | float | No | `140` | Tempo in beats per minute |
| `variations` | integer | No | `4` | Number of variations to generate |
| `max_duration` | integer | No | `8` | Maximum duration of the generated loop in seconds. |
| `model_version` | enum: `medium`, `large` | No | `"medium"` | Model to use for generation. . |
| `top_k` | integer | No | `250` | Reduces sampling to the k most likely tokens. |
| `top_p` | float | No | `0` | Reduces sampling to tokens with cumulative probability of p. When set to  `0` (default), top_k sampling is used. |
| `temperature` | float | No | `1` | Controls the 'conservativeness' of the sampling process. Higher temperature means more diversity. |
| `classifier_free_guidance` | integer | No | `3` | Increases the influence of inputs on the output. Higher values produce lower-varience outputs that adhere more closel... |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output format for generated audio. |
| `seed` | integer | No | `-1` | Seed for random number generator. If None or -1, a random seed will be used. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `variation_01` | string (URL) |  |
| `variation_02` | string (URL) |  |
| `variation_03` | string (URL) |  |
| `variation_04` | string (URL) |  |
| `variation_05` | string (URL) |  |
| `variation_06` | string (URL) |  |
| `variation_07` | string (URL) |  |
| `variation_08` | string (URL) |  |
| `variation_09` | string (URL) |  |
| `variation_10` | string (URL) |  |
| `variation_11` | string (URL) |  |
| `variation_12` | string (URL) |  |
| `variation_13` | string (URL) |  |
| `variation_14` | string (URL) |  |
| `variation_15` | string (URL) |  |
| `variation_16` | string (URL) |  |
| `variation_17` | string (URL) |  |
| `variation_18` | string (URL) |  |
| `variation_19` | string (URL) |  |
| `variation_20` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "andreasjansson/musicgen-looper",
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

- Model page: https://replicate.com/andreasjansson/musicgen-looper
- API page: https://replicate.com/andreasjansson/musicgen-looper/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
