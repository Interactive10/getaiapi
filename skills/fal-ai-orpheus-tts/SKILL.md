---
name: fal-ai-orpheus-tts
description: >
  Use this skill for the fal.ai Orpheus TTS model (fal-ai/orpheus-tts). Orpheus TTS is a state-of-the-art, Llama-based Speech-LLM designed for high-quality, empathetic text-to-speech generation. This model has been finetuned to deliver human-level speech synthesis, achiev
---

# Orpheus TTS

Orpheus TTS is a state-of-the-art, Llama-based Speech-LLM designed for high-quality, empathetic text-to-speech generation. This model has been finetuned to deliver human-level speech synthesis, achieving exceptional clarity, expressiveness, and real-time performances.

**Endpoint:** `fal-ai/orpheus-tts`
**Source:** https://fal.ai/models/fal-ai/orpheus-tts/api

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

const result = await fal.subscribe("fal-ai/orpheus-tts", {
  input: {
        "text": "your value here"
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
| `text` | string | **Yes** |  | The text to be converted to speech. You can additionally add the following emotive tags: <laugh>, <chuckle>, <sigh>, ... |
| `voice` | enum (8 values) | No | `"tara"` | Voice ID for the desired voice. |
| `repetition_penalty` | float | No | `1.2` | Repetition penalty (>= 1.1 required for stable generations). |
| `temperature` | float | No | `0.7` | Temperature for generation (higher = more creative). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/orpheus-tts", {
  input: {
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/orpheus-tts", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/orpheus-tts", {
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

- API page: https://fal.ai/models/fal-ai/orpheus-tts/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/orpheus-tts
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
