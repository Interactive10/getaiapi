---
name: replicate-cjwbw-shap-e
description: >
  Use this skill for the Replicate Shap E model (cjwbw/shap-e). Use the Shap E model via Replicate API.
---

# Shap E

**Model:** `cjwbw/shap-e`
**Source:** https://replicate.com/cjwbw/shap-e
**Version:** `5957069d5c509126a73c7cb68abcddbb985aeefa4d318e7c63ec1352ce6da68c`

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

const output = await replicate.run("cjwbw/shap-e", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("cjwbw/shap-e",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/cjwbw/shap-e/predictions \
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
| `prompt` | string | No |  | Text prompt for generating the 3D model, ignored if an image is provide below |
| `image` | string (URL) | No |  | A synthetic view image for generating the 3D modeld. To get the best result, remove background from the input image |
| `guidance_scale` | float | No | `15` | Set the scale for guidanece |
| `batch_size` | integer | No | `1` | Number of output |
| `render_mode` | enum: `nerf`, `stf` | No | `"nerf"` | Choose a render mode |
| `render_size` | integer | No | `128` | Set the size of the a renderer, higher values take longer to render |
| `save_mesh` | boolean | No | `false` | Save the latents as meshes. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "cjwbw/shap-e",
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

- Model page: https://replicate.com/cjwbw/shap-e
- API page: https://replicate.com/cjwbw/shap-e/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
