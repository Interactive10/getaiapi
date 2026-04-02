---
name: fal-ai-bria-video-background-removal
description: >
  Use this skill for the fal.ai Video model (bria/video/background-removal). Automatically remove backgrounds from videos -perfect for creating clean, professional content without a green screen.
---

# Video

Automatically remove backgrounds from videos -perfect for creating clean, professional content without a green screen.

**Endpoint:** `bria/video/background-removal`
**Source:** https://fal.ai/models/bria/video/background-removal/api

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

const result = await fal.subscribe("bria/video/background-removal", {
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
| `video_url` | string | **Yes** |  | Input video to remove background from. Size should be less than 4000x4000 and duration less than 30s. |
| `output_container_and_codec` | enum (9 values) | No | `"webm_vp9"` | Output container and codec. Options: mp4_h265, mp4_h264, webm_vp9, mov_h265, mov_proresks, mkv_h265, mkv_h264, mkv_vp... |
| `background_color` | enum (11 values) | No | `"Black"` | Background color. Options: Transparent, Black, White, Gray, Red, Green, Blue, Yellow, Cyan, Magenta, Orange. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | Video | File | Video with removed background and audio. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/video/background-removal", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/video/background-removal", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/video/background-removal", {
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

- API page: https://fal.ai/models/bria/video/background-removal/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/video/background-removal
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
