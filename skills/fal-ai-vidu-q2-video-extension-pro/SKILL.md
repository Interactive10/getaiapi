---
name: fal-ai-vidu-q2-video-extension-pro
description: >
  Use this skill for the fal.ai Vidu model (fal-ai/vidu/q2/video-extension/pro). Use the latest Vidu Q2 models which much more better quality and control on your videos.
---

# Vidu

Use the latest Vidu Q2 models which much more better quality and control on your videos.

**Endpoint:** `fal-ai/vidu/q2/video-extension/pro`
**Source:** https://fal.ai/models/fal-ai/vidu/q2/video-extension/pro/api

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

const result = await fal.subscribe("fal-ai/vidu/q2/video-extension/pro", {
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
| `prompt` | string | null | No |  | text prompt to guide the video extension |
| `resolution` | enum: `720p`, `1080p` | No | `"720p"` | Output video resolution |
| `video_url` | string | **Yes** |  | URL of the video to extend |
| `duration` | enum: `2`, `3`, `4`, `5`, `6`, `7` | No | `4` | Duration of the extension in seconds |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/vidu/q2/video-extension/pro", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/vidu/q2/video-extension/pro", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/vidu/q2/video-extension/pro", {
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

- API page: https://fal.ai/models/fal-ai/vidu/q2/video-extension/pro/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/vidu/q2/video-extension/pro
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
