---
name: replicate-meta-sam-2-video
description: >
  Use this skill for the Replicate Sam 2 Video model (meta/sam-2-video). Use the Sam 2 Video model via Replicate API.
---

# Sam 2 Video

**Model:** `meta/sam-2-video`
**Source:** https://replicate.com/meta/sam-2-video
**Version:** `33432afdfc06a10da6b4018932893d39b0159f838b6d11dd1236dff85cc5ec1d`

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

const output = await replicate.run("meta/sam-2-video", {
  input: {
        "input_video": "https://example.com/input.png",
        "click_coordinates": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("meta/sam-2-video",
    input={
        "input_video": "https://example.com/input.png",
        "click_coordinates": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/meta/sam-2-video/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_video": "https://example.com/input.png", "click_coordinates": "your value here"}}'
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
| `input_video` | string (URL) | **Yes** |  | Input video file path |
| `click_coordinates` | string | **Yes** |  | Click coordinates as '[x,y],[x,y],...'. Determines number of clicks. |
| `click_labels` | string | No | `"1"` | Click types (1=foreground, 0=background) as '1,1,0,1'. Auto-extends if shorter than coordinates. |
| `click_frames` | string | No | `"0"` | Frame indices for clicks as '0,0,150,0'. Auto-extends if shorter than coordinates. |
| `click_object_ids` | string | No | `""` | Object labels for clicks as 'person,dog,cat'. Auto-generates if missing or incomplete. |
| `mask_type` | enum: `binary`, `highlighted`, `greenscreen` | No | `"binary"` | Mask type: binary (B&W), highlighted (colored overlay), or greenscreen |
| `annotation_type` | enum: `mask`, `box`, `both` | No | `"mask"` | Annotation type: mask only, bounding box only, or both (ignored for binary and greenscreen) |
| `output_video` | boolean | No | `false` | True for video output, False for image sequence |
| `video_fps` | integer | No | `30` | Video output frame rate (ignored for image sequence) |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Image format for sequence (ignored for video) |
| `output_quality` | integer | No | `80` | JPG/WebP compression quality (0-100, ignored for PNG and video) |
| `output_frame_interval` | integer | No | `1` | Output every Nth frame. 1=all frames, 2=every other, etc. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "meta/sam-2-video",
  input: {
        "input_video": "https://example.com/input.png",
        "click_coordinates": "your value here"
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

- Model page: https://replicate.com/meta/sam-2-video
- API page: https://replicate.com/meta/sam-2-video/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
