---
name: replicate-zsxkib-film-frame-interpolation-for-large-motion
description: >
  Use this skill for the Replicate Film Frame Interpolation For Large Motion model (zsxkib/film-frame-interpolation-for-large-motion). Use the Film Frame Interpolation For Large Motion model via Replicate API.
---

# Film Frame Interpolation For Large Motion

**Model:** `zsxkib/film-frame-interpolation-for-large-motion`
**Source:** https://replicate.com/zsxkib/film-frame-interpolation-for-large-motion
**Version:** `222d67420da179935a68afff47093bab48705fe9e09c3c79268c1eb2ee7c5e91`

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

const output = await replicate.run("zsxkib/film-frame-interpolation-for-large-motion", {
  input: {
        "mp4": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/film-frame-interpolation-for-large-motion",
    input={
        "mp4": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/film-frame-interpolation-for-large-motion/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"mp4": "your value here"}}'
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
| `mp4` | string (URL) | **Yes** |  | Provide an mp4 video file for frame interpolation. |
| `playback_frames_per_second` | integer | No | `24` | Specify the playback speed in frames per second. |
| `num_interpolation_steps` | integer | No | `3` | Number of steps to interpolate between animation frames |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/film-frame-interpolation-for-large-motion",
  input: {
        "mp4": "your value here"
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

- Model page: https://replicate.com/zsxkib/film-frame-interpolation-for-large-motion
- API page: https://replicate.com/zsxkib/film-frame-interpolation-for-large-motion/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
