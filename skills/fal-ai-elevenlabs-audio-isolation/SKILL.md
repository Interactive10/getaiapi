---
name: fal-ai-elevenlabs-audio-isolation
description: >
  Use this skill for the fal.ai ElevenLabs Audio Isolation model (fal-ai/elevenlabs/audio-isolation). Isolate audio tracks using ElevenLabs advanced audio isolation technology.
---

# ElevenLabs Audio Isolation

Isolate audio tracks using ElevenLabs advanced audio isolation technology.

**Endpoint:** `fal-ai/elevenlabs/audio-isolation`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/audio-isolation/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/audio-isolation", {
  input: {
        "prompt": "your prompt here"
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
| `video_url` | string | null | No |  | Video file to use for audio isolation. Either `audio_url` or `video_url` must be provided. |
| `audio_url` | string | null | No |  | URL of the audio file to isolate voice from |

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
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/audio-isolation", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/audio-isolation", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/audio-isolation", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/audio-isolation/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/audio-isolation
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
