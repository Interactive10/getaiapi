---
name: fal-ai-sam-audio-separate
description: >
  Use this skill for the fal.ai Sam Audio model (fal-ai/sam-audio/separate). Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researchers, and accessibility applications.
---

# Sam Audio

Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researchers, and accessibility applications.

**Endpoint:** `fal-ai/sam-audio/separate`
**Source:** https://fal.ai/models/fal-ai/sam-audio/separate/api

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

const result = await fal.subscribe("fal-ai/sam-audio/separate", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | Text prompt describing the sound to isolate. |
| `chunk_overlap` | float | No | `5` | Overlap duration (in seconds) between chunks for crossfade blending. |
| `acceleration` | enum: `fast`, `balanced`, `quality` | No | `"balanced"` | The acceleration level to use. |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output audio format. |
| `max_chunk_duration` | float | No | `60` | Maximum audio duration (in seconds) to process in a single pass. Longer audio will be chunked with overlap and blended. |
| `audio_url` | string | **Yes** |  | URL of the audio file to process (WAV, MP3, FLAC supported) |
| `predict_spans` | boolean | No | `false` | Automatically predict temporal spans where the target sound occurs. |
| `reranking_candidates` | integer | No | `1` | Number of candidates to generate and rank. Higher improves quality but increases latency and cost. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `target` | File |  |
| `duration` | float | Duration of the output audio in seconds. |
| `sample_rate` | integer | Sample rate of the output audio in Hz. |
| `residual` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam-audio/separate", {
  input: {
        "prompt": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-audio/separate", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-audio/separate", {
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

- API page: https://fal.ai/models/fal-ai/sam-audio/separate/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-audio/separate
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
