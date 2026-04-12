---
name: replicate-zsxkib-animate-diff
description: >
  Use this skill for the Replicate Animate Diff model (zsxkib/animate-diff). Use the Animate Diff model via Replicate API.
---

# Animate Diff

**Model:** `zsxkib/animate-diff`
**Source:** https://replicate.com/zsxkib/animate-diff
**Version:** `269a616c8b0c2bbc12fc15fd51bb202b11e94ff0f7786c026aa905305c4ed9fb`

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

const output = await replicate.run("zsxkib/animate-diff", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/animate-diff",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/animate-diff/predictions \
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
| `prompt` | string | No | `"photo of vocano, rocks, storm weather, wind, lava waves, lightning, 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3"` |  |
| `negative_prompt` | string | No | `"blur, haze, deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers, deformed, distorted, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation"` |  |
| `base_model` | enum: `realisticVisionV20_v20`, `lyriel_v16`, `majicmixRealistic_v5Preview`, `rcnzCartoon3d_v10`, `toonyou_beta3` | No | `"realisticVisionV20_v20"` | Select a base model (DreamBooth checkpoint) |
| `steps` | integer | No | `25` | Number of inference steps |
| `guidance_scale` | float | No | `7.5` | Guidance Scale. How closely do we want to adhere to the prompt and its contents |
| `frames` | integer | No | `16` | Length of the video in frames (playback is at 8 fps e.g. 16 frames @ 8 fps is 2 seconds) |
| `width` | integer | No | `512` | Width in pixels |
| `height` | integer | No | `512` | Height in pixels |
| `seed` | integer | No | `-1` | Seed for different images and reproducibility. Use -1 to randomise seed |
| `zoom_in_motion_strength` | float | No | `0` | Strength of Zoom In Motion LoRA. 0 disables the LoRA |
| `zoom_out_motion_strength` | float | No | `0` | Strength of Zoom Out Motion LoRA. 0 disables the LoRA |
| `pan_left_motion_strength` | float | No | `0` | Strength of Pan Left Motion LoRA. 0 disables the LoRA |
| `pan_right_motion_strength` | float | No | `0` | Strength of Pan Right Motion LoRA. 0 disables the LoRA |
| `pan_up_motion_strength` | float | No | `0` | Strength of Pan Up Motion LoRA. 0 disables the LoRA |
| `pan_down_motion_strength` | float | No | `0` | Strength of Pan Down Motion LoRA. 0 disables the LoRA |
| `rolling_clockwise_motion_strength` | float | No | `0` | Strength of Rolling Clockwise Motion LoRA. 0 disables the LoRA |
| `rolling_anticlockwise_motion_strength` | float | No | `0` | Strength of Rolling Anticlockwise Motion LoRA. 0 disables the LoRA |
| `output_format` | enum: `mp4`, `gif` | No | `"mp4"` | Output format of the video. Can be 'mp4' or 'gif' |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/animate-diff",
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

- Model page: https://replicate.com/zsxkib/animate-diff
- API page: https://replicate.com/zsxkib/animate-diff/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
