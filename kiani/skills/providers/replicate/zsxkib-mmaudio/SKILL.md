---
name: replicate-zsxkib-mmaudio
description: >
  Use this skill for the Replicate Mmaudio model (zsxkib/mmaudio). Use the Mmaudio model via Replicate API.
---

# Mmaudio

**Model:** `zsxkib/mmaudio`
**Source:** https://replicate.com/zsxkib/mmaudio
**Version:** `62871fb59889b2d7c13777f08deb3b36bdff88f7e1d53a50ad7694548a41b484`

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

const output = await replicate.run("zsxkib/mmaudio", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/mmaudio",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/mmaudio/predictions \
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
| `prompt` | string | No | `""` | Text prompt for generated audio |
| `negative_prompt` | string | No | `"music"` | Negative prompt to avoid certain sounds |
| `video` | string (URL) | No |  | Optional video file for video-to-audio generation |
| `duration` | float | No | `8` | Duration of output in seconds |
| `num_steps` | integer | No | `25` | Number of inference steps |
| `cfg_strength` | float | No | `4.5` | Guidance strength (CFG) |
| `seed` | integer | No |  | Random seed. Use -1 or leave blank to randomize the seed |
| `image` | string (URL) | No |  | Optional image file for image-to-audio generation (experimental) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/mmaudio",
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

- Model page: https://replicate.com/zsxkib/mmaudio
- API page: https://replicate.com/zsxkib/mmaudio/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
