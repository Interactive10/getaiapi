---
name: fal-ai-elevenlabs-voice-changer
description: >
  Use this skill for the fal.ai ElevenLabs Voice Changer model (fal-ai/elevenlabs/voice-changer). Change the voices in your audios with voices in ElevenLabs!
---

# ElevenLabs Voice Changer

Change the voices in your audios with voices in ElevenLabs!

**Endpoint:** `fal-ai/elevenlabs/voice-changer`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/voice-changer/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/voice-changer", {
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
| `voice` | string | No | `"Rachel"` | The voice to use for speech generation |
| `remove_background_noise` | boolean | No | `false` | If set, will remove the background noise from your audio input using our audio isolation model. |
| `seed` | integer | No |  | Random seed for reproducibility. |
| `output_format` | enum (19 values) | No | `"mp3_44100_128"` | Output format of the generated audio. Formatted as codec_sample_rate_bitrate. |
| `audio_url` | string | **Yes** |  | The input audio file |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | Random seed for reproducibility. |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/voice-changer", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/voice-changer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/voice-changer", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/voice-changer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/voice-changer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
