---
name: replicate-google-gemini-2.5-flash-image
description: >
  Use this skill for the Replicate Gemini 2.5 Flash Image model (google/gemini-2.5-flash-image). Use the Gemini 2.5 Flash Image model via Replicate API.
---

# Gemini 2.5 Flash Image

**Model:** `google/gemini-2.5-flash-image`
**Source:** https://replicate.com/google/gemini-2.5-flash-image
**Version:** `445b89a5b905554df77db7eb582bcbe52fa3245d2a1aef63dd38f23d8f92aed2`

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

const output = await replicate.run("google/gemini-2.5-flash-image", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("google/gemini-2.5-flash-image",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/google/gemini-2.5-flash-image/predictions \
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
| `prompt` | string | **Yes** |  | A text description of the image you want to generate |
| `image_input` | list<string (URL)> | No | `[]` | Input images to transform or use as reference (supports multiple images) |
| `aspect_ratio` | enum (11 values) | No | `"match_input_image"` | Aspect ratio of the generated image |
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
  model: "google/gemini-2.5-flash-image",
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

- Model page: https://replicate.com/google/gemini-2.5-flash-image
- API page: https://replicate.com/google/gemini-2.5-flash-image/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
