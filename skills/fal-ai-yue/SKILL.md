---
name: fal-ai-yue
description: >
  Use this skill for the fal.ai YuE: Lyrics to Song model (fal-ai/yue). YuE is a groundbreaking series of open-source foundation models designed for music generation, specifically for transforming lyrics into full songs.
---

# YuE: Lyrics to Song

YuE is a groundbreaking series of open-source foundation models designed for music generation, specifically for transforming lyrics into full songs.

**Endpoint:** `fal-ai/yue`
**Source:** https://fal.ai/models/fal-ai/yue/api

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

const result = await fal.subscribe("fal-ai/yue", {
  input: {
        "lyrics": "your value here",
        "genres": "your value here"
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
| `lyrics` | string | **Yes** |  | The prompt to generate an image from. Must have two sections. Sections start with either [chorus] or a [verse]. |
| `genres` | string | **Yes** |  | The genres (separated by a space ' ') to guide the music generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/yue", {
  input: {
        "lyrics": "your value here",
        "genres": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/yue", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/yue", {
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

- API page: https://fal.ai/models/fal-ai/yue/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/yue
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
