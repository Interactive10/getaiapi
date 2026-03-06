---
name: fal-ai-mirelo-ai-sfx-v1.5-video-to-video
description: >
  Use this skill for the fal.ai Mirelo SFX V1.5 model (mirelo-ai/sfx-v1.5/video-to-video). Generate synced sounds for any video, and return it with its new sound track (like MMAudio)
---

# Mirelo SFX V1.5

Generate synced sounds for any video, and return it with its new sound track (like MMAudio)

**Endpoint:** `mirelo-ai/sfx-v1.5/video-to-video`
**Source:** https://fal.ai/models/mirelo-ai/sfx-v1.5/video-to-video/api

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

const result = await fal.subscribe("mirelo-ai/sfx-v1.5/video-to-video", {
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
| `num_samples` | integer | null | No | `2` | The number of samples to generate from the model |
| `duration` | float | null | No | `10` | The duration of the generated audio in seconds |
| `start_offset` | float | null | No | `0` | The start offset in seconds to start the audio generation from |
| `video_url` | string (URL) | **Yes** |  | A video url that can accessed from the API to process and add sound effects |
| `seed` | integer | null | No | `8069` | The seed to use for the generation. If not provided, a random seed will be used |
| `text_prompt` | string | null | No |  | Additional description to guide the model |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | list<Video> | The processed video with sound effects |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("mirelo-ai/sfx-v1.5/video-to-video", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("mirelo-ai/sfx-v1.5/video-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("mirelo-ai/sfx-v1.5/video-to-video", {
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

- API page: https://fal.ai/models/mirelo-ai/sfx-v1.5/video-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=mirelo-ai/sfx-v1.5/video-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
