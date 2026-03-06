---
name: fal-ai-elevenlabs-music
description: >
  Use this skill for the fal.ai Elevenlabs Music model (fal-ai/elevenlabs/music). Generate high quality, realistic music with fine controls using Elevenlabs Music!
---

# Elevenlabs Music

Generate high quality, realistic music with fine controls using Elevenlabs Music!

**Endpoint:** `fal-ai/elevenlabs/music`
**Source:** https://fal.ai/models/fal-ai/elevenlabs/music/api

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

const result = await fal.subscribe("fal-ai/elevenlabs/music", {
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
| `prompt` | string | null | No |  | The text prompt describing the music to generate |
| `composition_plan` | MusicCompositionPlan | null | No |  | The composition plan for the music |
| `music_length_ms` | integer | null | No |  | The length of the song to generate in milliseconds. Used only in conjunction with prompt. Must be between 3000ms and ... |
| `output_format` | enum (19 values) | No | `"mp3_44100_128"` | Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at ... |
| `respect_sections_durations` | boolean | No | `true` | Controls how strictly section durations in the composition_plan are enforced. It will only have an effect if it is us... |
| `force_instrumental` | boolean | No | `false` | If true, guarantees that the generated song will be instrumental. If false, the song may or may not be instrumental d... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/music", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/music", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/music", {
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

- API page: https://fal.ai/models/fal-ai/elevenlabs/music/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/elevenlabs/music
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
