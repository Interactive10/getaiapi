---
name: fal-ai-kokoro-mandarin-chinese
description: >
  Use this skill for the fal.ai Kokoro TTS (Mandarin Chinese) model (fal-ai/kokoro/mandarin-chinese). A highly efficient Mandarin Chinese text-to-speech model that captures natural tones and prosody.
---

# Kokoro TTS (Mandarin Chinese)

A highly efficient Mandarin Chinese text-to-speech model that captures natural tones and prosody.

**Endpoint:** `fal-ai/kokoro/mandarin-chinese`
**Source:** https://fal.ai/models/fal-ai/kokoro/mandarin-chinese/api

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

const result = await fal.subscribe("fal-ai/kokoro/mandarin-chinese", {
  input: {
        "voice": "zf_xiaobei",
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
const { request_id } = await fal.queue.submit("fal-ai/kokoro/mandarin-chinese", {
  input: {
        "voice": "zf_xiaobei",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kokoro/mandarin-chinese", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kokoro/mandarin-chinese", {
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

- API page: https://fal.ai/models/fal-ai/kokoro/mandarin-chinese/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kokoro/mandarin-chinese
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
