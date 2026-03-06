---
name: replicate-fofr-controlnet-preprocessors
description: >
  Use this skill for the Replicate Controlnet Preprocessors model (fofr/controlnet-preprocessors). Use the Controlnet Preprocessors model via Replicate API.
---

# Controlnet Preprocessors

**Model:** `fofr/controlnet-preprocessors`
**Source:** https://replicate.com/fofr/controlnet-preprocessors
**Version:** `f6584ef76cf07a2014ffe1e9bdb1a5cfa714f031883ab43f8d4b05506625988e`

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

const output = await replicate.run("fofr/controlnet-preprocessors", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/controlnet-preprocessors",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/controlnet-preprocessors/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Image to preprocess |
| `canny` | boolean | No | `true` | Run canny edge detection |
| `content` | boolean | No | `true` | Run content shuffle detection |
| `face_detector` | boolean | No | `true` | Run face detection |
| `hed` | boolean | No | `true` | Run HED detection |
| `midas` | boolean | No | `true` | Run Midas detection |
| `mlsd` | boolean | No | `true` | Run MLSD detection |
| `open_pose` | boolean | No | `true` | Run Openpose detection |
| `pidi` | boolean | No | `true` | Run PidiNet detection |
| `normal_bae` | boolean | No | `true` | Run NormalBae detection |
| `lineart` | boolean | No | `true` | Run Lineart detection |
| `lineart_anime` | boolean | No | `true` | Run LineartAnime detection |
| `sam` | boolean | No | `true` | Run Sam detection |
| `leres` | boolean | No | `true` | Run Leres detection |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/controlnet-preprocessors",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/fofr/controlnet-preprocessors
- API page: https://replicate.com/fofr/controlnet-preprocessors/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
