---
name: replicate-recraft-ai-recraft-v3-svg
description: >
  Use this skill for the Replicate Recraft V3 Svg model (recraft-ai/recraft-v3-svg). Use the Recraft V3 Svg model via Replicate API.
---

# Recraft V3 Svg

**Model:** `recraft-ai/recraft-v3-svg`
**Source:** https://replicate.com/recraft-ai/recraft-v3-svg
**Version:** `df041379628fa1d16bd406409930775b0904dc2bc0f3e3f38ecd2a4389e9329d`

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

const output = await replicate.run("recraft-ai/recraft-v3-svg", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("recraft-ai/recraft-v3-svg",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/recraft-ai/recraft-v3-svg/predictions \
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
| `aspect_ratio` | enum (16 values) | No | `"Not set"` | Aspect ratio of the generated image |
| `size` | enum (15 values) | No | `"1024x1024"` | Width and height of the generated image. Size is ignored if an aspect ratio is set. |
| `style` | enum: `any`, `engraving`, `line_art`, `line_circuit`, `linocut` | No | `"any"` | Style of the generated image. |
| `prompt` | string | **Yes** |  | Text prompt for image generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "recraft-ai/recraft-v3-svg",
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

- Model page: https://replicate.com/recraft-ai/recraft-v3-svg
- API page: https://replicate.com/recraft-ai/recraft-v3-svg/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
