---
name: replicate-heygen-avatar-iv
description: >
  Use this skill for the Replicate Avatar Iv model (heygen/avatar-iv). Use the Avatar Iv model via Replicate API.
---

# Avatar Iv

**Model:** `heygen/avatar-iv`
**Source:** https://replicate.com/heygen/avatar-iv
**Version:** `70a5b27d6f6dd982a62a6165b63d69759af5ab962e04753562939c4a3d76983d`

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

const output = await replicate.run("heygen/avatar-iv", {
  input: {
        "voice_id": "your value here",
        "avatar_id": "your value here",
        "input_text": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("heygen/avatar-iv",
    input={
        "voice_id": "your value here",
        "avatar_id": "your value here",
        "input_text": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/heygen/avatar-iv/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"voice_id": "your value here", "avatar_id": "your value here", "input_text": "your value here"}}'
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
| `avatar_id` | string | **Yes** |  | Unique identifier of the avatar. Get available avatar IDs from the HeyGen List All Avatars API. |
| `input_text` | string | **Yes** |  | Text that the avatar will speak. Must be less than 5000 characters. |
| `voice_id` | string | **Yes** |  | Unique identifier of the voice. Get available voice IDs from the HeyGen List All Voices API. |
| `title` | string | No | `""` | Title of the video. |
| `avatar_style` | enum: `normal`, `closeUp`, `circle` | No | `"normal"` | Visual style of the avatar. |
| `voice_speed` | float | No | `1` | Voice speed. Value ranges from 0.5 to 1.5. |
| `voice_emotion` | enum: `none`, `Excited`, `Friendly`, `Serious`, `Soothing`, `Broadcaster` | No | `"none"` | Adds emotion to voice, if supported by the selected voice. Set to 'none' for no emotion. |
| `caption` | boolean | No | `false` | Whether to enable captions in the video. |
| `width` | integer | No | `1920` | Width of the output video in pixels. |
| `height` | integer | No | `1080` | Height of the output video in pixels. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "heygen/avatar-iv",
  input: {
        "voice_id": "your value here",
        "avatar_id": "your value here",
        "input_text": "your value here"
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

- Model page: https://replicate.com/heygen/avatar-iv
- API page: https://replicate.com/heygen/avatar-iv/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
