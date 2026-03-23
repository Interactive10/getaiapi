---
name: replicate-runwayml-gen-4.5
description: >
  Use this skill for the Replicate Gen 4.5 model (runwayml/gen-4.5). Use the Gen 4.5 model via Replicate API.
---

# Gen 4.5

**Model:** `runwayml/gen-4.5`
**Source:** https://replicate.com/runwayml/gen-4.5
**Version:** `2e10d5ae08888b39ed31c828003f4a5ddc89a7cdec3bc7a9926661e0d22cb034`

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

const output = await replicate.run("runwayml/gen-4.5", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("runwayml/gen-4.5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/runwayml/gen-4.5/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `image` | string (URL) | No |  | Optional initial image for video generation (first frame). If not provided, video will be generated from text only. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`, `21:9` | No | `"16:9"` | Video aspect ratio |
| `duration` | enum: `5`, `10` | No | `5` | Duration of the output video in seconds |
| `seed` | integer | No |  | Random seed. Set for reproducible generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "runwayml/gen-4.5",
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

- Model page: https://replicate.com/runwayml/gen-4.5
- API page: https://replicate.com/runwayml/gen-4.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
