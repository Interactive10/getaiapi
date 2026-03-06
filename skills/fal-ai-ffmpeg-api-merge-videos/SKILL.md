---
name: fal-ai-ffmpeg-api-merge-videos
description: >
  Use this skill for the fal.ai Ffmpeg Api model (fal-ai/ffmpeg-api/merge-videos). Use ffmpeg capabilities to merge 2 or more videos.
---

# Ffmpeg Api

Use ffmpeg capabilities to merge 2 or more videos.

**Endpoint:** `fal-ai/ffmpeg-api/merge-videos`
**Source:** https://fal.ai/models/fal-ai/ffmpeg-api/merge-videos/api

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

const result = await fal.subscribe("fal-ai/ffmpeg-api/merge-videos", {
  input: {
        "video_urls": []
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
| `target_fps` | float | null | No |  | Target FPS for the output video. If not provided, uses the lowest FPS from input videos. |
| `video_urls` | list<string> | **Yes** |  | List of video URLs to merge in order |
| `resolution` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | Resolution of the final video. Width and height must be between 512 and 2048. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | Metadata | Metadata about the merged video including original video info |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ffmpeg-api/merge-videos", {
  input: {
        "video_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ffmpeg-api/merge-videos", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ffmpeg-api/merge-videos", {
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

- API page: https://fal.ai/models/fal-ai/ffmpeg-api/merge-videos/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ffmpeg-api/merge-videos
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
