---
name: fal-ai-chatterbox-text-to-speech
description: >
  Use this skill for the fal.ai Chatterbox model (fal-ai/chatterbox/text-to-speech). Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai.
---

# Chatterbox

Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai.

**Endpoint:** `fal-ai/chatterbox/text-to-speech`
**Source:** https://fal.ai/models/fal-ai/chatterbox/text-to-speech/api

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

const result = await fal.subscribe("fal-ai/chatterbox/text-to-speech", {
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
| `text` | string | **Yes** |  | The text to be converted to speech. You can additionally add the following emotive tags: <laugh>, <chuckle>, <sigh>, ... |
| `exaggeration` | float | No | `0.25` | Exaggeration factor for the generated speech (0.0 = no exaggeration, 1.0 = maximum exaggeration). |
| `audio_url` | string | No | `"https://storage.googleapis.com/chatterbox-demo-samples/prompts/male_rickmorty.mp3"` | Optional URL to an audio file to use as a reference for the generated speech. If provided, the model will try to matc... |
| `temperature` | float | No | `0.7` | Temperature for generation (higher = more creative). |
| `seed` | integer | No |  | Useful to control the reproducibility of the generated audio. Assuming all other properties didn't change, a fixed se... |
| `cfg` | float | No | `0.5` |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/chatterbox/text-to-speech", {
  input: {
        "text": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chatterbox/text-to-speech", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chatterbox/text-to-speech", {
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

- API page: https://fal.ai/models/fal-ai/chatterbox/text-to-speech/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chatterbox/text-to-speech
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
