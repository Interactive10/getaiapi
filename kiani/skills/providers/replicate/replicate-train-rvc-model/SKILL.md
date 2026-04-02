---
name: replicate-replicate-train-rvc-model
description: >
  Use this skill for the Replicate Train Rvc Model model (replicate/train-rvc-model). Use the Train Rvc Model model via Replicate API.
---

# Train Rvc Model

**Model:** `replicate/train-rvc-model`
**Source:** https://replicate.com/replicate/train-rvc-model
**Version:** `0397d5e28c9b54665e1e5d29d5cf4f722a7b89ec20e9dbf31487235305b1a101`

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

const output = await replicate.run("replicate/train-rvc-model", {
  input: {
        "dataset_zip": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("replicate/train-rvc-model",
    input={
        "dataset_zip": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/replicate/train-rvc-model/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"dataset_zip": "your value here"}}'
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
| `dataset_zip` | string (URL) | **Yes** |  | Upload dataset zip, zip should contain `dataset/<rvc_name>/split_<i>.wav` |
| `sample_rate` | enum: `40k`, `48k` | No | `"48k"` | Sample rate |
| `version` | enum: `v1`, `v2` | No | `"v2"` | Version |
| `f0method` | enum: `pm`, `dio`, `harvest`, `rmvpe`, `rmvpe_gpu` | No | `"rmvpe_gpu"` | F0 method, `rmvpe_gpu` recommended. |
| `epoch` | integer | No | `10` | Epoch |
| `batch_size` | string | No | `"7"` | Batch size |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "replicate/train-rvc-model",
  input: {
        "dataset_zip": "your value here"
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

- Model page: https://replicate.com/replicate/train-rvc-model
- API page: https://replicate.com/replicate/train-rvc-model/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
