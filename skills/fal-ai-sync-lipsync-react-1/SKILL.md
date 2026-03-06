---
name: fal-ai-sync-lipsync-react-1
description: >
  Use this skill for the fal.ai Sync React-1 model (fal-ai/sync-lipsync/react-1). Use React-1 from SyncLabs to refine human emotions and do realistic lip-sync without losing details!
---

# Sync React-1

Use React-1 from SyncLabs to refine human emotions and do realistic lip-sync without losing details!

**Endpoint:** `fal-ai/sync-lipsync/react-1`
**Source:** https://fal.ai/models/fal-ai/sync-lipsync/react-1/api

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

const result = await fal.subscribe("fal-ai/sync-lipsync/react-1", {
  input: {
        "emotion": "happy",
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
| `emotion` | enum: `happy`, `angry`, `sad`, `neutral`, `disgusted`, `surprised` | **Yes** |  | Emotion prompt for the generation. Currently supports single-word emotions only. |
| `video_url` | string | **Yes** |  | URL to the input video. Must be **15 seconds or shorter**. |
| `lipsync_mode` | enum: `cut_off`, `loop`, `bounce`, `silence`, `remap` | No | `"bounce"` | Lipsync mode when audio and video durations are out of sync. |
| `audio_url` | string | **Yes** |  | URL to the input audio. Must be **15 seconds or shorter**. |
| `temperature` | float | No | `0.5` | Controls the expresiveness of the lipsync. |
| `model_mode` | enum: `lips`, `face`, `head` | No | `"face"` | Controls the edit region and movement scope for the model. Available options: - `lips`: Only lipsync using react-1 (m... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sync-lipsync/react-1", {
  input: {
        "emotion": "happy",
        "video_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sync-lipsync/react-1", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sync-lipsync/react-1", {
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

- API page: https://fal.ai/models/fal-ai/sync-lipsync/react-1/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sync-lipsync/react-1
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
