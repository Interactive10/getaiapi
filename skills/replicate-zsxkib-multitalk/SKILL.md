---
name: replicate-zsxkib-multitalk
description: >
  Use this skill for the Replicate Multitalk model (zsxkib/multitalk). Use the Multitalk model via Replicate API.
---

# Multitalk

**Model:** `zsxkib/multitalk`
**Source:** https://replicate.com/zsxkib/multitalk
**Version:** `0bd2390c40618c910ffc345b36c8fd218fd8fa59c9124aa641fea443fa203b44`

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

const output = await replicate.run("zsxkib/multitalk", {
  input: {
        "image": "https://example.com/input.png",
        "first_audio": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/multitalk",
    input={
        "image": "https://example.com/input.png",
        "first_audio": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/multitalk/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png", "first_audio": "your value here"}}'
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
| `image` | string (URL) | **Yes** |  | Reference image containing the person(s) for video generation |
| `first_audio` | string (URL) | **Yes** |  | First audio file for driving the conversation |
| `prompt` | string | No | `"A smiling man and woman wearing headphones sit in front of microphones, appearing to host a podcast."` | Text prompt describing the desired interaction or conversation scenario |
| `second_audio` | string (URL) | No |  | Second audio file for multi-person conversation (optional) |
| `num_frames` | integer | No | `81` | Number of frames to generate (automatically adjusted to nearest valid value of form 4n+1, e.g., 81, 181) |
| `sampling_steps` | integer | No | `40` | Number of sampling steps (higher = better quality, lower = faster) |
| `seed` | integer | No |  | Random seed for reproducible results |
| `turbo` | boolean | No | `true` | Enable turbo mode optimizations (adjusts thresholds and guidance scales for speed) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/multitalk",
  input: {
        "image": "https://example.com/input.png",
        "first_audio": "your value here"
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

- Model page: https://replicate.com/zsxkib/multitalk
- API page: https://replicate.com/zsxkib/multitalk/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
