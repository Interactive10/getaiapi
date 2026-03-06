---
name: fal-ai-clarityai-crystal-video-upscaler
description: >
  Use this skill for the fal.ai Crystal Upscaler [Video] model (clarityai/crystal-video-upscaler). Do high precision video upscaling that respects the original video perfectly using Crystal Upscaler's new video upscaling method!
---

# Crystal Upscaler [Video]

Do high precision video upscaling that respects the original video perfectly using Crystal Upscaler's new video upscaling method!

**Endpoint:** `clarityai/crystal-video-upscaler`
**Source:** https://fal.ai/models/clarityai/crystal-video-upscaler/api

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

const result = await fal.subscribe("clarityai/crystal-video-upscaler", {
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
| `video_url` | string | **Yes** |  | URL to the input video. |
| `scale_factor` | float | No | `2` | Scale factor. The scale factor must be chosen such that the upscaled video does not exceed 5K resolution. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("clarityai/crystal-video-upscaler", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("clarityai/crystal-video-upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("clarityai/crystal-video-upscaler", {
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

- API page: https://fal.ai/models/clarityai/crystal-video-upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=clarityai/crystal-video-upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
