---
name: fal-ai-bria-bria_video_eraser-erase-mask
description: >
  Use this skill for the fal.ai Bria Video Eraser model (bria/bria_video_eraser/erase/mask). A high-fidelity capability for erasing unwanted objects, people, or visual elements from videos while maintaining aesthetic quality and temporal consistency.
---

# Bria Video Eraser

A high-fidelity capability for erasing unwanted objects, people, or visual elements from videos while maintaining aesthetic quality and temporal consistency.

**Endpoint:** `bria/bria_video_eraser/erase/mask`
**Source:** https://fal.ai/models/bria/bria_video_eraser/erase/mask/api

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

const result = await fal.subscribe("bria/bria_video_eraser/erase/mask", {
  input: {
        "video_url": "https://example.com/input.png",
        "mask_video_url": "https://example.com/input.png"
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
| `preserve_audio` | boolean | No | `true` | If true, audio will be preserved in the output video. |
| `video_url` | string | **Yes** |  | Input video to erase object from. duration must be less than 5s. |
| `output_container_and_codec` | enum (11 values) | No | `"mp4_h264"` | Output container and codec. Options: mp4_h265, mp4_h264, webm_vp9, gif, mov_h264, mov_h265, mov_proresks, mkv_h264, m... |
| `mask_video_url` | string | **Yes** |  | Input video to mask erase object from. duration must be less than 5s. |
| `auto_trim` | boolean | No | `true` | auto trim the video, to working duration ( 5s ) |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/bria_video_eraser/erase/mask", {
  input: {
        "video_url": "https://example.com/input.png",
        "mask_video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/bria_video_eraser/erase/mask", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/bria_video_eraser/erase/mask", {
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

- API page: https://fal.ai/models/bria/bria_video_eraser/erase/mask/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/bria_video_eraser/erase/mask
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
