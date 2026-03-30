---
name: fal-ai-demucs
description: >
  Use this skill for the fal.ai Demucs model (fal-ai/demucs). SOTA stemming model for voice, drums, bass, guitar and more.
---

# Demucs

SOTA stemming model for voice, drums, bass, guitar and more.

**Endpoint:** `fal-ai/demucs`
**Source:** https://fal.ai/models/fal-ai/demucs/api

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

const result = await fal.subscribe("fal-ai/demucs", {
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
| `segment_length` | integer | null | No |  | Length in seconds of each segment for processing. Smaller values use less memory but may reduce quality. Default is m... |
| `output_format` | enum: `wav`, `mp3` | No | `"mp3"` | Output audio format for the separated stems |
| `stems` | list<enum: `vocals`, `drums`, `bass`, `other`, `guitar`, `piano`> | null | No | `['vocals', 'drums', 'bass', 'other', 'guitar', 'piano']` | Specific stems to extract. If None, extracts all available stems. Available stems depend on model: vocals, drums, bas... |
| `overlap` | float | No | `0.25` | Overlap between segments (0.0 to 1.0). Higher values may improve quality but increase processing time. |
| `model` | enum (8 values) | No | `"htdemucs_6s"` | Demucs model to use for separation |
| `audio_url` | string | **Yes** |  | URL of the audio file to separate into stems |
| `shifts` | integer | No | `1` | Number of random shifts for equivariant stabilization. Higher values improve quality but increase processing time. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `vocals` | File | null | Separated vocals audio file |
| `guitar` | File | null | Separated guitar audio file (only available for 6s models) |
| `bass` | File | null | Separated bass audio file |
| `piano` | File | null | Separated piano audio file (only available for 6s models) |
| `other` | File | null | Separated other instruments audio file |
| `drums` | File | null | Separated drums audio file |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/demucs", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/demucs", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/demucs", {
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

- API page: https://fal.ai/models/fal-ai/demucs/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/demucs
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
