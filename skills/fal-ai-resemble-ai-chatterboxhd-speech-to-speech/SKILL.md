---
name: fal-ai-resemble-ai-chatterboxhd-speech-to-speech
description: >
  Use this skill for the fal.ai Chatterboxhd model (resemble-ai/chatterboxhd/speech-to-speech). Transform voices using Resemble AI's Chatterbox. Convert audio to new voices or your own samples, with expressive results and built-in perceptual watermarking.
---

# Chatterboxhd

Transform voices using Resemble AI's Chatterbox. Convert audio to new voices or your own samples, with expressive results and built-in perceptual watermarking.

**Endpoint:** `resemble-ai/chatterboxhd/speech-to-speech`
**Source:** https://fal.ai/models/resemble-ai/chatterboxhd/speech-to-speech/api

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

const result = await fal.subscribe("resemble-ai/chatterboxhd/speech-to-speech", {
  input: {
        "source_audio_url": "https://example.com/input.png"
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
| `high_quality_audio` | boolean | No | `false` | If True, the generated audio will be upscaled to 48kHz. The generation of the audio will take longer, but the quality... |
| `target_voice_audio_url` | string | No |  | URL to the audio file which represents the voice of the output audio. If provided, this will override the target_voic... |
| `source_audio_url` | string | **Yes** |  | URL to the source audio file to be voice-converted. |
| `target_voice` | enum (9 values) | No |  | The voice to use for the speech-to-speech request. If neither target_voice nor target_voice_audio_url are provided, a... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | Audio | The generated voice-converted audio file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("resemble-ai/chatterboxhd/speech-to-speech", {
  input: {
        "source_audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("resemble-ai/chatterboxhd/speech-to-speech", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("resemble-ai/chatterboxhd/speech-to-speech", {
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

- API page: https://fal.ai/models/resemble-ai/chatterboxhd/speech-to-speech/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=resemble-ai/chatterboxhd/speech-to-speech
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
