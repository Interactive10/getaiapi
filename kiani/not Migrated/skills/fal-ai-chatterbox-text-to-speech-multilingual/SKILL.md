---
name: fal-ai-chatterbox-text-to-speech-multilingual
description: >
  Use this skill for the fal.ai Chatterbox model (fal-ai/chatterbox/text-to-speech/multilingual). Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai.
---

# Chatterbox

Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai.

**Endpoint:** `fal-ai/chatterbox/text-to-speech/multilingual`
**Source:** https://fal.ai/models/fal-ai/chatterbox/text-to-speech/multilingual/api

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

const result = await fal.subscribe("fal-ai/chatterbox/text-to-speech/multilingual", {
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
| `text` | string | **Yes** |  | The text to be converted to speech (maximum 300 characters). Supports 23 languages including English, French, German,... |
| `custom_audio_language` | enum (23 values) | No |  | If using a custom audio URL, specify the language of the audio here. Ignored if voice is not a custom url. |
| `exaggeration` | float | No | `0.5` | Controls speech expressiveness and emotional intensity (0.25-2.0). 0.5 is neutral, higher values increase expressiven... |
| `voice` | string | No | `"english"` | Language code for synthesis. In case using custom please provide audio url and select custom_audio_language. |
| `temperature` | float | No | `0.8` | Controls randomness and variation in generation (0.05-5.0). Higher values create more varied speech patterns. |
| `seed` | integer | No |  | Random seed for reproducible results. Set to 0 for random generation, or provide a specific number for consistent out... |
| `cfg_scale` | float | No | `0.5` | Configuration/pace weight controlling generation guidance (0.0-1.0). Use 0.0 for language transfer to mitigate accent... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File | The generated multilingual speech audio file |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/chatterbox/text-to-speech/multilingual", {
  input: {
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chatterbox/text-to-speech/multilingual", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chatterbox/text-to-speech/multilingual", {
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

- API page: https://fal.ai/models/fal-ai/chatterbox/text-to-speech/multilingual/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chatterbox/text-to-speech/multilingual
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
