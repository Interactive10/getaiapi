---
name: fal-ai-openrouter-router-audio
description: >
  Use this skill for the fal.ai OpenRouter [Audio] model (openrouter/router/audio). Run any ALM (Audio Language Model) with fal, powered by OpenRouter.
---

# OpenRouter [Audio]

Run any ALM (Audio Language Model) with fal, powered by OpenRouter.

**Endpoint:** `openrouter/router/audio`
**Source:** https://fal.ai/models/openrouter/router/audio/api

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

const result = await fal.subscribe("openrouter/router/audio", {
  input: {
        "prompt": "your value here",
        "model": "your value here",
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
| `prompt` | string | **Yes** |  | Prompt to be used for the audio processing |
| `system_prompt` | string | null | No |  | System prompt to provide context or instructions to the model |
| `reasoning` | boolean | No | `false` | Should reasoning be the part of the final answer. |
| `model` | string | **Yes** |  | Name of the model to use. Charged based on actual token usage. |
| `audio_url` | string | **Yes** |  | URL or data URI of the audio file to process. Supported formats: wav, mp3, aiff, aac, ogg, flac, m4a. |
| `temperature` | float | No | `1` | This setting influences the variety in the model's responses. Lower values lead to more predictable and typical respo... |
| `max_tokens` | integer | null | No |  | This sets the upper limit for the number of tokens the model can generate in response. It won't produce more than thi... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `usage` | UsageInfo | null | Token usage information |
| `output` | string | Generated output from audio processing |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("openrouter/router/audio", {
  input: {
        "prompt": "your value here",
        "model": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("openrouter/router/audio", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("openrouter/router/audio", {
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

- API page: https://fal.ai/models/openrouter/router/audio/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=openrouter/router/audio
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
