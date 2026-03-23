---
name: replicate-wan-video-wan-2.2-t2v-fast
description: >
  Use this skill for the Replicate Wan 2.2 T2V Fast model (wan-video/wan-2.2-t2v-fast). Use the Wan 2.2 T2V Fast model via Replicate API.
---

# Wan 2.2 T2V Fast

**Model:** `wan-video/wan-2.2-t2v-fast`
**Source:** https://replicate.com/wan-video/wan-2.2-t2v-fast
**Version:** `c483b1f7b892065bc58ebadb6381abf557f6b1f517d2ff0febb3fb635cf49b4d`

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

const output = await replicate.run("wan-video/wan-2.2-t2v-fast", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.2-t2v-fast",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.2-t2v-fast/predictions \
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
| `prompt` | string | **Yes** |  | Prompt for video generation |
| `optimize_prompt` | boolean | No | `false` | Translate prompt to Chinese before generation |
| `num_frames` | integer | No | `81` | Number of video frames. 81 frames give the best results |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of video. 16:9 corresponds to 832x480px, and 9:16 is 480x832px |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of video. 16:9 corresponds to 832x480px, and 9:16 is 480x832px |
| `frames_per_second` | integer | No | `16` | Frames per second. Note that the pricing of this model is based on the video duration at 16 fps |
| `interpolate_output` | boolean | No | `true` | Interpolate the generated video to 30 FPS using ffmpeg |
| `go_fast` | boolean | No | `true` | Go fast |
| `sample_shift` | float | No | `12` | Sample shift factor |
| `seed` | integer | No |  | Random seed. Leave blank for random |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated video. |
| `lora_weights_transformer` | string | No |  | Load LoRA weights for transformer. Supports arbitrary .safetensors URLs from the Internet (for example, 'https://hugg... |
| `lora_scale_transformer` | float | No | `1` | Determines how strongly the transformer LoRA should be applied. |
| `lora_weights_transformer_2` | string | No |  | Load LoRA weights for transformer_2. Supports arbitrary .safetensors URLs from the Internet. Can be different from tr... |
| `lora_scale_transformer_2` | float | No | `1` | Determines how strongly the transformer_2 LoRA should be applied. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.2-t2v-fast",
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

- Model page: https://replicate.com/wan-video/wan-2.2-t2v-fast
- API page: https://replicate.com/wan-video/wan-2.2-t2v-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
