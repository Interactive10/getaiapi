---
name: replicate-cjwbw-text2video-zero
description: >
  Use this skill for the Replicate Text2Video Zero model (cjwbw/text2video-zero). Use the Text2Video Zero model via Replicate API.
---

# Text2Video Zero

**Model:** `cjwbw/text2video-zero`
**Source:** https://replicate.com/cjwbw/text2video-zero
**Version:** `e671ffe4e976c0ec813f15a9836ebcfd08857ac2669af6917e3c2549307f9fae`

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

const output = await replicate.run("cjwbw/text2video-zero", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/text2video-zero",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/text2video-zero/predictions \
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
| `model_name` | string | No | `"dreamlike-art/dreamlike-photoreal-2.0"` | choose your model, the model should be avaliable on HF |
| `prompt` | string | No | `"A horse galloping on a street"` | Input Prompt |
| `negative_prompt` | string | No | `""` | Negative Prompt |
| `timestep_t0` | integer | No | `44` | Perform DDPM steps from t0 to t1. The larger the gap between t0 and t1, the more variance between the frames. Ensure ... |
| `timestep_t1` | integer | No | `47` | Perform DDPM steps from t0 to t1. The larger the gap between t0 and t1, the more variance between the frames. Ensure ... |
| `motion_field_strength_x` | integer | No | `12` |  |
| `motion_field_strength_y` | integer | No | `12` |  |
| `video_length` | integer | No | `20` | Video length in seconds |
| `fps` | integer | No | `4` | video frames per second |
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
  model: "cjwbw/text2video-zero",
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

- Model page: https://replicate.com/cjwbw/text2video-zero
- API page: https://replicate.com/cjwbw/text2video-zero/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
