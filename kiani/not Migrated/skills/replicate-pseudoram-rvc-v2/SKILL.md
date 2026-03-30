---
name: replicate-pseudoram-rvc-v2
description: >
  Use this skill for the Replicate Rvc V2 model (pseudoram/rvc-v2). Use the Rvc V2 model via Replicate API.
---

# Rvc V2

**Model:** `pseudoram/rvc-v2`
**Source:** https://replicate.com/pseudoram/rvc-v2
**Version:** `d18e2e0a6a6d3af183cc09622cebba8555ec9a9e66983261fc64c8b1572b7dce`

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

const output = await replicate.run("pseudoram/rvc-v2", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("pseudoram/rvc-v2",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/pseudoram/rvc-v2/predictions \
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
| `input_audio` | string (URL) | No |  | Upload your audio file here. |
| `rvc_model` | enum: `Obama`, `Trump`, `Sandy`, `Rogan`, `CUSTOM` | No | `"Obama"` | RVC model for a specific voice. If using a custom model, this should match the name of the downloaded model. If a 'cu... |
| `custom_rvc_model_download_url` | string | No |  | URL to download a custom RVC model. If provided, the model will be downloaded (if it doesn't already exist) and used ... |
| `pitch_change` | float | No | `0` | Adjust pitch of AI vocals in semitones. Use positive values to increase pitch, negative to decrease. |
| `index_rate` | float | No | `0.5` | Control how much of the AI's accent to leave in the vocals. |
| `filter_radius` | integer | No | `3` | If >=3: apply median filtering to the harvested pitch results. |
| `rms_mix_rate` | float | No | `0.25` | Control how much to use the original vocal's loudness (0) or a fixed loudness (1). |
| `f0_method` | enum: `rmvpe`, `mangio-crepe` | No | `"rmvpe"` | Pitch detection algorithm. 'rmvpe' for clarity in vocals, 'mangio-crepe' for smoother vocals. |
| `crepe_hop_length` | integer | No | `128` | When `f0_method` is set to `mangio-crepe`, this controls how often it checks for pitch changes in milliseconds. |
| `protect` | float | No | `0.33` | Control how much of the original vocals' breath and voiceless consonants to leave in the AI vocals. Set 0.5 to disable. |
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
  model: "pseudoram/rvc-v2",
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

- Model page: https://replicate.com/pseudoram/rvc-v2
- API page: https://replicate.com/pseudoram/rvc-v2/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
