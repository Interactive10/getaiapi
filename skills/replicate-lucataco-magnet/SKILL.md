---
name: replicate-lucataco-magnet
description: >
  Use this skill for the Replicate Magnet model (lucataco/magnet). Use the Magnet model via Replicate API.
---

# Magnet

**Model:** `lucataco/magnet`
**Source:** https://replicate.com/lucataco/magnet
**Version:** `e8e2ecd4a1dabb58924aa8300b668290cafae166dd36baf65dad9875877de50e`

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

const output = await replicate.run("lucataco/magnet", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/magnet",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/magnet/predictions \
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
| `prompt` | string | No | `"80s electronic track with melodic synthesizers, catchy beat and groovy bass"` | Input Text |
| `model` | enum: `facebook/magnet-small-10secs`, `facebook/magnet-medium-10secs`, `facebook/magnet-small-30secs`, `facebook/magnet-medium-30secs`, `facebook/audio-magnet-small`, `facebook/audio-magnet-medium` | No | `"facebook/magnet-small-10secs"` | Model to use |
| `variations` | integer | No | `3` | Number of variations to generate |
| `span_score` | enum: `max-nonoverlap`, `prod-stride1` | No | `"prod-stride1"` | An enumeration. |
| `temperature` | float | No | `3` | Temperature for sampling |
| `top_p` | float | No | `0.9` | Top p for sampling |
| `max_cfg` | float | No | `10` | Max CFG coefficient |
| `min_cfg` | float | No | `1` | Min CFG coefficient |
| `decoding_steps_stage_1` | integer | No | `20` | Number of decoding steps for stage 1 |
| `decoding_steps_stage_2` | integer | No | `10` | Number of decoding steps for stage 2 |
| `decoding_steps_stage_3` | integer | No | `10` | Number of decoding steps for stage 3 |
| `decoding_steps_stage_4` | integer | No | `10` | Number of decoding steps for stage 4 |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/magnet",
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

- Model page: https://replicate.com/lucataco/magnet
- API page: https://replicate.com/lucataco/magnet/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
