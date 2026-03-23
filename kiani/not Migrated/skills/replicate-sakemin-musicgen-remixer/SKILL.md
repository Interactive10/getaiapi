---
name: replicate-sakemin-musicgen-remixer
description: >
  Use this skill for the Replicate Musicgen Remixer model (sakemin/musicgen-remixer). Use the Musicgen Remixer model via Replicate API.
---

# Musicgen Remixer

**Model:** `sakemin/musicgen-remixer`
**Source:** https://replicate.com/sakemin/musicgen-remixer
**Version:** `0b769f28e399c7c30e4f2360691b9b11c294183e9ab2fd9f3398127b556c86d7`

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

const output = await replicate.run("sakemin/musicgen-remixer", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("sakemin/musicgen-remixer",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sakemin/musicgen-remixer/predictions \
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
| `model_version` | enum: `stereo-chord`, `stereo-chord-large`, `chord`, `chord-large` | No | `"stereo-chord"` | Model type. Computations take longer when using `large` or `stereo` models. |
| `prompt` | string | No |  | A description of the music you want to generate. |
| `music_input` | string (URL) | No |  | An audio file input for the remix. |
| `multi_band_diffusion` | boolean | No | `false` | If `True`, the EnCodec tokens will be decoded with MultiBand Diffusion. Not compatible with `stereo` models. |
| `normalization_strategy` | enum: `loudness`, `clip`, `peak`, `rms` | No | `"loudness"` | Strategy for normalizing audio. |
| `beat_sync_threshold` | float | No |  | When beat syncing, if the gap between generated downbeat timing and input audio downbeat timing is larger than `beat_... |
| `large_chord_voca` | boolean | No | `true` | If `True`, more chords like 7th, diminished and etc are used. If `False` only 12 major and 12 minor chords are used. |
| `chroma_coefficient` | float | No | `1` | Coefficient value multiplied to multi-hot chord chroma. |
| `top_k` | integer | No | `250` | Reduces sampling to the k most likely tokens. |
| `top_p` | float | No | `0` | Reduces sampling to tokens with cumulative probability of p. When set to  `0` (default), top_k sampling is used. |
| `temperature` | float | No | `1` | Controls the 'conservativeness' of the sampling process. Higher temperature means more diversity. |
| `classifier_free_guidance` | integer | No | `3` | Increases the influence of inputs on the output. Higher values produce lower-varience outputs that adhere more closel... |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output format for generated audio. |
| `return_instrumental` | boolean | No | `false` | If `True`, the instrumental audio will also be returned. |
| `seed` | integer | No |  | Seed for random number generator. If `None` or `-1`, a random seed will be used. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sakemin/musicgen-remixer",
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

- Model page: https://replicate.com/sakemin/musicgen-remixer
- API page: https://replicate.com/sakemin/musicgen-remixer/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
