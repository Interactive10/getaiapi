---
name: replicate-daanelson-imagebind
description: >
  Use this skill for the Replicate Imagebind model (daanelson/imagebind). Use the Imagebind model via Replicate API.
---

# Imagebind

**Model:** `daanelson/imagebind`
**Source:** https://replicate.com/daanelson/imagebind
**Version:** `0383f62e173dc821ec52663ed22a076d9c970549c209666ac3db181618b7a304`

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

const output = await replicate.run("daanelson/imagebind", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("daanelson/imagebind",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/daanelson/imagebind/predictions \
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
| `input` | string (URL) | No |  | file that you want to embed. Needs to be text, vision, or audio. |
| `text_input` | string | No |  | text that you want to embed. Provide a string here instead of a text file to input if you'd like. |
| `modality` | enum: `text`, `vision`, `audio` | No | `"vision"` | modality of the input you'd like to embed |

---

## Output Schema

**Type:** list<float>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "daanelson/imagebind",
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

- Model page: https://replicate.com/daanelson/imagebind
- API page: https://replicate.com/daanelson/imagebind/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
