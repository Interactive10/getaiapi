---
name: replicate-wan-video-wan2.1-with-lora
description: >
  Use this skill for the Replicate Wan2.1 With Lora model (wan-video/wan2.1-with-lora). Use the Wan2.1 With Lora model via Replicate API.
---

# Wan2.1 With Lora

**Model:** `wan-video/wan2.1-with-lora`
**Source:** https://replicate.com/wan-video/wan2.1-with-lora
**Version:** `c48fa8ec65b13143cb552ab98ea17984eab9d70e9fe99479117de40a2a7f9ed0`

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

const output = await replicate.run("wan-video/wan2.1-with-lora", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan2.1-with-lora",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan2.1-with-lora/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `negative_prompt` | string | No | `""` | Things you do not want to see in your video |
| `image` | string (URL) | No |  | Image to use as a starting frame for image to video generation. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | The aspect ratio of the video. 16:9, 9:16, 1:1, etc. |
| `frames` | enum: `17`, `33`, `49`, `65`, `81` | No | `81` | The number of frames to generate (1 to 5 seconds) |
| `model` | enum: `1.3b`, `14b` | No | `"14b"` | The model to use. 1.3b is faster, but 14b is better quality. A LORA either works with 1.3b or 14b, depending on the v... |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | The resolution of the video. 720p is not supported for 1.3b. |
| `lora_url` | string | No |  | Optional: The URL of a LORA to use |
| `lora_strength_model` | float | No | `1` | Strength of the LORA applied to the model. 0.0 is no LORA. |
| `lora_strength_clip` | float | No | `1` | Strength of the LORA applied to the CLIP model. 0.0 is no LORA. |
| `fast_mode` | enum: `Off`, `Balanced`, `Fast` | No | `"Balanced"` | Speed up generation with different levels of acceleration. Faster modes may degrade quality somewhat. The speedup is ... |
| `sample_steps` | integer | No | `30` | Number of generation steps. Fewer steps means faster generation, at the expensive of output quality. 30 steps is suff... |
| `sample_guide_scale` | float | No | `5` | Higher guide scale makes prompt adherence better, but can reduce variation |
| `sample_shift` | float | No | `8` | Sample shift factor |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan2.1-with-lora",
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

- Model page: https://replicate.com/wan-video/wan2.1-with-lora
- API page: https://replicate.com/wan-video/wan2.1-with-lora/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
