---
name: replicate-google-imagen-4
description: >
  Use this skill for the Replicate Imagen 4 model (google/imagen-4). Use the Imagen 4 model via Replicate API.
---

# Imagen 4

**Model:** `google/imagen-4`
**Source:** https://replicate.com/google/imagen-4
**Version:** `19335492dbe879d4b5983bff2149f597db8314ccc7fe374e6313af7c2b52792f`

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

const output = await replicate.run("google/imagen-4", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google/imagen-4",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google/imagen-4/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for image generation |
| `aspect_ratio` | enum: `1:1`, `9:16`, `16:9`, `3:4`, `4:3` | No | `"1:1"` | Aspect ratio of the generated image |
| `image_size` | enum: `1K`, `2K` | No | `"1K"` | Resolution of the generated image |
| `safety_filter_level` | enum: `block_low_and_above`, `block_medium_and_above`, `block_only_high` | No | `"block_only_high"` | block_low_and_above is strictest, block_medium_and_above blocks some prompts, block_only_high is most permissive but ... |
| `output_format` | enum: `jpg`, `png` | No | `"jpg"` | Format of the output image |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "google/imagen-4",
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

- Model page: https://replicate.com/google/imagen-4
- API page: https://replicate.com/google/imagen-4/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
