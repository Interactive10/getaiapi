---
name: replicate-wan-video-wan-2.6-t2v
description: >
  Use this skill for the Replicate Wan 2.6 T2V model (wan-video/wan-2.6-t2v). Use the Wan 2.6 T2V model via Replicate API.
---

# Wan 2.6 T2V

**Model:** `wan-video/wan-2.6-t2v`
**Source:** https://replicate.com/wan-video/wan-2.6-t2v
**Version:** `e26da39f3adc03385c49adb156263148660557d28f3e26bcdb331b174a794077`

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

const output = await replicate.run("wan-video/wan-2.6-t2v", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("wan-video/wan-2.6-t2v",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/wan-video/wan-2.6-t2v/predictions \
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
| `prompt` | string | **Yes** |  | Text prompt for video generation |
| `negative_prompt` | string | No | `""` | Negative prompt to avoid certain elements |
| `audio` | string (URL) | No |  | Audio file (wav/mp3, 3-30s, ≤15MB) for voice/music synchronization |
| `size` | enum: `1280*720`, `720*1280`, `1920*1080`, `1080*1920` | No | `"1280*720"` | Video resolution and aspect ratio |
| `duration` | enum: `5`, `10`, `15` | No | `5` | Duration of the generated video in seconds |
| `enable_prompt_expansion` | boolean | No | `true` | If set to true, the prompt optimizer will be enabled |
| `multi_shots` | boolean | No | `false` | Enable intelligent multi-shot segmentation (only active when enable_prompt_expansion is enabled). True enables multi-... |
| `seed` | integer | No |  | Random seed for reproducible generation |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "wan-video/wan-2.6-t2v",
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

- Model page: https://replicate.com/wan-video/wan-2.6-t2v
- API page: https://replicate.com/wan-video/wan-2.6-t2v/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
