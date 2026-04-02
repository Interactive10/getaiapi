---
name: replicate-cjwbw-sadtalker
description: >
  Use this skill for the Replicate Sadtalker model (cjwbw/sadtalker). Use the Sadtalker model via Replicate API.
---

# Sadtalker

**Model:** `cjwbw/sadtalker`
**Source:** https://replicate.com/cjwbw/sadtalker
**Version:** `a519cc0cfebaaeade068b23899165a11ec76aaa1d2b313d40d214f204ec957a3`

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

const output = await replicate.run("cjwbw/sadtalker", {
  input: {
        "driven_audio": "your value here",
        "source_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/sadtalker",
    input={
        "driven_audio": "your value here",
        "source_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/sadtalker/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"driven_audio": "your value here", "source_image": "https://example.com/input.png"}}'
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
| `source_image` | string (URL) | **Yes** |  | Upload the source image, it can be video.mp4 or picture.png |
| `driven_audio` | string (URL) | **Yes** |  | Upload the driven audio, accepts .wav and .mp4 file |
| `use_enhancer` | boolean | No | `false` | Use GFPGAN as Face enhancer |
| `pose_style` | integer | No | `0` | Pose style |
| `expression_scale` | float | No | `1` | a larger value will make the expression motion stronger |
| `use_eyeblink` | boolean | No | `true` | Use eye blink |
| `preprocess` | enum: `crop`, `resize`, `full`, `extcrop`, `extfull` | No | `"crop"` | Choose how to preprocess the images |
| `size_of_image` | enum: `256`, `512` | No | `256` | Face model resolution |
| `facerender` | enum: `facevid2vid`, `pirender` | No | `"facevid2vid"` | Choose face render |
| `still_mode` | boolean | No | `true` | Still Mode (fewer head motion, works with preprocess 'full') |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/sadtalker",
  input: {
        "driven_audio": "your value here",
        "source_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/cjwbw/sadtalker
- API page: https://replicate.com/cjwbw/sadtalker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
