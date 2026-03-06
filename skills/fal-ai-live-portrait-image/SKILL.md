---
name: fal-ai-live-portrait-image
description: >
  Use this skill for the fal.ai Live Portrait model (fal-ai/live-portrait/image). Transfer expression from a video to a portrait.
---

# Live Portrait

Transfer expression from a video to a portrait.

**Endpoint:** `fal-ai/live-portrait/image`
**Source:** https://fal.ai/models/fal-ai/live-portrait/image/api

---

## Quick Start

### 1. Install the Client

```bash
npm install --save @fal-ai/client
```

### 2. Set Your API Key

```bash
export FAL_KEY="YOUR_API_KEY"
```

### 3. Submit a Request

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/live-portrait/image", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((l) => l.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

---

## Authentication

Set the `FAL_KEY` environment variable, or configure in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

> **Important:** When running client-side, use a server-side proxy to protect your API key.

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `smile` | float | No | `0` | Amount to smile |
| `eyebrow` | float | No | `0` | Amount to raise or lower eyebrows |
| `rotate_roll` | float | No | `0` | Amount to rotate the face in roll |
| `wink` | float | No | `0` | Amount to wink |
| `rotate_pitch` | float | No | `0` | Amount to rotate the face in pitch |
| `blink` | float | No | `0` | Amount to blink the eyes |
| `pupil_x` | float | No | `0` | Amount to move pupils horizontally |
| `vy_ratio` | float | No | `-0.125` | Vertical offset ratio for face crop. Positive values move up, negative values move down. |
| `dsize` | integer | No | `512` | Size of the output image. |
| `scale` | float | No | `2.3` | Scaling factor for the face crop. |
| `flag_pasteback` | boolean | No | `true` | Whether to paste-back/stitch the animated face cropping from the face-cropping space to the original image space. |
| `eee` | float | No | `0` | Amount to shape mouth in 'eee' position |
| `enable_safety_checker` | boolean | No | `false` | Whether to enable the safety checker. If enabled, the model will check if the input image contains a face before proc... |
| `vx_ratio` | float | No | `0` | Horizontal offset ratio for face crop. |
| `pupil_y` | float | No | `0` | Amount to move pupils vertically |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | Output format |
| `rotate_yaw` | float | No | `0` | Amount to rotate the face in yaw |
| `image_url` | string | **Yes** |  | URL of the image to be animated |
| `woo` | float | No | `0` | Amount to shape mouth in 'woo' position |
| `aaa` | float | No | `0` | Amount to open mouth in 'aaa' shape |
| `flag_do_rot` | boolean | No | `true` | Whether to conduct the rotation when flag_do_crop is True. |
| `flag_do_crop` | boolean | No | `true` | Whether to crop the source portrait to the face-cropping space. |
| `flag_lip_zero` | boolean | No | `true` | Whether to set the lip to closed state before animation. Only takes effect when flag_eye_retargeting and flag_lip_ret... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/live-portrait/image", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/live-portrait/image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/live-portrait/image", {
  requestId: "<request_id>",
});
console.log(result.data);
```

---

## Tips

- Use `fal.subscribe` for quick scripts; use queue API for production workloads.
- Set `webhookUrl` on queue submit to get notified when processing completes.
- File inputs accept URLs, Base64 data URIs, or uploaded files via `fal.storage.upload(file)`.

## References

- API page: https://fal.ai/models/fal-ai/live-portrait/image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/live-portrait/image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
