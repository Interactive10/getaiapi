---
name: fal-ai-sam-audio-span-separate
description: >
  Use this skill for the fal.ai Sam Audio model (fal-ai/sam-audio/span-separate). Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researchers, and accessibility applications.
---

# Sam Audio

Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researchers, and accessibility applications.

**Endpoint:** `fal-ai/sam-audio/span-separate`
**Source:** https://fal.ai/models/fal-ai/sam-audio/span-separate/api

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

const result = await fal.subscribe("fal-ai/sam-audio/span-separate", {
  input: {
        "spans": [],
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
| `prompt` | string | null | No |  | Text prompt describing the sound to isolate. Optional but recommended - helps the model identify what type of sound t... |
| `chunk_overlap` | float | No | `5` | Overlap duration (in seconds) between chunks for crossfade blending. |
| `spans` | list<AudioTimeSpan> | **Yes** |  | Time spans where the target sound occurs which should be isolated. |
| `acceleration` | enum: `fast`, `balanced`, `quality` | No | `"balanced"` | The acceleration level to use. |
| `use_sound_activity_ranking` | boolean | No | `false` | Use sound activity detection to rank reranking candidates based on how well each candidate's non-silent regions match... |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output audio format. |
| `max_chunk_duration` | float | No | `60` | Maximum audio duration (in seconds) to process in a single pass. Longer audio will be chunked with overlap and blended. |
| `trim_to_span` | boolean | No | `false` | Trim output audio to only include the specified span time range. If False, returns the full audio length with the tar... |
| `audio_url` | string | **Yes** |  | URL of the audio file to process. |
| `reranking_candidates` | integer | No | `1` | Number of candidates to generate and rank. Higher improves quality but increases latency and cost. Requires text prom... |

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
const { request_id } = await fal.queue.submit("fal-ai/sam-audio/span-separate", {
  input: {
        "spans": [],
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-audio/span-separate", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-audio/span-separate", {
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

- API page: https://fal.ai/models/fal-ai/sam-audio/span-separate/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-audio/span-separate
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
