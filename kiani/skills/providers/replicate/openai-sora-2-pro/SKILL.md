---
name: replicate-openai-sora-2-pro
description: >
  Use this skill for the Replicate Sora 2 Pro model (openai/sora-2-pro). Use the Sora 2 Pro model via Replicate API.
---

# Sora 2 Pro

**Model:** `openai/sora-2-pro`
**Source:** https://replicate.com/openai/sora-2-pro
**Version:** `ccf1a58e3ec72e86d01ab19ef240009409f26a9a0470cc246a1728e54b0a6b8f`

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

const output = await replicate.run("openai/sora-2-pro", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/sora-2-pro",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/sora-2-pro/predictions \
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
| `openai_api_key` | string | No |  | Optional: Your OpenAI API key. If you use your own OpenAI API key, you will be charged directly by OpenAI. |
| `prompt` | string | **Yes** |  | A text description of the video to generate |
| `input_reference` | string (URL) | No |  | An optional image to use as the first frame of the video. The image must be the same aspect ratio as the video. |
| `seconds` | enum: `4`, `8`, `12` | No | `4` | Duration of the video in seconds |
| `aspect_ratio` | enum: `portrait`, `landscape` | No | `"portrait"` | Aspect ratio of the video. Portrait is 720x1280, landscape is 1280x720 |
| `resolution` | enum: `standard`, `high` | No | `"standard"` | Resolution quality. Standard is 720p, high is 1024p |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/sora-2-pro",
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

- Model page: https://replicate.com/openai/sora-2-pro
- API page: https://replicate.com/openai/sora-2-pro/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
