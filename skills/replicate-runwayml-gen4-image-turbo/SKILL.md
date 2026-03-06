---
name: replicate-runwayml-gen4-image-turbo
description: >
  Use this skill for the Replicate Gen4 Image Turbo model (runwayml/gen4-image-turbo). Use the Gen4 Image Turbo model via Replicate API.
---

# Gen4 Image Turbo

**Model:** `runwayml/gen4-image-turbo`
**Source:** https://replicate.com/runwayml/gen4-image-turbo
**Version:** `d22ea0d0c36ad63c18519dda6fc42dca46f5b84b4864678fb070b2370fea5f59`

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

const output = await replicate.run("runwayml/gen4-image-turbo", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("runwayml/gen4-image-turbo",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/runwayml/gen4-image-turbo/predictions \
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
| `aspect_ratio` | enum: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`, `21:9` | No | `"16:9"` | Image aspect ratio |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | Image resolution |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `reference_tags` | list<string> | No | `[]` | An optional tag for each of your reference images. Tags must be alphanumeric and start with a letter. You can referen... |
| `reference_images` | list<string (URL)> | No | `[]` | You must give at least one reference image. Up to 3 reference images are supported. Images must be between 0.5 and 2 ... |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "runwayml/gen4-image-turbo",
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

- Model page: https://replicate.com/runwayml/gen4-image-turbo
- API page: https://replicate.com/runwayml/gen4-image-turbo/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
