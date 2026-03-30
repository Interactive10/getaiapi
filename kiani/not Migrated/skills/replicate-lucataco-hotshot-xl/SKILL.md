---
name: replicate-lucataco-hotshot-xl
description: >
  Use this skill for the Replicate Hotshot Xl model (lucataco/hotshot-xl). Use the Hotshot Xl model via Replicate API.
---

# Hotshot Xl

**Model:** `lucataco/hotshot-xl`
**Source:** https://replicate.com/lucataco/hotshot-xl
**Version:** `78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a`

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

const output = await replicate.run("lucataco/hotshot-xl", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/hotshot-xl",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/hotshot-xl/predictions \
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
| `prompt` | string | No | `"a camel smoking a cigarette, hd, high quality"` | Input prompt |
| `negative_prompt` | string | No | `"blurry"` | Negative prompt |
| `width` | enum (14 values) | No | `672` | Width of the output |
| `height` | enum (14 values) | No | `384` | Height of the output |
| `scheduler` | enum (7 values) | No | `"EulerAncestralDiscreteScheduler"` | Select a Scheduler |
| `steps` | integer | No | `30` | Number of denoising steps |
| `mp4` | boolean | No | `false` | Save as mp4, False for GIF |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/hotshot-xl",
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

- Model page: https://replicate.com/lucataco/hotshot-xl
- API page: https://replicate.com/lucataco/hotshot-xl/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
