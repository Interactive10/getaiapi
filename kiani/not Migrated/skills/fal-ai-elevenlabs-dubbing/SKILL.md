---
name: fal-ai-elevenlabs-dubbing
description: >
  Use this skill for the fal.ai ElevenLabs Dubbing model (fal-ai/elevenlabs/dubbing). Generate dubbed videos or audios using ElevenLabs Dubbing feature!
---

# ElevenLabs Dubbing

Generate dubbed videos or audios using ElevenLabs Dubbing feature!

**Endpoint:** `fal-ai/elevenlabs/dubbing`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/dubbing/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/dubbing", {
  input: {
        "target_lang": "your value here"
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
| `video_url` | string | null | No |  | URL of the video file to dub. Either audio_url or video_url must be provided. If both are provided, video_url takes p... |
| `highest_resolution` | boolean | No | `true` | Whether to use the highest resolution for dubbing. |
| `audio_url` | string | null | No |  | URL of the audio file to dub. Either audio_url or video_url must be provided. |
| `num_speakers` | integer | null | No |  | Number of speakers in the audio. If not provided, will be auto-detected. |
| `source_lang` | string | null | No |  | Source language code. If not provided, will be auto-detected. |
| `target_lang` | string | **Yes** |  | Target language code for dubbing (ISO 639-1) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `target_lang` | string | The target language of the dubbed content |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/dubbing", {
  input: {
        "target_lang": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/dubbing", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/dubbing", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/dubbing/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/dubbing
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
