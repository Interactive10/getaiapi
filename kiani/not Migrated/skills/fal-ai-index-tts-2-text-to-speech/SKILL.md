---
name: fal-ai-index-tts-2-text-to-speech
description: >
  Use this skill for the fal.ai Index TTS 2.0 model (fal-ai/index-tts-2/text-to-speech). Generate natural, clear speeches using Index TTS 2.0 from IndexTeam
---

# Index TTS 2.0

Generate natural, clear speeches using Index TTS 2.0 from IndexTeam

**Endpoint:** `fal-ai/index-tts-2/text-to-speech`
**Source:** https://fal.ai/models/fal-ai/index-tts-2/text-to-speech/api

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

const result = await fal.subscribe("fal-ai/index-tts-2/text-to-speech", {
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
| `prompt` | string | **Yes** |  | The speech prompt to generate |
| `emotional_strengths` | EmotionalStrengths | null | No |  | The strengths of individual emotions for fine-grained control. |
| `strength` | float | No | `1` | The strength of the emotional style transfer. Higher values result in stronger emotional influence. |
| `emotional_audio_url` | string | null | No |  | The emotional reference audio file to extract the style from. |
| `audio_url` | string | **Yes** |  | The audio file to generate the speech from. |
| `emotion_prompt` | string | null | No |  | The emotional prompt to influence the emotional style. Must be used together with should_use_prompt_for_emotion. |
| `should_use_prompt_for_emotion` | boolean | No | `false` | Whether to use the `prompt` to calculate emotional strengths, if enabled it will overwrite the `emotional_strengths` ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/index-tts-2/text-to-speech", {
  input: {
        "prompt": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/index-tts-2/text-to-speech", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/index-tts-2/text-to-speech", {
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

- API page: https://fal.ai/models/fal-ai/index-tts-2/text-to-speech/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/index-tts-2/text-to-speech
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
