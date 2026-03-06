---
name: replicate-cjwbw-seamless_communication
description: >
  Use this skill for the Replicate Seamless Communication model (cjwbw/seamless_communication). Use the Seamless Communication model via Replicate API.
---

# Seamless Communication

**Model:** `cjwbw/seamless_communication`
**Source:** https://replicate.com/cjwbw/seamless_communication
**Version:** `668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0`

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

const output = await replicate.run("cjwbw/seamless_communication", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/seamless_communication",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/seamless_communication/predictions \
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
| `task_name` | enum: `S2ST (Speech to Speech translation)`, `S2TT (Speech to Text translation)`, `T2ST (Text to Speech translation)`, `T2TT (Text to Text translation)`, `ASR (Automatic Speech Recognition)` | No | `"S2ST (Speech to Speech translation)"` | Choose a task |
| `input_audio` | string (URL) | No |  | Provide input file for tasks with speech input: S2ST, S2TT and ASR. |
| `input_text` | string | No |  | Provide input for tasks with text: T2ST and T2TT. |
| `input_text_language` | enum (96 values) | No | `"None"` | Specify language of the input_text for T2ST and T2TT |
| `target_language_with_speech` | enum (36 values) | No | `"French"` | Set target language for tasks with speech output: S2ST or T2ST. Less languages are available for speech compared to t... |
| `target_language_text_only` | enum (95 values) | No | `"Norwegian Nynorsk"` | Set target language for tasks with text output only: S2TT, T2TT and ASR. |
| `max_input_audio_length` | float | No | `60` | Set maximum input audio length. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text_output` | string |  |
| `audio_output` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/seamless_communication",
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

- Model page: https://replicate.com/cjwbw/seamless_communication
- API page: https://replicate.com/cjwbw/seamless_communication/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
