---
name: fal-ai-personaplex-realtime
description: >
  Use this skill for the fal.ai Personaplex model (fal-ai/personaplex/realtime). PersonaPlex is a real-time, full-duplex speech-to-speech conversational model that enables persona control through text-based role prompts and audio-based voice conditioning.
---

# Personaplex

PersonaPlex is a real-time, full-duplex speech-to-speech conversational model that enables persona control through text-based role prompts and audio-based voice conditioning.

**Endpoint:** `fal-ai/personaplex/realtime`
**Source:** https://fal.ai/models/fal-ai/personaplex/realtime/api

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

const result = await fal.subscribe("fal-ai/personaplex/realtime", {
  input: {
        "audio": "your value here"
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
| `prompt` | string | No | `"You are a wise and friendly teacher. Answer questions or provide advice in a clear and engaging way."` | Text prompt describing the AI persona and conversation context. |
| `top_k_text` | integer | No | `25` | Top-K sampling for text tokens. |
| `voice` | enum (18 values) | No | `"NATF2"` | Voice ID for the AI response. NAT = natural, VAR = variety. F = female, M = male. Ignored when voice_audio_url is pro... |
| `temperature_text` | float | No | `0.7` | Text sampling temperature. Higher values produce more diverse outputs. |
| `voice_audio_url` | string | null | No |  | URL to a voice sample audio for on-the-fly voice cloning. When provided, the AI responds in the cloned voice instead ... |
| `seed` | integer | null | No |  | Random seed for reproducibility. |
| `top_k_audio` | integer | No | `250` | Top-K sampling for audio tokens. |
| `audio` | file (binary) | **Yes** |  | Input audio chunk (PCM s16le, 24kHz mono). Base64-encoded in JSON transport. |
| `temperature_audio` | float | No | `0.8` | Audio sampling temperature. Higher values produce more diverse outputs. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | Generated text tokens for this chunk. |
| `audio` | file (binary) | Generated audio chunk (PCM s16le, 24kHz mono). Base64-encoded in JSON transport. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/personaplex/realtime", {
  input: {
        "audio": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/personaplex/realtime", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/personaplex/realtime", {
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

- API page: https://fal.ai/models/fal-ai/personaplex/realtime/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/personaplex/realtime
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
