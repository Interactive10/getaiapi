---
name: fal-ai-heygen-avatar4-digital-twin
description: >
  Use this skill for the fal.ai Heygen model (fal-ai/heygen/avatar4/digital-twin). Heygen Avatar 4 Digital Twin Model
---

# Heygen

Heygen Avatar 4 Digital Twin Model

**Endpoint:** `fal-ai/heygen/avatar4/digital-twin`
**Source:** https://fal.ai/models/fal-ai/heygen/avatar4/digital-twin/api

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

const result = await fal.subscribe("fal-ai/heygen/avatar4/digital-twin", {
  input: {
        "voice": "...",
        "character": "..."
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
| `voice` | TextVoice | **Yes** |  |  |
| `character` | Character | **Yes** |  |  |
| `audio_url` | string | null | No |  | URL of an audio file for the avatar to lip-sync to. When provided, the avatar uses this audio instead of text-to-speech. |
| `resolution` | enum: `360p`, `480p`, `540p`, `720p`, `1080p` | No | `"720p"` | Video resolution preset. Options: 360p, 480p, 540p, 720p, 1080p |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/heygen/avatar4/digital-twin", {
  input: {
        "voice": "...",
        "character": "..."
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/heygen/avatar4/digital-twin", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/heygen/avatar4/digital-twin", {
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

- API page: https://fal.ai/models/fal-ai/heygen/avatar4/digital-twin/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/heygen/avatar4/digital-twin
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
