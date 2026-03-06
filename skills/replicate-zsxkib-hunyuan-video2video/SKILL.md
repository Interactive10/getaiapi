---
name: replicate-zsxkib-hunyuan-video2video
description: >
  Use this skill for the Replicate Hunyuan Video2Video model (zsxkib/hunyuan-video2video). Use the Hunyuan Video2Video model via Replicate API.
---

# Hunyuan Video2Video

**Model:** `zsxkib/hunyuan-video2video`
**Source:** https://replicate.com/zsxkib/hunyuan-video2video
**Version:** `d550f226f28b1030c2fedd2947f39f19b4b0233b50364904538caaf037fb18d3`

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

const output = await replicate.run("zsxkib/hunyuan-video2video", {
  input: {
        "video": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/hunyuan-video2video",
    input={
        "video": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/hunyuan-video2video/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"video": "https://example.com/input.png"}}'
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
| `video` | string (URL) | **Yes** |  | Input video file. |
| `prompt` | string | No | `"high quality nature video of a excited brown bear walking through the grass, masterpiece, best quality"` | Text prompt describing the desired output video style. Be descriptive. |
| `width` | integer | No | `768` | Output video width (divisible by 16 for best performance). |
| `height` | integer | No | `768` | Output video height (divisible by 16 for best performance). |
| `keep_proportion` | boolean | No | `true` | Keep aspect ratio when resizing. If true, will adjust dimensions proportionally. |
| `steps` | integer | No | `30` | Number of sampling (denoising) steps. |
| `guidance_scale` | float | No | `6` | Embedded guidance scale. Higher values follow the prompt more strictly. |
| `denoise_strength` | float | No | `0.85` | Denoise strength (0.0 to 1.0). Higher = more deviation from input content. |
| `flow_shift` | integer | No | `9` | Flow shift for temporal consistency. Adjust to tweak video smoothness. |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |
| `frame_rate` | integer | No | `24` | Frame rate of the output video. |
| `crf` | integer | No | `19` | CRF value for output video quality (0-51). Lower values = better quality. |
| `force_rate` | integer | No | `0` | Force a new frame rate on the input video. 0 means no change. |
| `force_size` | string | No | `"Disabled"` | Force resize method. 'Disabled' means original size. Otherwise applies custom_width/height. |
| `custom_width` | integer | No | `512` | Custom width if force_size is not 'Disabled'. |
| `custom_height` | integer | No | `512` | Custom height if force_size is not 'Disabled'. |
| `frame_load_cap` | integer | No | `101` | Max frames to load from input video. |
| `skip_first_frames` | integer | No | `0` | Number of initial frames to skip from the input video. |
| `select_every_nth` | integer | No | `1` | Use every nth frame (1 = every frame, 2 = every second frame, etc.). |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/hunyuan-video2video",
  input: {
        "video": "https://example.com/input.png"
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

- Model page: https://replicate.com/zsxkib/hunyuan-video2video
- API page: https://replicate.com/zsxkib/hunyuan-video2video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
