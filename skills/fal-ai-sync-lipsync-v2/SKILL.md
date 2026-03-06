---
name: fal-ai-sync-lipsync-v2
description: >
  Use this skill for the fal.ai Sync Lipsync 2.0 model (fal-ai/sync-lipsync/v2). Generate realistic lipsync animations from audio using advanced algorithms for high-quality synchronization with Sync Lipsync 2.0 model
---

# Sync Lipsync 2.0

Generate realistic lipsync animations from audio using advanced algorithms for high-quality synchronization with Sync Lipsync 2.0 model

**Endpoint:** `fal-ai/sync-lipsync/v2`
**Source:** https://fal.ai/models/fal-ai/sync-lipsync/v2/api

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

const result = await fal.subscribe("fal-ai/sync-lipsync/v2", {
  input: {
        "video_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
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
| `model` | enum: `lipsync-2`, `lipsync-2-pro` | No | `"lipsync-2"` | The model to use for lipsyncing. `lipsync-2-pro` will cost roughly 1.67 times as much as `lipsync-2` for the same dur... |
| `video_url` | string | **Yes** |  | URL of the input video |
| `sync_mode` | enum: `cut_off`, `loop`, `bounce`, `silence`, `remap` | No | `"cut_off"` | Lipsync mode when audio and video durations are out of sync. |
| `audio_url` | string | **Yes** |  | URL of the input audio |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sync-lipsync/v2", {
  input: {
        "video_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sync-lipsync/v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sync-lipsync/v2", {
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

- API page: https://fal.ai/models/fal-ai/sync-lipsync/v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sync-lipsync/v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
