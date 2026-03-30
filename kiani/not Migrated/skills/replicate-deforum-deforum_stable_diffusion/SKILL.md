---
name: replicate-deforum-deforum_stable_diffusion
description: >
  Use this skill for the Replicate Deforum Stable Diffusion model (deforum/deforum_stable_diffusion). Use the Deforum Stable Diffusion model via Replicate API.
---

# Deforum Stable Diffusion

**Model:** `deforum/deforum_stable_diffusion`
**Source:** https://replicate.com/deforum/deforum_stable_diffusion
**Version:** `e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6`

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

const output = await replicate.run("deforum/deforum_stable_diffusion", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("deforum/deforum_stable_diffusion",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/deforum/deforum_stable_diffusion/predictions \
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
| `max_frames` | integer | No | `100` | Number of frames for animation |
| `animation_prompts` | string | No | `"0: a beautiful portrait of a woman by Artgerm, trending on Artstation"` | Prompt for animation. Provide 'frame number : prompt at this frame', separate different prompts with '\|'. Make sure ... |
| `angle` | string | No | `"0:(0)"` | angle parameter for the motion |
| `zoom` | string | No | `"0: (1.04)"` | zoom parameter for the motion |
| `translation_x` | string | No | `"0: (0)"` | translation_x parameter for the motion |
| `translation_y` | string | No | `"0: (0)"` | translation_y parameter for the motion |
| `color_coherence` | enum: `None`, `Match Frame 0 HSV`, `Match Frame 0 LAB`, `Match Frame 0 RGB` | No | `"Match Frame 0 LAB"` | An enumeration. |
| `sampler` | enum (8 values) | No | `"plms"` | An enumeration. |
| `fps` | integer | No | `15` | Choose fps for the video. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "deforum/deforum_stable_diffusion",
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

- Model page: https://replicate.com/deforum/deforum_stable_diffusion
- API page: https://replicate.com/deforum/deforum_stable_diffusion/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
