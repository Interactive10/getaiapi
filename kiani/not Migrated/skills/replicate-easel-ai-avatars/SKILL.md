---
name: replicate-easel-ai-avatars
description: >
  Use this skill for the Replicate Ai Avatars model (easel/ai-avatars). Use the Ai Avatars model via Replicate API.
---

# Ai Avatars

**Model:** `easel/ai-avatars`
**Source:** https://replicate.com/easel/ai-avatars
**Version:** `27ebf241efeded7a50964c7cff8f27c79e1570674be70d8e1df712ae31857d34`

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

const output = await replicate.run("easel/ai-avatars", {
  input: {
        "face_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("easel/ai-avatars",
    input={
        "face_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/easel/ai-avatars/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"face_image": "https://example.com/input.png"}}'
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
| `face_image` | string (URL) | **Yes** |  | The face image to generate avatar from. A front facing selfie works best. |
| `user_gender` | enum: `male`, `female`, `non_binary` | No | `"female"` | Gender of the first user |
| `face_image_b` | string (URL) | No |  | Optional second face image for multi-person avatars |
| `user_b_gender` | enum: `male`, `female`, `non_binary` | No | `"female"` | Gender of the second user (if using face_image_b) |
| `prompt` | string | No | `"standing in a modern office space"` | A prompt describing the scene to put the user(s) in |
| `workflow_type` | enum: `HyperRealistic`, `Realistic`, `Stylistic` | No | `"Realistic"` | The output style to use |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "easel/ai-avatars",
  input: {
        "face_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/easel/ai-avatars
- API page: https://replicate.com/easel/ai-avatars/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
