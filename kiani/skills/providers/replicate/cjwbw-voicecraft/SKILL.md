---
name: replicate-cjwbw-voicecraft
description: >
  Use this skill for the Replicate Voicecraft model (cjwbw/voicecraft). Use the Voicecraft model via Replicate API.
---

# Voicecraft

**Model:** `cjwbw/voicecraft`
**Source:** https://replicate.com/cjwbw/voicecraft
**Version:** `db97f6312d4c4d20e500e47fd95d8f14b00d8d28e046834faffb7999d83b6b30`

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

const output = await replicate.run("cjwbw/voicecraft", {
  input: {
        "orig_audio": "your value here",
        "target_transcript": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/voicecraft",
    input={
        "orig_audio": "your value here",
        "target_transcript": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/voicecraft/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"orig_audio": "your value here", "target_transcript": "your value here"}}'
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
| `task` | enum: `speech_editing-substitution`, `speech_editing-insertion`, `speech_editing-deletion`, `zero-shot text-to-speech` | No | `"zero-shot text-to-speech"` | Choose a task |
| `voicecraft_model` | enum: `giga830M.pth`, `giga330M.pth`, `giga330M_TTSEnhanced.pth` | No | `"giga330M_TTSEnhanced.pth"` | Choose a model |
| `orig_audio` | string (URL) | **Yes** |  | Original audio file |
| `orig_transcript` | string | No | `""` | Optionally provide the transcript of the input audio. Leave it blank to use the WhisperX model below to generate the ... |
| `whisperx_model` | enum: `base.en`, `small.en`, `medium.en` | No | `"base.en"` | If orig_transcript is not provided above, choose a WhisperX model for generating the transcript. Inaccurate transcrip... |
| `target_transcript` | string | **Yes** |  | Transcript of the target audio file |
| `cut_off_sec` | float | No | `3.01` | Only used for for zero-shot text-to-speech task. The first seconds of the original audio that are used for zero-shot ... |
| `kvcache` | enum: `0`, `1` | No | `1` | Set to 0 to use less VRAM, but with slower inference |
| `left_margin` | float | No | `0.08` | Margin to the left of the editing segment |
| `right_margin` | float | No | `0.08` | Margin to the right of the editing segment |
| `temperature` | float | No | `1` | Adjusts randomness of outputs, greater than 1 is random and 0 is deterministic. Do not recommend to change |
| `top_p` | float | No | `0.9` | Default value for TTS is 0.9, and 0.8 for speech editing |
| `stop_repetition` | integer | No | `3` | Default value for TTS is 3, and -1 for speech editing. -1 means do not adjust prob of silence tokens. if there are lo... |
| `sample_batch_size` | integer | No | `4` | Default value for TTS is 4, and 1 for speech editing. The higher the number, the faster the output will be. Under the... |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `generated_audio` | string (URL) |  |
| `whisper_transcript_orig_audio` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/voicecraft",
  input: {
        "orig_audio": "your value here",
        "target_transcript": "your value here"
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

- Model page: https://replicate.com/cjwbw/voicecraft
- API page: https://replicate.com/cjwbw/voicecraft/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
