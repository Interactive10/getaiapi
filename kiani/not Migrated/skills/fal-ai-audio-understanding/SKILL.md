---
name: fal-ai-audio-understanding
description: >
  Use this skill for the fal.ai Audio Understanding model (fal-ai/audio-understanding). A audio understanding model to analyze audio content and answer questions about what's happening in the audio based on user prompts.
---

# Audio Understanding

A audio understanding model to analyze audio content and answer questions about what's happening in the audio based on user prompts.

**Endpoint:** `fal-ai/audio-understanding`
**Source:** https://fal.ai/models/fal-ai/audio-understanding/api

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

const result = await fal.subscribe("fal-ai/audio-understanding", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The question or prompt about the audio content. |
| `detailed_analysis` | boolean | No | `false` | Whether to request a more detailed analysis of the audio |
| `audio_url` | string | **Yes** |  | URL of the audio file to analyze |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `output` | string | The analysis of the audio content based on the prompt |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/audio-understanding", {
  input: {
        "prompt": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/audio-understanding", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/audio-understanding", {
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

- API page: https://fal.ai/models/fal-ai/audio-understanding/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/audio-understanding
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
