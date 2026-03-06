---
name: replicate-zsxkib-animatediff-prompt-travel
description: >
  Use this skill for the Replicate Animatediff Prompt Travel model (zsxkib/animatediff-prompt-travel). Use the Animatediff Prompt Travel model via Replicate API.
---

# Animatediff Prompt Travel

**Model:** `zsxkib/animatediff-prompt-travel`
**Source:** https://replicate.com/zsxkib/animatediff-prompt-travel
**Version:** `1b8a8f2725c03b1ff4a0b960079899131c384149d1feba45e4ef43653deb3b5f`

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

const output = await replicate.run("zsxkib/animatediff-prompt-travel", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/animatediff-prompt-travel",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/animatediff-prompt-travel/predictions \
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
| `head_prompt` | string | No | `"masterpiece, best quality, a haunting and detailed depiction of a ship at sea, battered by waves, ominous,((dark clouds:1.3)),distant lightning, rough seas, rain, silhouette of the ship against the stormy sky"` | Primary animation prompt. If a prompt map is provided, this will be prefixed at the start of every individual prompt ... |
| `prompt_map` | string | No | `"0: ship steadily moving,((waves crashing against the ship:1.0)) | 32: (((lightning strikes))), distant thunder, ship rocked by waves | 64: ship silhouette,(((heavy rain))),wind howling, waves rising higher | 96: ship navigating through the storm, rain easing off"` | Prompt for changes in animation. Provide 'frame number : prompt at this frame', separate different prompts with '\|'.... |
| `tail_prompt` | string | No | `"dark horizon, flashes of lightning illuminating the ship, sailors working hard, ship's lanterns flickering, eerie, mysterious, sails flapping loudly, stormy atmosphere"` | Additional prompt that will be appended at the end of the main prompt or individual prompts in the map |
| `negative_prompt` | string | No | `"(worst quality, low quality:1.4), black and white, b&w, sunny, clear skies, calm seas, beach, daytime, ((bright colors)), cartoonish, modern ships, sketchy, unfinished, modern buildings, trees, island"` |  |
| `frames` | integer | No | `128` | Length of the video in frames (playback is at 8 fps e.g. 16 frames @ 8 fps is 2 seconds) |
| `width` | integer | No | `256` | Width of generated video in pixels, must be divisable by 8 |
| `height` | integer | No | `384` | Height of generated video in pixels, must be divisable by 8 |
| `base_model` | enum: `realisticVisionV20_v20`, `lyriel_v16`, `majicmixRealistic_v5Preview`, `rcnzCartoon3d_v10`, `toonyou_beta3`, `CUSTOM` | No | `"majicmixRealistic_v5Preview"` | Choose the base model for animation generation. If 'CUSTOM' is selected, provide a custom model URL in the next param... |
| `custom_base_model_url` | string | No | `""` | Only used when base model is set to 'CUSTOM'. URL of the custom model to download if 'CUSTOM' is selected in the base... |
| `prompt_fixed_ratio` | float | No | `0.5` | Defines the ratio of adherence to the fixed part of the prompt versus the dynamic part (from prompt map). Value shoul... |
| `scheduler` | enum (18 values) | No | `"k_dpmpp_sde"` | Diffusion scheduler |
| `steps` | integer | No | `25` | Number of inference steps |
| `guidance_scale` | float | No | `7.5` | Guidance Scale. How closely do we want to adhere to the prompt and its contents |
| `clip_skip` | integer | No | `2` | Skip the last N-1 layers of the CLIP text encoder (lower values follow prompt more closely) |
| `context` | integer | No | `16` | Number of frames to condition on (default: max of <length> or 32). max for motion module v1 is 24 |
| `output_format` | enum: `mp4`, `gif` | No | `"mp4"` | Output format of the video. Can be 'mp4' or 'gif' |
| `playback_frames_per_second` | integer | No | `8` |  |
| `seed` | integer | No | `-1` | Seed for different images and reproducibility. Use -1 to randomise seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/animatediff-prompt-travel",
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

- Model page: https://replicate.com/zsxkib/animatediff-prompt-travel
- API page: https://replicate.com/zsxkib/animatediff-prompt-travel/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
