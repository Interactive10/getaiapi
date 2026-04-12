---
name: fal-ai-workflow-utilities-impulse-response
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/impulse-response). FFMPEG Utility for Impulse Response
---

# Workflow Utilities

FFMPEG Utility for Impulse Response

**Endpoint:** `fal-ai/workflow-utilities/impulse-response`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/impulse-response/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/impulse-response", {
  input: {
        "impulse_response_url": "https://example.com/input.png",
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
| `impulse_response_url` | string | **Yes** |  | URL of the impulse response WAV file (reverb/effect profile) |
| `loudness_tp` | float | No | `-1.5` | Maximum true peak in dBTP (typically -2 to -1) |
| `loudness_lra` | float | No | `8` | Loudness Range target in LU (typically 5-15) |
| `dry_level` | float | No | `0.7` | Level of the original (dry) signal in the mix (0.0-1.0) |
| `loudness_i` | float | No | `-18` | Target integrated loudness in LUFS (typically -24 to -14) |
| `audio_url` | string | **Yes** |  | URL of the main audio file to process |
| `wet_level` | float | No | `0.3` | Level of the processed (wet) signal in the mix (0.0-1.0) |
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
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/impulse-response", {
  input: {
        "impulse_response_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/impulse-response", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/impulse-response", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/impulse-response/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/impulse-response
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
