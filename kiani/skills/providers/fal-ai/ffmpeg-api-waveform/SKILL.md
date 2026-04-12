---
name: fal-ai-ffmpeg-api-waveform
description: >
  Use this skill for the fal.ai FFmpeg API Waveform model (fal-ai/ffmpeg-api/waveform). Get waveform data from audio files using FFmpeg API.
---

# FFmpeg API Waveform

Get waveform data from audio files using FFmpeg API.

**Endpoint:** `fal-ai/ffmpeg-api/waveform`
**Source:** https://fal.ai/models/fal-ai/ffmpeg-api/waveform/api

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

const result = await fal.subscribe("fal-ai/ffmpeg-api/waveform", {
  input: {
        "media_url": "https://example.com/input.png"
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
| `points_per_second` | float | No | `4` | Controls how many points are sampled per second of audio. Lower values (e.g. 1-2) create a coarser waveform, higher v... |
| `smoothing_window` | integer | No | `3` | Size of the smoothing window. Higher values create a smoother waveform. Must be an odd number. |
| `media_url` | string | **Yes** |  | URL of the audio file to analyze |
| `precision` | integer | No | `2` | Number of decimal places for the waveform values. Higher values provide more precision but increase payload size. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `waveform` | list<float> | Normalized waveform data as an array of values between -1 and 1. The number of points is determined by audio duration... |
| `points` | integer | Number of points in the waveform data |
| `duration` | float | Duration of the audio in seconds |
| `precision` | integer | Number of decimal places used in the waveform values |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ffmpeg-api/waveform", {
  input: {
        "media_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ffmpeg-api/waveform", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ffmpeg-api/waveform", {
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

- API page: https://fal.ai/models/fal-ai/ffmpeg-api/waveform/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ffmpeg-api/waveform
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
