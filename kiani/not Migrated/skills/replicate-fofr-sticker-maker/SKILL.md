---
name: replicate-fofr-sticker-maker
description: >
  Use this skill for the Replicate Sticker Maker model (fofr/sticker-maker). Use the Sticker Maker model via Replicate API.
---

# Sticker Maker

**Model:** `fofr/sticker-maker`
**Source:** https://replicate.com/fofr/sticker-maker
**Version:** `4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a`

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

const output = await replicate.run("fofr/sticker-maker", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/sticker-maker",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/sticker-maker/predictions \
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
| `prompt` | string | No | `"a cute cat"` |  |
| `negative_prompt` | string | No | `""` | Things you do not want in the image |
| `width` | integer | No | `1152` |  |
| `height` | integer | No | `1152` |  |
| `steps` | integer | No | `17` |  |
| `number_of_images` | integer | No | `1` | Number of images to generate |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `90` | Quality of the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. |
| `seed` | integer | No |  | Fix the random seed for reproducibility |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/sticker-maker",
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

- Model page: https://replicate.com/fofr/sticker-maker
- API page: https://replicate.com/fofr/sticker-maker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
