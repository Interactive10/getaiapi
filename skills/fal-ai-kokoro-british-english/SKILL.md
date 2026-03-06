---
name: fal-ai-kokoro-british-english
description: >
  Use this skill for the fal.ai Kokoro TTS (British English) model (fal-ai/kokoro/british-english). A high-quality British English text-to-speech model offering natural and expressive voice synthesis.
---

# Kokoro TTS (British English)

A high-quality British English text-to-speech model offering natural and expressive voice synthesis.

**Endpoint:** `fal-ai/kokoro/british-english`
**Source:** https://fal.ai/models/fal-ai/kokoro/british-english/api

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

const result = await fal.subscribe("fal-ai/kokoro/british-english", {
  input: {
        "voice": "bf_alice",
        "prompt": "your value here"
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
| `speed` | float | No | `1` | Speed of the generated audio. Default is 1.0. |
| `voice` | enum (8 values) | **Yes** |  | Voice ID for the desired voice. |
| `prompt` | string | **Yes** |  |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kokoro/british-english", {
  input: {
        "voice": "bf_alice",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kokoro/british-english", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kokoro/british-english", {
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

- API page: https://fal.ai/models/fal-ai/kokoro/british-english/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kokoro/british-english
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
