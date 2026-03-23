---
name: replicate-zsxkib-flash-face
description: >
  Use this skill for the Replicate Flash Face model (zsxkib/flash-face). Use the Flash Face model via Replicate API.
---

# Flash Face

**Model:** `zsxkib/flash-face`
**Source:** https://replicate.com/zsxkib/flash-face
**Version:** `edb17f54faec253ee86e58e0b5f18f24a89c4e31fe7fcefa970e13d8ad934117`

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

const output = await replicate.run("zsxkib/flash-face", {
  input: {
        "positive_prompt": "your prompt here",
        "reference_face_1": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/flash-face",
    input={
        "positive_prompt": "your prompt here",
        "reference_face_1": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/flash-face/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"positive_prompt": "your prompt here", "reference_face_1": "your value here"}}'
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
| `positive_prompt` | string | **Yes** |  | Positive prompt |
| `negative_prompt` | string | No | `"nsfw"` | Negative prompt |
| `steps` | integer | No | `35` | Number of steps |
| `face_bounding_box` | string | No | `"[0., 0., 0., 0.]"` | Face position |
| `lamda_feature` | float | No | `0.9` | Reference feature strength |
| `face_guidance` | float | No | `2.2` | Reference guidance strength |
| `num_sample` | integer | No | `1` | Number of generated images |
| `text_control_scale` | float | No | `7.5` | Text guidance strength |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `step_to_launch_face_guidance` | integer | No | `600` | Step index to launch reference guidance |
| `reference_face_1` | string (URL) | **Yes** |  | Reference face image 1 |
| `reference_face_2` | string (URL) | No |  | Reference face image 2 |
| `reference_face_3` | string (URL) | No |  | Reference face image 3 |
| `reference_face_4` | string (URL) | No |  | Reference face image 4 |
| `default_position_prompt` | string | No | `"best quality, masterpiece,ultra-detailed, UHD 4K, photographic"` | Default positive prompt postfix |
| `default_negative_prompt` | string | No | `"blurry, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face"` | Default negative prompt postfix |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality of the output images, from 0 to 100. 100 is best quality, 1 is lowest quality. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/flash-face",
  input: {
        "positive_prompt": "your prompt here",
        "reference_face_1": "your value here"
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

- Model page: https://replicate.com/zsxkib/flash-face
- API page: https://replicate.com/zsxkib/flash-face/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
