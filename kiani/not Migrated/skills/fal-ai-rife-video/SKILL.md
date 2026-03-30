---
name: fal-ai-rife-video
description: >
  Use this skill for the fal.ai RIFE model (fal-ai/rife/video). Interpolate videos with RIFE - Real-Time Intermediate Flow Estimation
---

# RIFE

Interpolate videos with RIFE - Real-Time Intermediate Flow Estimation

**Endpoint:** `fal-ai/rife/video`
**Source:** https://fal.ai/models/fal-ai/rife/video/api

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

const result = await fal.subscribe("fal-ai/rife/video", {
  input: {
        "video_url": "https://example.com/input.png"
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
| `video_url` | string | **Yes** |  | The URL of the video to use for interpolation. |
| `use_scene_detection` | boolean | No | `false` | If True, the input video will be split into scenes before interpolation. This removes smear frames between scenes, bu... |
| `use_calculated_fps` | boolean | No | `true` | If True, the function will use the calculated FPS of the input video multiplied by the number of frames to determine ... |
| `num_frames` | integer | No | `1` | The number of frames to generate between the input video frames. |
| `loop` | boolean | No | `false` | If True, the final frame will be looped back to the first frame to create a seamless loop. If False, the final frame ... |
| `fps` | integer | No | `8` | Frames per second for the output video. Only applicable if use_calculated_fps is False. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/rife/video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/rife/video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/rife/video", {
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

- API page: https://fal.ai/models/fal-ai/rife/video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/rife/video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
