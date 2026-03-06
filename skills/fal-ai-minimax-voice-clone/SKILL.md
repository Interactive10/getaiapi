---
name: fal-ai-minimax-voice-clone
description: >
  Use this skill for the fal.ai MiniMax Voice Cloning model (fal-ai/minimax/voice-clone). Clone a voice from a sample audio and generate speech from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality text-to-speech.
---

# MiniMax Voice Cloning

Clone a voice from a sample audio and generate speech from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality text-to-speech.

**Endpoint:** `fal-ai/minimax/voice-clone`
**Source:** https://fal.ai/models/fal-ai/minimax/voice-clone/api

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

const result = await fal.subscribe("fal-ai/minimax/voice-clone", {
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
| `text` | string | null | No | `"Hello, this is a preview of your cloned voice! I hope you like it!"` | Text to generate a TTS preview with the cloned voice (optional) |
| `model` | enum: `speech-02-hd`, `speech-02-turbo`, `speech-01-hd`, `speech-01-turbo` | No | `"speech-02-hd"` | TTS model to use for preview. Options: speech-02-hd, speech-02-turbo, speech-01-hd, speech-01-turbo |
| `audio_url` | string | **Yes** |  | URL of the input audio file for voice cloning. Should be at least 10 seconds             long. To retain the voice pe... |
| `accuracy` | float | null | No |  | Text validation accuracy threshold (0-1) |
| `noise_reduction` | boolean | No | `false` | Enable noise reduction for the cloned voice |
| `need_volume_normalization` | boolean | No | `false` | Enable volume normalization for the cloned voice |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `custom_voice_id` | string | The cloned voice ID for use with TTS |
| `audio` | File | null | Preview audio generated with the cloned voice (if requested) |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/voice-clone", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/voice-clone", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/voice-clone", {
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

- API page: https://fal.ai/models/fal-ai/minimax/voice-clone/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/voice-clone
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
