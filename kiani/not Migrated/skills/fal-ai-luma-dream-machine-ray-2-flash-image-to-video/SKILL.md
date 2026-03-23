---
name: fal-ai-luma-dream-machine-ray-2-flash-image-to-video
description: >
  Use this skill for the fal.ai Luma Ray 2 Flash (Image to Video) model (fal-ai/luma-dream-machine/ray-2-flash/image-to-video). Ray2 Flash is a fast video generative model capable of creating realistic visuals with natural, coherent motion.
---

# Luma Ray 2 Flash (Image to Video)

Ray2 Flash is a fast video generative model capable of creating realistic visuals with natural, coherent motion.

**Endpoint:** `fal-ai/luma-dream-machine/ray-2-flash/image-to-video`
**Source:** https://fal.ai/models/fal-ai/luma-dream-machine/ray-2-flash/image-to-video/api

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

const result = await fal.subscribe("fal-ai/luma-dream-machine/ray-2-flash/image-to-video", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  |  |
| `aspect_ratio` | enum: `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21` | No | `"16:9"` | The aspect ratio of the generated video |
| `resolution` | enum: `540p`, `720p`, `1080p` | No | `"540p"` | The resolution of the generated video (720p costs 2x more, 1080p costs 4x more) |
| `loop` | boolean | No | `false` | Whether the video should loop (end of video is blended with the beginning) |
| `duration` | enum: `5s`, `9s` | No | `"5s"` | The duration of the generated video |
| `image_url` | string | null | No |  | Initial image to start the video from. Can be used together with end_image_url. |
| `end_image_url` | string | null | No |  | Final image to end the video with. Can be used together with image_url. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/luma-dream-machine/ray-2-flash/image-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/luma-dream-machine/ray-2-flash/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/luma-dream-machine/ray-2-flash/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/luma-dream-machine/ray-2-flash/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/luma-dream-machine/ray-2-flash/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
