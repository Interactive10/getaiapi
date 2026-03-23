---
name: replicate-cuuupid-cogvideox-5b
description: >
  Use this skill for the Replicate Cogvideox 5B model (cuuupid/cogvideox-5b). Use the Cogvideox 5B model via Replicate API.
---

# Cogvideox 5B

**Model:** `cuuupid/cogvideox-5b`
**Source:** https://replicate.com/cuuupid/cogvideox-5b
**Version:** `5b14e2c2c648efecc8d36c6353576552f8a124e690587212f8e8bb17ecda3d8c`

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

const output = await replicate.run("cuuupid/cogvideox-5b", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cuuupid/cogvideox-5b",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cuuupid/cogvideox-5b/predictions \
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
| `prompt` | string | **Yes** |  | Prompt |
| `extend_prompt` | boolean | No | `true` | If enabled, will use GLM-4 to make the prompt long (as intended for CogVideoX). |
| `steps` | integer | No | `50` | # of inference steps, more steps can improve quality. |
| `guidance` | float | No | `6` | The scale for classifier-free guidance, higher guidance can improve adherence to your prompt. |
| `num_outputs` | integer | No | `1` | # of output videos |
| `seed` | integer | No | `42` | Seed for reproducibility. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cuuupid/cogvideox-5b",
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

- Model page: https://replicate.com/cuuupid/cogvideox-5b
- API page: https://replicate.com/cuuupid/cogvideox-5b/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
