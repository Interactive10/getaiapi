---
name: fal-ai-ffmpeg-api-compose
description: >
  Use this skill for the fal.ai FFmpeg API Compose model (fal-ai/ffmpeg-api/compose). Compose videos from multiple media sources using FFmpeg API.
---

# FFmpeg API Compose

Compose videos from multiple media sources using FFmpeg API.

**Endpoint:** `fal-ai/ffmpeg-api/compose`
**Source:** https://fal.ai/models/fal-ai/ffmpeg-api/compose/api

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

const result = await fal.subscribe("fal-ai/ffmpeg-api/compose", {
  input: {
        "tracks": []
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
| `tracks` | list<Track> | **Yes** |  | List of tracks to be combined into the final media |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video_url` | string | URL of the processed video file |
| `thumbnail_url` | string | URL of the video's thumbnail image |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ffmpeg-api/compose", {
  input: {
        "tracks": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ffmpeg-api/compose", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ffmpeg-api/compose", {
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

- API page: https://fal.ai/models/fal-ai/ffmpeg-api/compose/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ffmpeg-api/compose
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
