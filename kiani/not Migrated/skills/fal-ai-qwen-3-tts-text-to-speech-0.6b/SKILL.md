---
name: fal-ai-qwen-3-tts-text-to-speech-0.6b
description: >
  Use this skill for the fal.ai Qwen 3 TTS - Text to Speech [0.6B] model (fal-ai/qwen-3-tts/text-to-speech/0.6b). Bring speech to your texts using Qwen3-TTS Custom-Voice model with pre-trained voices or use your custom voice with Qwen3-TTS Clone Voice model
---

# Qwen 3 TTS - Text to Speech [0.6B]

Bring speech to your texts using Qwen3-TTS Custom-Voice model with pre-trained voices or use your custom voice with Qwen3-TTS Clone Voice model

**Endpoint:** `fal-ai/qwen-3-tts/text-to-speech/0.6b`
**Source:** https://fal.ai/models/fal-ai/qwen-3-tts/text-to-speech/0.6b/api

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

const result = await fal.subscribe("fal-ai/qwen-3-tts/text-to-speech/0.6b", {
  input: {
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
| `prompt` | string | null | No |  | Optional prompt to guide the style of the generated speech. This prompt will be ignored if a speaker embedding is pro... |
| `speaker_voice_embedding_file_url` | string | null | No |  | URL to a speaker embedding file in safetensors format, from `fal-ai/qwen-3-tts/clone-voice/0.6b` endpoint. If provide... |
| `top_p` | float | null | No | `1` | Top-p sampling parameter. |
| `repetition_penalty` | float | null | No | `1.05` | Penalty to reduce repeated tokens/codes. |
| `top_k` | integer | null | No | `50` | Top-k sampling parameter. |
| `subtalker_temperature` | float | null | No | `0.9` | Temperature for sub-talker sampling. |
| `voice` | enum (9 values) | null | No |  | The voice to be used for speech synthesis, will be ignored if a speaker embedding is provided. Check out the **[docum... |
| `reference_text` | string | null | No |  | Optional reference text that was used when creating the speaker embedding. Providing this can improve synthesis quali... |
| `temperature` | float | null | No | `0.9` | Sampling temperature; higher => more random. |
| `text` | string | **Yes** |  | The text to be converted to speech. |
| `subtalker_top_k` | integer | null | No | `50` | Top-k for sub-talker sampling. |
| `language` | enum (11 values) | No | `"Auto"` | The language of the voice. |
| `max_new_tokens` | integer | null | No | `200` | Maximum number of new codec tokens to generate. |
| `subtalker_dosample` | boolean | null | No | `true` | Sampling switch for the sub-talker. |
| `subtalker_top_p` | float | null | No | `1` | Top-p for sub-talker sampling. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | AudioFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-3-tts/text-to-speech/0.6b", {
  input: {
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-3-tts/text-to-speech/0.6b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-3-tts/text-to-speech/0.6b", {
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

- API page: https://fal.ai/models/fal-ai/qwen-3-tts/text-to-speech/0.6b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-3-tts/text-to-speech/0.6b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
