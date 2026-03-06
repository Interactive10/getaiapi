---
name: fal-ai-dubbing
description: >
  Use this skill for the fal.ai Dubbing model (fal-ai/dubbing). This endpoint delivers seamlessly localized videos by generating lip-synced dubs in multiple languages, ensuring natural and immersive multilingual experiences
---

# Dubbing

This endpoint delivers seamlessly localized videos by generating lip-synced dubs in multiple languages, ensuring natural and immersive multilingual experiences

**Endpoint:** `fal-ai/dubbing`
**Source:** https://fal.ai/models/fal-ai/dubbing/api

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

const result = await fal.subscribe("fal-ai/dubbing", {
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
| `do_lipsync` | boolean | No | `true` | Whether to lip sync the audio to the video |
| `video_url` | string | **Yes** |  | Input video URL to be dubbed. |
| `target_language` | enum: `hindi`, `turkish`, `english` | No | `"hindi"` | Target language to dub the video to |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | The generated video with the lip sync. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/dubbing", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/dubbing", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/dubbing", {
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

- API page: https://fal.ai/models/fal-ai/dubbing/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/dubbing
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
