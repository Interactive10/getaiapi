---
name: fal-ai-qwen-3-tts-voice-design-1.7b
description: >
  Use this skill for the fal.ai Qwen 3 TTS - Voice Design [1.7B] model (fal-ai/qwen-3-tts/voice-design/1.7b). Create custom voices using Qwen3-TTS Voice Design model and later use Clone Voice model to create your own voices!
---

# Qwen 3 TTS - Voice Design [1.7B]

Create custom voices using Qwen3-TTS Voice Design model and later use Clone Voice model to create your own voices!

**Endpoint:** `fal-ai/qwen-3-tts/voice-design/1.7b`
**Source:** https://fal.ai/models/fal-ai/qwen-3-tts/voice-design/1.7b/api

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

const result = await fal.subscribe("fal-ai/qwen-3-tts/voice-design/1.7b", {
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
| `prompt` | string | **Yes** |  | Optional prompt to guide the style of the generated speech. |
| `subtalker_top_k` | integer | null | No | `50` | Top-k for sub-talker sampling. |
| `top_p` | float | null | No | `1` | Top-p sampling parameter. |
| `language` | enum (11 values) | No | `"Auto"` | The language of the voice to be designed. |
| `max_new_tokens` | integer | null | No | `200` | Maximum number of new codec tokens to generate. |
| `repetition_penalty` | float | null | No | `1.05` | Penalty to reduce repeated tokens/codes. |
| `text` | string | **Yes** |  | The text to be converted to speech. |
| `top_k` | integer | null | No | `50` | Top-k sampling parameter. |
| `subtalker_dosample` | boolean | null | No | `true` | Sampling switch for the sub-talker. |
| `subtalker_temperature` | float | null | No | `0.9` | Temperature for sub-talker sampling. |
| `subtalker_top_p` | float | null | No | `1` | Top-p for sub-talker sampling. |
| `temperature` | float | null | No | `0.9` | Sampling temperature; higher => more random. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | AudioFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-3-tts/voice-design/1.7b", {
  input: {
        "prompt": "your value here",
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-3-tts/voice-design/1.7b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-3-tts/voice-design/1.7b", {
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

- API page: https://fal.ai/models/fal-ai/qwen-3-tts/voice-design/1.7b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-3-tts/voice-design/1.7b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
