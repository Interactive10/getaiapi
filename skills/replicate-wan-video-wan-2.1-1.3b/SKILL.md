---
name: replicate-wan-video-wan-2.1-1.3b
description: >
  Use this skill for the Replicate Wan 2.1 1.3B model (wan-video/wan-2.1-1.3b). Use the Wan 2.1 1.3B model via Replicate API.
---

# Wan 2.1 1.3B

**Model:** `wan-video/wan-2.1-1.3b`
**Source:** https://replicate.com/wan-video/wan-2.1-1.3b
**Version:** `121bbb762bf449889f090d36e3598c72c50c7a8cc2ce250433bc521a562aae61`

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

const output = await replicate.run("wan-video/wan-2.1-1.3b", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.1-1.3b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.1-1.3b/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt describing what you want to generate |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Video aspect ratio |
| `frame_num` | enum: `17`, `33`, `49`, `65`, `81` | No | `81` | Video duration in frames (based on standard 16fps playback) |
| `resolution` | enum: `480p` | No | `"480p"` | Video resolution |
| `sample_steps` | integer | No | `30` | Number of sampling steps (higher = better quality but slower) |
| `sample_guide_scale` | float | No | `6` | Classifier free guidance scale (higher values strengthen prompt adherence) |
| `sample_shift` | float | No | `8` | Sampling shift factor for flow matching (recommended range: 8-12) |
| `seed` | integer | No |  | Random seed for reproducible results (leave blank for random) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.1-1.3b",
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

- Model page: https://replicate.com/wan-video/wan-2.1-1.3b
- API page: https://replicate.com/wan-video/wan-2.1-1.3b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
