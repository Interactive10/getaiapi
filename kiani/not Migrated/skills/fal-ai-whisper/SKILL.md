---
name: fal-ai-whisper
description: >
  Use this skill for the fal.ai Whisper model (fal-ai/whisper). Whisper is a model for speech transcription and translation.
---

# Whisper

Whisper is a model for speech transcription and translation.

**Endpoint:** `fal-ai/whisper`
**Source:** https://fal.ai/models/fal-ai/whisper/api

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

const result = await fal.subscribe("fal-ai/whisper", {
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
| `prompt` | string | No | `""` | Prompt to use for generation. Defaults to an empty string. |
| `batch_size` | integer | No | `64` |  |
| `version` | string | No | `"3"` | Version of the model to use. All of the models are the Whisper large variant. |
| `language` | enum (99 values) | null | No |  | Language of the audio file. If set to null, the language will be         automatically detected. Defaults to null.   ... |
| `num_speakers` | integer | null | No |  | Number of speakers in the audio file. Defaults to null.             If not provided, the number of speakers will be a... |
| `task` | enum: `transcribe`, `translate` | No | `"transcribe"` | Task to perform on the audio file. Either transcribe or translate. |
| `chunk_level` | enum: `none`, `segment`, `word` | No | `"segment"` | Level of the chunks to return. Either none, segment or word. `none` would imply that all of the audio will be transcr... |
| `audio_url` | string | **Yes** |  | URL of the audio file to transcribe. Supported formats: mp3, mp4, mpeg, mpga, m4a, wav or webm. |
| `diarize` | boolean | No | `false` | Whether to diarize the audio file. Defaults to false. Setting to true will add costs proportional to diarization infe... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | Transcription of the audio file |
| `inferred_languages` | list<enum (99 values)> | List of languages that the audio file is inferred to be. Defaults to null. |
| `chunks` | list<WhisperChunk> | null | Timestamp chunks of the audio file |
| `diarization_segments` | list<DiarizationSegment> | Speaker diarization segments of the audio file. Only present if diarization is enabled. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/whisper", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/whisper", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/whisper", {
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

- API page: https://fal.ai/models/fal-ai/whisper/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/whisper
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
