---
name: fal-ai-f5-tts
description: >
  Use this skill for the fal.ai F5 TTS model (fal-ai/f5-tts). F5 TTS
---

# F5 TTS

F5 TTS

**Endpoint:** `fal-ai/f5-tts`
**Source:** https://fal.ai/models/fal-ai/f5-tts/api

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

const result = await fal.subscribe("fal-ai/f5-tts", {
  input: {
        "gen_text": "your value here",
        "model_type": "F5-TTS",
        "ref_audio_url": "https://example.com/input.png"
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
| `ref_text` | string | No | `""` | The reference text to be used for TTS. If not provided, an ASR (Automatic Speech Recognition) model will be used to g... |
| `remove_silence` | boolean | No | `true` | Whether to remove the silence from the audio file. |
| `gen_text` | string | **Yes** |  | The text to be converted to speech. |
| `model_type` | enum: `F5-TTS`, `E2-TTS` | **Yes** |  | The name of the model to be used for TTS. |
| `ref_audio_url` | string | **Yes** |  | The URL of the reference audio file. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio_url` | AudioFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/f5-tts", {
  input: {
        "gen_text": "your value here",
        "model_type": "F5-TTS",
        "ref_audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/f5-tts", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/f5-tts", {
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

- API page: https://fal.ai/models/fal-ai/f5-tts/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/f5-tts
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
