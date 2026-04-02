---
name: fal-ai-maya-stream
description: >
  Use this skill for the fal.ai Maya model (fal-ai/maya/stream). Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise voice design.
---

# Maya

Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise voice design.

**Endpoint:** `fal-ai/maya/stream`
**Source:** https://fal.ai/models/fal-ai/maya/stream/api

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

const result = await fal.subscribe("fal-ai/maya/stream", {
  input: {
        "prompt": "your value here",
        "text": "your value here"
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
| `repetition_penalty` | float | No | `1.1` | Penalty for repeating tokens. Higher values reduce repetition artifacts. |
| `prompt` | string | **Yes** |  | Description of the voice/character. Includes attributes like age, accent, pitch, timbre, pacing, tone, and intensity.... |
| `top_p` | float | No | `0.9` | Nucleus sampling parameter. Controls diversity of token selection. |
| `text` | string | **Yes** |  | The text to synthesize into speech. You can embed emotion tags anywhere in the text using the format <emotion_name>. ... |
| `output_format` | enum: `mp3`, `wav`, `pcm` | No | `"mp3"` | Output audio format. 'mp3' for browser-playable audio, 'wav' for uncompressed audio, 'pcm' for raw PCM (lowest latenc... |
| `max_tokens` | integer | No | `2000` | Maximum number of SNAC tokens to generate (7 tokens per frame). Controls maximum audio length. |
| `temperature` | float | No | `0.4` | Sampling temperature. Lower values (0.2-0.5) produce more stable/consistent audio. Higher values add variation. |
| `sample_rate` | enum: `48 kHz`, `24 kHz` | No | `"24 kHz"` | Output audio sample rate. 48 kHz uses upsampling for higher quality audio, 24 kHz is native SNAC output (faster, lowe... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/maya/stream", {
  input: {
        "prompt": "your value here",
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/maya/stream", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/maya/stream", {
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

- API page: https://fal.ai/models/fal-ai/maya/stream/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/maya/stream
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
