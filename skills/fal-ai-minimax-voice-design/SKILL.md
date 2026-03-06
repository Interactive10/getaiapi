---
name: fal-ai-minimax-voice-design
description: >
  Use this skill for the fal.ai MiniMax Voice Design model (fal-ai/minimax/voice-design). Design a personalized voice from a text description, and generate speech from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality text-to-speech.
---

# MiniMax Voice Design

Design a personalized voice from a text description, and generate speech from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality text-to-speech.

**Endpoint:** `fal-ai/minimax/voice-design`
**Source:** https://fal.ai/models/fal-ai/minimax/voice-design/api

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

const result = await fal.subscribe("fal-ai/minimax/voice-design", {
  input: {
        "preview_text": "your value here",
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
| `preview_text` | string | **Yes** |  | Text for audio preview. Limited to 500 characters. A fee of $30 per 1M characters will be charged for the generation ... |
| `prompt` | string | **Yes** |  | Voice description prompt for generating a personalized voice |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `custom_voice_id` | string | The voice_id of the generated voice |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/voice-design", {
  input: {
        "preview_text": "your value here",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/voice-design", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/voice-design", {
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

- API page: https://fal.ai/models/fal-ai/minimax/voice-design/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/voice-design
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
