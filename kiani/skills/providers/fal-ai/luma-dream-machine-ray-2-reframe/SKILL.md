---
name: fal-ai-luma-dream-machine-ray-2-reframe
description: >
  Use this skill for the fal.ai Luma Ray 2 Reframe model (fal-ai/luma-dream-machine/ray-2/reframe). Adjust and enhance videos with Ray-2 Reframe. This advanced tool seamlessly reframes videos to your desired aspect ratio, intelligently inpainting missing regions to ensure realistic visuals and coher
---

# Luma Ray 2 Reframe

Adjust and enhance videos with Ray-2 Reframe. This advanced tool seamlessly reframes videos to your desired aspect ratio, intelligently inpainting missing regions to ensure realistic visuals and coherent motion, delivering exceptional quality and creative flexibility.

**Endpoint:** `fal-ai/luma-dream-machine/ray-2/reframe`
**Source:** https://fal.ai/models/fal-ai/luma-dream-machine/ray-2/reframe/api

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

const result = await fal.subscribe("fal-ai/luma-dream-machine/ray-2/reframe", {
  input: {
        "video_url": "https://example.com/input.png",
        "aspect_ratio": "1:1"
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
| `prompt` | string | null | No |  | Optional prompt for reframing |
| `video_url` | string | **Yes** |  | URL of the input video to reframe |
| `y_start` | integer | null | No |  | Start Y coordinate for reframing |
| `aspect_ratio` | enum (7 values) | **Yes** |  | The aspect ratio of the reframed video |
| `x_end` | integer | null | No |  | End X coordinate for reframing |
| `y_end` | integer | null | No |  | End Y coordinate for reframing |
| `x_start` | integer | null | No |  | Start X coordinate for reframing |
| `image_url` | string | null | No |  | Optional URL of the first frame image for reframing |
| `grid_position_x` | integer | null | No |  | X position of the grid for reframing |
| `grid_position_y` | integer | null | No |  | Y position of the grid for reframing |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/luma-dream-machine/ray-2/reframe", {
  input: {
        "video_url": "https://example.com/input.png",
        "aspect_ratio": "1:1"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/luma-dream-machine/ray-2/reframe", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/luma-dream-machine/ray-2/reframe", {
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

- API page: https://fal.ai/models/fal-ai/luma-dream-machine/ray-2/reframe/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/luma-dream-machine/ray-2/reframe
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
