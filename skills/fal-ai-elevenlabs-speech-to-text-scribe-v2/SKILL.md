---
name: fal-ai-elevenlabs-speech-to-text-scribe-v2
description: >
  Use this skill for the fal.ai ElevenLabs Speech to Text - Scribe V2 model (fal-ai/elevenlabs/speech-to-text/scribe-v2). Use Scribe-V2 from ElevenLabs to do blazingly fast speech to text inferences!
---

# ElevenLabs Speech to Text - Scribe V2

Use Scribe-V2 from ElevenLabs to do blazingly fast speech to text inferences!

**Endpoint:** `fal-ai/elevenlabs/speech-to-text/scribe-v2`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/speech-to-text/scribe-v2/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/speech-to-text/scribe-v2", {
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
| `keyterms` | list<string> | No | `[]` | Words or sentences to bias the model towards transcribing. Up to 100 keyterms, max 50 characters each. Adds 30% premi... |
| `audio_url` | string | **Yes** |  | URL of the audio file to transcribe |
| `diarize` | boolean | No | `true` | Whether to annotate who is speaking |
| `language_code` | string | null | No |  | Language code of the audio |
| `tag_audio_events` | boolean | No | `true` | Tag audio events like laughter, applause, etc. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | The full transcribed text |
| `language_probability` | float | Confidence in language detection |
| `language_code` | string | Detected or specified language code |
| `words` | list<TranscriptionWord> | Word-level transcription details |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/speech-to-text/scribe-v2", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/speech-to-text/scribe-v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/speech-to-text/scribe-v2", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/speech-to-text/scribe-v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/speech-to-text/scribe-v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
