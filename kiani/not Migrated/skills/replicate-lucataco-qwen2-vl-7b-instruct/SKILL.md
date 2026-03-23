---
name: replicate-lucataco-qwen2-vl-7b-instruct
description: >
  Use this skill for the Replicate Qwen2 Vl 7B Instruct model (lucataco/qwen2-vl-7b-instruct). Use the Qwen2 Vl 7B Instruct model via Replicate API.
---

# Qwen2 Vl 7B Instruct

**Model:** `lucataco/qwen2-vl-7b-instruct`
**Source:** https://replicate.com/lucataco/qwen2-vl-7b-instruct
**Version:** `bf57361c75677fc33d480d0c5f02926e621b2caa2000347cb74aeae9d2ca07ee`

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

const output = await replicate.run("lucataco/qwen2-vl-7b-instruct", {
  input: {
        "media": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/qwen2-vl-7b-instruct",
    input={
        "media": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/qwen2-vl-7b-instruct/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"media": "your value here"}}'
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
| `media` | string (URL) | **Yes** |  | Input image or video file |
| `prompt` | string | No | `"Describe this in detail."` | Custom prompt to guide the description |
| `max_new_tokens` | integer | No | `128` | Maximum number of tokens to generate |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/qwen2-vl-7b-instruct",
  input: {
        "media": "your value here"
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

- Model page: https://replicate.com/lucataco/qwen2-vl-7b-instruct
- API page: https://replicate.com/lucataco/qwen2-vl-7b-instruct/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
