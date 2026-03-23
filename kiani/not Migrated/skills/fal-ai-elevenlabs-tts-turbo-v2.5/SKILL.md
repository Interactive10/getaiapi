---
name: fal-ai-elevenlabs-tts-turbo-v2.5
description: >
  Use this skill for the fal.ai ElevenLabs TTS Turbo v2.5 model (fal-ai/elevenlabs/tts/turbo-v2.5). Generate high-speed text-to-speech audio using ElevenLabs TTS Turbo v2.5.
---

# ElevenLabs TTS Turbo v2.5

Generate high-speed text-to-speech audio using ElevenLabs TTS Turbo v2.5.

**Endpoint:** `fal-ai/elevenlabs/tts/turbo-v2.5`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/tts/turbo-v2.5/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/tts/turbo-v2.5", {
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
| `text` | string | **Yes** |  | The text to convert to speech |
| `next_text` | string | null | No |  | The text that comes after the text of the current request. Can be used to improve the speech's continuity when concat... |
| `stability` | float | No | `0.5` | Voice stability (0-1) |
| `style` | float | No | `0` | Style exaggeration (0-1) |
| `speed` | float | No | `1` | Speech speed (0.7-1.2). Values below 1.0 slow down the speech, above 1.0 speed it up. Extreme values may affect quality. |
| `timestamps` | boolean | No | `false` | Whether to return timestamps for each word in the generated speech |
| `similarity_boost` | float | No | `0.75` | Similarity boost (0-1) |
| `voice` | string | No | `"Rachel"` | The voice to use for speech generation |
| `language_code` | string | null | No |  | Language code (ISO 639-1) used to enforce a language for the model. An error will be returned if language code is not... |
| `apply_text_normalization` | enum: `auto`, `on`, `off` | No | `"auto"` | This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system ... |
| `previous_text` | string | null | No |  | The text that came before the text of the current request. Can be used to improve the speech's continuity when concat... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |
| `timestamps` | list<any> | null | Timestamps for each word in the generated speech. Only returned if `timestamps` is set to True in the request. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/tts/turbo-v2.5", {
  input: {
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/tts/turbo-v2.5", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/tts/turbo-v2.5", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/tts/turbo-v2.5/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/tts/turbo-v2.5
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
