---
name: fal-ai-maya-batch
description: >
  Use this skill for the fal.ai Maya model (fal-ai/maya/batch). Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise voice design.
---

# Maya

Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise voice design.

**Endpoint:** `fal-ai/maya/batch`
**Source:** https://fal.ai/models/fal-ai/maya/batch/api

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

const result = await fal.subscribe("fal-ai/maya/batch", {
  input: {
        "texts": [],
        "prompts": []
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
| `repetition_penalty` | float | No | `1.1` | Repetition penalty for all generations. |
| `top_p` | float | No | `0.9` | Nucleus sampling parameter for all generations. |
| `output_format` | enum: `wav`, `mp3` | No | `"wav"` | Output audio format for all generated speech files |
| `texts` | list<string> | **Yes** |  | List of texts to synthesize into speech. You can embed emotion tags in each text using the format <emotion_name>. |
| `prompts` | list<string> | **Yes** |  | List of voice descriptions for each text. Must match the length of texts list. Each describes the voice/character att... |
| `max_tokens` | integer | No | `2000` | Maximum SNAC tokens per generation. |
| `temperature` | float | No | `0.4` | Sampling temperature for all generations. |
| `sample_rate` | enum: `48 kHz`, `24 kHz` | No | `"48 kHz"` | Output audio sample rate for all generations. 48 kHz provides higher quality, 24 kHz is faster. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `average_rtf` | float | Average real-time factor across all generations |
| `sample_rate` | string | Sample rate of all generated audio files |
| `total_generation_time` | float | Total time taken to generate all audio files in seconds |
| `audios` | list<File> | List of generated audio files |
| `durations` | list<float> | Duration of each generated audio in seconds |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/maya/batch", {
  input: {
        "texts": [],
        "prompts": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/maya/batch", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/maya/batch", {
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

- API page: https://fal.ai/models/fal-ai/maya/batch/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/maya/batch
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
