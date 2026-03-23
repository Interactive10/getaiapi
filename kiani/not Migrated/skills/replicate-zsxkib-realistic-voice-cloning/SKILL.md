---
name: replicate-zsxkib-realistic-voice-cloning
description: >
  Use this skill for the Replicate Realistic Voice Cloning model (zsxkib/realistic-voice-cloning). Use the Realistic Voice Cloning model via Replicate API.
---

# Realistic Voice Cloning

**Model:** `zsxkib/realistic-voice-cloning`
**Source:** https://replicate.com/zsxkib/realistic-voice-cloning
**Version:** `0a9c7c558af4c0f20667c1bd1260ce32a2879944a0b9e44e1398660c077b1550`

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

const output = await replicate.run("zsxkib/realistic-voice-cloning", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/realistic-voice-cloning",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/realistic-voice-cloning/predictions \
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
| `song_input` | string (URL) | No |  | Upload your audio file here. |
| `rvc_model` | enum (11 values) | No | `"Squidward"` | RVC model for a specific voice. If using a custom model, this should match the name of the downloaded model. If a 'cu... |
| `custom_rvc_model_download_url` | string | No |  | URL to download a custom RVC model. If provided, the model will be downloaded (if it doesn't already exist) and used ... |
| `pitch_change` | enum: `no-change`, `male-to-female`, `female-to-male` | No | `"no-change"` | Adjust pitch of AI vocals. Options: `no-change`, `male-to-female`, `female-to-male`. |
| `index_rate` | float | No | `0.5` | Control how much of the AI's accent to leave in the vocals. |
| `filter_radius` | integer | No | `3` | If >=3: apply median filtering median filtering to the harvested pitch results. |
| `rms_mix_rate` | float | No | `0.25` | Control how much to use the original vocal's loudness (0) or a fixed loudness (1). |
| `pitch_detection_algorithm` | enum: `rmvpe`, `mangio-crepe` | No | `"rmvpe"` | Best option is rmvpe (clarity in vocals), then mangio-crepe (smoother vocals). |
| `crepe_hop_length` | integer | No | `128` | When `pitch_detection_algo` is set to `mangio-crepe`, this controls how often it checks for pitch changes in millisec... |
| `protect` | float | No | `0.33` | Control how much of the original vocals' breath and voiceless consonants to leave in the AI vocals. Set 0.5 to disable. |
| `main_vocals_volume_change` | float | No | `0` | Control volume of main AI vocals. Use -3 to decrease the volume by 3 decibels, or 3 to increase the volume by 3 decib... |
| `backup_vocals_volume_change` | float | No | `0` | Control volume of backup AI vocals. |
| `instrumental_volume_change` | float | No | `0` | Control volume of the background music/instrumentals. |
| `pitch_change_all` | float | No | `0` | Change pitch/key of background music, backup vocals and AI vocals in semitones. Reduces sound quality slightly. |
| `reverb_size` | float | No | `0.15` | The larger the room, the longer the reverb time. |
| `reverb_wetness` | float | No | `0.2` | Level of AI vocals with reverb. |
| `reverb_dryness` | float | No | `0.8` | Level of AI vocals without reverb. |
| `reverb_damping` | float | No | `0.7` | Absorption of high frequencies in the reverb. |
| `output_format` | enum: `mp3`, `wav` | No | `"mp3"` | wav for best quality and large file size, mp3 for decent quality and small file size. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/realistic-voice-cloning",
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

- Model page: https://replicate.com/zsxkib/realistic-voice-cloning
- API page: https://replicate.com/zsxkib/realistic-voice-cloning/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
