---
name: fal-ai-wizper
description: >
  Use this skill for the fal.ai Wizper (Whisper v3 -- fal.ai edition) model (fal-ai/wizper). [Experimental] Whisper v3 Large -- but optimized by our inference wizards. Same WER, double the performance!
---

# Wizper (Whisper v3 -- fal.ai edition)

[Experimental] Whisper v3 Large -- but optimized by our inference wizards. Same WER, double the performance!

**Endpoint:** `fal-ai/wizper`
**Source:** https://fal.ai/models/fal-ai/wizper/api

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

const result = await fal.subscribe("fal-ai/wizper", {
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
| `language` | enum (99 values) | null | No | `"en"` | Language of the audio file.         If translate is selected as the task, the audio will be translated to         Eng... |
| `version` | string | No | `"3"` | Version of the model to use. All of the models are the Whisper large variant. |
| `max_segment_len` | integer | No | `29` | Maximum speech segment duration in seconds before splitting. |
| `task` | enum: `transcribe`, `translate` | No | `"transcribe"` | Task to perform on the audio file. Either transcribe or translate. |
| `chunk_level` | string | No | `"segment"` | Level of the chunks to return. |
| `audio_url` | string | **Yes** |  | URL of the audio file to transcribe. Supported formats: mp3, mp4, mpeg, mpga, m4a, wav or webm. |
| `merge_chunks` | boolean | No | `true` | Whether to merge consecutive chunks. When enabled, chunks are merged if their combined duration does not exceed max_s... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | Transcription of the audio file |
| `languages` | list<enum (99 values)> | List of languages that the audio file is inferred to be. Defaults to null. |
| `chunks` | list<WhisperChunk> | Timestamp chunks of the audio file |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wizper", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wizper", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wizper", {
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

- API page: https://fal.ai/models/fal-ai/wizper/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wizper
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
