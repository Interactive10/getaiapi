---
name: replicate-arielreplicate-stable_diffusion_infinite_zoom
description: >
  Use this skill for the Replicate Stable Diffusion Infinite Zoom model (arielreplicate/stable_diffusion_infinite_zoom). Use the Stable Diffusion Infinite Zoom model via Replicate API.
---

# Stable Diffusion Infinite Zoom

**Model:** `arielreplicate/stable_diffusion_infinite_zoom`
**Source:** https://replicate.com/arielreplicate/stable_diffusion_infinite_zoom
**Version:** `a2527c5074fc0cf9fa6015a40d75d080d1ddf7082fabe142f1ccd882c18fce61`

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

const output = await replicate.run("arielreplicate/stable_diffusion_infinite_zoom", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("arielreplicate/stable_diffusion_infinite_zoom",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/arielreplicate/stable_diffusion_infinite_zoom/predictions \
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
| `output_format` | enum: `mp4`, `gif` | No | `"mp4"` | infinite loop gif or mp4 video |
| `inpaint_iter` | integer | No | `2` | Number of iterations of pasting the image in it's center and inpainting the boarders |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `gif` | string (URL) |  |
| `mp4` | string (URL) |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "arielreplicate/stable_diffusion_infinite_zoom",
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

- Model page: https://replicate.com/arielreplicate/stable_diffusion_infinite_zoom
- API page: https://replicate.com/arielreplicate/stable_diffusion_infinite_zoom/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
