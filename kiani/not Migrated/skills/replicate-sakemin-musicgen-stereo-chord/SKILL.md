---
name: replicate-sakemin-musicgen-stereo-chord
description: >
  Use this skill for the Replicate Musicgen Stereo Chord model (sakemin/musicgen-stereo-chord). Use the Musicgen Stereo Chord model via Replicate API.
---

# Musicgen Stereo Chord

**Model:** `sakemin/musicgen-stereo-chord`
**Source:** https://replicate.com/sakemin/musicgen-stereo-chord
**Version:** `fbdc5ef7200220ed300015d9b4fd3f8e620f84547e970b23aa2be7f2ff366a5b`

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

const output = await replicate.run("sakemin/musicgen-stereo-chord", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("sakemin/musicgen-stereo-chord",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sakemin/musicgen-stereo-chord/predictions \
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
| `model_version` | enum: `chord`, `chord-large`, `stereo-chord`, `stereo-chord-large` | No | `"stereo-chord-large"` | Model type. Select `fine-tuned` if you trained the model into your own repository. |
| `prompt` | string | No |  | A description of the music you want to generate. |
| `text_chords` | string | No |  | A text based chord progression condition. Single uppercase alphabet character(eg. `C`) is considered as a major chord... |
| `bpm` | float | No |  | BPM condition for the generated output. `text_chords` will be processed based on this value. This will be appended at... |
| `time_sig` | string | No | `"4/4"` | Time signature value for the generate output. `text_chords` will be processed based on this value. This will be appen... |
| `audio_chords` | string (URL) | No |  | An audio file that will condition the chord progression. You must choose only one among `audio_chords` or `text_chord... |
| `audio_start` | integer | No | `0` | Start time of the audio file to use for chord conditioning. |
| `audio_end` | integer | No |  | End time of the audio file to use for chord conditioning. If None, will default to the end of the audio clip. |
| `duration` | integer | No | `8` | Duration of the generated audio in seconds. |
| `continuation` | boolean | No | `false` | If `True`, generated music will continue from `audio_chords`. If chord conditioning, this is only possible when the c... |
| `multi_band_diffusion` | boolean | No | `false` | If `True`, the EnCodec tokens will be decoded with MultiBand Diffusion. Not compatible with stereo models. |
| `normalization_strategy` | enum: `loudness`, `clip`, `peak`, `rms` | No | `"loudness"` | Strategy for normalizing audio. |
| `chroma_coefficient` | float | No | `1` | Coefficient value multiplied to multi-hot chord chroma. |
| `top_k` | integer | No | `250` | Reduces sampling to the k most likely tokens. |
| `top_p` | float | No | `0` | Reduces sampling to tokens with cumulative probability of p. When set to  `0` (default), top_k sampling is used. |
| `temperature` | float | No | `1` | Controls the 'conservativeness' of the sampling process. Higher temperature means more diversity. |
| `classifier_free_guidance` | integer | No | `3` | Increases the influence of inputs on the output. Higher values produce lower-varience outputs that adhere more closel... |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output format for generated audio. |
| `seed` | integer | No |  | Seed for random number generator. If `None` or `-1`, a random seed will be used. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sakemin/musicgen-stereo-chord",
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

- Model page: https://replicate.com/sakemin/musicgen-stereo-chord
- API page: https://replicate.com/sakemin/musicgen-stereo-chord/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
