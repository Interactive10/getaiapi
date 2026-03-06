---
name: replicate-fofr-toolkit
description: >
  Use this skill for the Replicate Toolkit model (fofr/toolkit). Use the Toolkit model via Replicate API.
---

# Toolkit

**Model:** `fofr/toolkit`
**Source:** https://replicate.com/fofr/toolkit
**Version:** `19711d11c243800f08364ba9ae9078f54874f21363ba445dabdbf082b5d69565`

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

const output = await replicate.run("fofr/toolkit", {
  input: {
        "task": "convert_input_to_mp4",
        "input_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/toolkit",
    input={
        "task": "convert_input_to_mp4",
        "input_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/toolkit/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"task": "convert_input_to_mp4", "input_file": "your value here"}}'
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
| `task` | enum (8 values) | **Yes** |  | Task to perform |
| `input_file` | string (URL) | **Yes** |  | File – zip, image or video to process |
| `fps` | integer | No | `0` | frames per second, if relevant. Use 0 to keep original fps (or use default). Converting to GIF defaults to 12fps |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/toolkit",
  input: {
        "task": "convert_input_to_mp4",
        "input_file": "your value here"
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

- Model page: https://replicate.com/fofr/toolkit
- API page: https://replicate.com/fofr/toolkit/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
