---
name: replicate-fofr-face-to-many
description: >
  Use this skill for the Replicate Face To Many model (fofr/face-to-many). Use the Face To Many model via Replicate API.
---

# Face To Many

**Model:** `fofr/face-to-many`
**Source:** https://replicate.com/fofr/face-to-many
**Version:** `a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf`

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

const output = await replicate.run("fofr/face-to-many", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/face-to-many",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/face-to-many/predictions \
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
| `image` | string (URL) | No |  | An image of a person to be converted |
| `style` | enum: `3D`, `Emoji`, `Video game`, `Pixels`, `Clay`, `Toy` | No | `"3D"` | Style to convert to |
| `prompt` | string | No | `"a person"` |  |
| `negative_prompt` | string | No | `""` | Things you do not want in the image |
| `denoising_strength` | float | No | `0.65` | How much of the original image to keep. 1 is the complete destruction of the original image, 0 is the original image |
| `prompt_strength` | float | No | `4.5` | Strength of the prompt. This is the CFG scale, higher numbers lead to stronger prompt, lower numbers will keep more o... |
| `control_depth_strength` | float | No | `0.8` | Strength of depth controlnet. The bigger this is, the more controlnet affects the output. |
| `instant_id_strength` | float | No | `1` | How strong the InstantID will be. |
| `seed` | integer | No |  | Fix the random seed for reproducibility |
| `custom_lora_url` | string | No |  | URL to a Replicate custom LoRA. Must be in the format https://replicate.delivery/pbxt/[id]/trained_model.tar or https... |
| `lora_scale` | float | No | `1` | How strong the LoRA will be |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/face-to-many",
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

- Model page: https://replicate.com/fofr/face-to-many
- API page: https://replicate.com/fofr/face-to-many/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
