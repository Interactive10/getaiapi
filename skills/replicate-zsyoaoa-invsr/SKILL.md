---
name: replicate-zsyoaoa-invsr
description: >
  Use this skill for the Replicate Invsr model (zsyoaoa/invsr). Use the Invsr model via Replicate API.
---

# Invsr

**Model:** `zsyoaoa/invsr`
**Source:** https://replicate.com/zsyoaoa/invsr
**Version:** `37eebabfb6cdc4be2892b884b96b361d6fedc9f6a934d2fa3c1a2f85f004b0f0`

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

const output = await replicate.run("zsyoaoa/invsr", {
  input: {
        "in_path": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsyoaoa/invsr",
    input={
        "in_path": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsyoaoa/invsr/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"in_path": "your value here"}}'
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
| `in_path` | string (URL) | **Yes** |  | Input low-quality image |
| `num_steps` | enum: `1`, `2`, `3`, `4`, `5` | No | `1` | Number of sampling steps. |
| `chopping_size` | enum: `128`, `256`, `512` | No | `128` | Chopping resolution |
| `seed` | integer | No | `12345` | Random seed. Leave blank to randomize the seed. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsyoaoa/invsr",
  input: {
        "in_path": "your value here"
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

- Model page: https://replicate.com/zsyoaoa/invsr
- API page: https://replicate.com/zsyoaoa/invsr/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
