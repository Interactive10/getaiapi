---
name: fal-ai-speech-to-text
description: >
  Use this skill for the fal.ai Speech-to-Text model (fal-ai/speech-to-text). Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription.
---

# Speech-to-Text

Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription.

**Endpoint:** `fal-ai/speech-to-text`
**Source:** https://fal.ai/models/fal-ai/speech-to-text/api

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

const result = await fal.subscribe("fal-ai/speech-to-text", {
  input: {
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
| `audio_url` | string | **Yes** |  | Local filesystem path (or remote URL) to a long audio file |
| `use_pnc` | boolean | No | `true` | Whether to use Canary's built-in punctuation & capitalization |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `partial` | boolean | Indicates if this is a partial (in-progress) transcript |
| `output` | string | The partial or final transcription output from Canary |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/speech-to-text", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/speech-to-text", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/speech-to-text", {
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

- API page: https://fal.ai/models/fal-ai/speech-to-text/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/speech-to-text
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
