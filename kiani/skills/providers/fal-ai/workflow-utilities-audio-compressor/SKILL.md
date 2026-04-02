---
name: fal-ai-workflow-utilities-audio-compressor
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/audio-compressor). FFMPEG Utility for Audio Compression
---

# Workflow Utilities

FFMPEG Utility for Audio Compression

**Endpoint:** `fal-ai/workflow-utilities/audio-compressor`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/audio-compressor/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/audio-compressor", {
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
| `threshold` | float | No | `-18` | Threshold level in dB above which compression is applied (-60 to 0) |
| `ratio` | float | No | `3` | Compression ratio (1 = no compression, higher = more compression) |
| `attack` | float | No | `5` | Attack time in milliseconds (how fast compression starts) |
| `makeup` | float | No | `8` | Makeup gain in dB to compensate for volume reduction |
| `release` | float | No | `50` | Release time in milliseconds (how fast compression stops) |
| `knee` | float | No | `2.83` | Knee width in dB for soft knee compression (0 = hard knee) |
| `audio_url` | string | **Yes** |  | URL of the audio file to compress |
| `output_bitrate` | enum: `128k`, `192k`, `256k`, `320k` | No | `"192k"` | Output audio bitrate |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | AudioFile | Audio file with url field |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/audio-compressor", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/audio-compressor", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/audio-compressor", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/audio-compressor/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/audio-compressor
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
