---
name: replicate-bria-increase-resolution
description: >
  Use this skill for the Replicate Increase Resolution model (bria/increase-resolution). Use the Increase Resolution model via Replicate API.
---

# Increase Resolution

**Model:** `bria/increase-resolution`
**Source:** https://replicate.com/bria/increase-resolution
**Version:** `53f1c804909dba21ec57397ac0193347ff8d425a0c3ed77b1ba30bf03ef1bf35`

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

const output = await replicate.run("bria/increase-resolution", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("bria/increase-resolution",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/bria/increase-resolution/predictions \
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
| `image` | string (URL) | No |  | Image file |
| `image_url` | string | No |  | Image URL |
| `desired_increase` | enum: `2`, `4` | No | `2` | Resolution multiplier (scale factor). Possible values are 2 or 4. Maximum total area is 8192x8192 pixels |
| `preserve_alpha` | boolean | No | `true` | Preserve alpha channel in output. When true, maintains original transparency. When false, output is fully opaque. |
| `sync` | boolean | No | `true` | Synchronous response mode |
| `content_moderation` | boolean | No | `false` | Enable content moderation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "bria/increase-resolution",
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

- Model page: https://replicate.com/bria/increase-resolution
- API page: https://replicate.com/bria/increase-resolution/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
