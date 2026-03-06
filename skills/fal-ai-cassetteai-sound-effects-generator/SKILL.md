---
name: fal-ai-cassetteai-sound-effects-generator
description: >
  Use this skill for the fal.ai Sound Effects Generator model (cassetteai/sound-effects-generator). Create stunningly realistic sound effects in seconds - CassetteAI's Sound Effects Model generates high-quality SFX up to 30 seconds long in just 1 second of processing time
---

# Sound Effects Generator

Create stunningly realistic sound effects in seconds - CassetteAI's Sound Effects Model generates high-quality SFX up to 30 seconds long in just 1 second of processing time

**Endpoint:** `cassetteai/sound-effects-generator`
**Source:** https://fal.ai/models/cassetteai/sound-effects-generator/api

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

const result = await fal.subscribe("cassetteai/sound-effects-generator", {
  input: {
        "prompt": "your value here",
        "duration": 1
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
| `prompt` | string | **Yes** |  | The prompt to generate SFX. |
| `duration` | integer | **Yes** |  | The duration of the generated SFX in seconds. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("cassetteai/sound-effects-generator", {
  input: {
        "prompt": "your value here",
        "duration": 1
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("cassetteai/sound-effects-generator", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("cassetteai/sound-effects-generator", {
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

- API page: https://fal.ai/models/cassetteai/sound-effects-generator/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=cassetteai/sound-effects-generator
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
