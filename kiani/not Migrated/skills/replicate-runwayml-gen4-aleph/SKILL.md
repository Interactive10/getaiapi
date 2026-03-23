---
name: replicate-runwayml-gen4-aleph
description: >
  Use this skill for the Replicate Gen4 Aleph model (runwayml/gen4-aleph). Use the Gen4 Aleph model via Replicate API.
---

# Gen4 Aleph

**Model:** `runwayml/gen4-aleph`
**Source:** https://replicate.com/runwayml/gen4-aleph
**Version:** `68cabc3b111f47bd881cffaca63ad0b1e7834c77737e042cec6eca18962ce1d2`

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

const output = await replicate.run("runwayml/gen4-aleph", {
  input: {
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("runwayml/gen4-aleph",
    input={
        "video": "https://example.com/input.png",
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/runwayml/gen4-aleph/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png", "prompt": "your prompt here"}}'
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
| `aspect_ratio` | enum: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`, `21:9` | No | `"16:9"` | Video aspect ratio |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |
| `video` | string (URL) | **Yes** |  | Input video to generate from. Videos must be less than 16MB. Only 5s of the input video will be used. |
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `reference_image` | string (URL) | No |  | Reference image to influence the style or content of the output. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "runwayml/gen4-aleph",
  input: {
        "video": "https://example.com/input.png",
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

- Model page: https://replicate.com/runwayml/gen4-aleph
- API page: https://replicate.com/runwayml/gen4-aleph/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
