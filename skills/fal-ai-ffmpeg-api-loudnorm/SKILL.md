---
name: fal-ai-ffmpeg-api-loudnorm
description: >
  Use this skill for the fal.ai Ffmpeg Api model (fal-ai/ffmpeg-api/loudnorm). Get EBU R128 loudness normalization from audio files using FFmpeg API.
---

# Ffmpeg Api

Get EBU R128 loudness normalization from audio files using FFmpeg API.

**Endpoint:** `fal-ai/ffmpeg-api/loudnorm`
**Source:** https://fal.ai/models/fal-ai/ffmpeg-api/loudnorm/api

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

const result = await fal.subscribe("fal-ai/ffmpeg-api/loudnorm", {
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
| `measured_lra` | float | null | No |  | Measured loudness range of input file in LU. Required for linear mode. |
| `print_summary` | boolean | No | `false` | Return loudness measurement summary with the normalized audio |
| `offset` | float | No | `0` | Offset gain in dB applied before the true-peak limiter |
| `measured_i` | float | null | No |  | Measured integrated loudness of input file in LUFS. Required for linear mode. |
| `measured_tp` | float | null | No |  | Measured true peak of input file in dBTP. Required for linear mode. |
| `linear` | boolean | No | `false` | Use linear normalization mode (single-pass). If false, uses dynamic mode (two-pass for better quality). |
| `measured_thresh` | float | null | No |  | Measured threshold of input file in LUFS. Required for linear mode. |
| `dual_mono` | boolean | No | `false` | Treat mono input files as dual-mono for correct EBU R128 measurement on stereo systems |
| `true_peak` | float | No | `-0.1` | Maximum true peak in dBTP. |
| `audio_url` | string | **Yes** |  | URL of the audio file to normalize |
| `integrated_loudness` | float | No | `-18` | Integrated loudness target in LUFS. |
| `loudness_range` | float | No | `7` | Loudness range target in LU |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `summary` | LoudnormSummary | null | Structured loudness measurement summary (if requested) |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ffmpeg-api/loudnorm", {
  input: {
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ffmpeg-api/loudnorm", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ffmpeg-api/loudnorm", {
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

- API page: https://fal.ai/models/fal-ai/ffmpeg-api/loudnorm/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ffmpeg-api/loudnorm
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
