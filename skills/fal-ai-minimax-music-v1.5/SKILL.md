---
name: fal-ai-minimax-music-v1.5
description: >
  Use this skill for the fal.ai MiniMax (Hailuo AI) Music v1.5 model (fal-ai/minimax-music/v1.5). Generate music from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality, diverse musical compositions.
---

# MiniMax (Hailuo AI) Music v1.5

Generate music from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality, diverse musical compositions.

**Endpoint:** `fal-ai/minimax-music/v1.5`
**Source:** https://fal.ai/models/fal-ai/minimax-music/v1.5/api

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

const result = await fal.subscribe("fal-ai/minimax-music/v1.5", {
  input: {
        "prompt": "your value here",
        "lyrics_prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Lyrics, supports [intro][verse][chorus][bridge][outro] sections. 10-600 characters. |
| `lyrics_prompt` | string | **Yes** |  | Control music generation. 10-3000 characters. |
| `audio_setting` | AudioSetting | No |  |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax-music/v1.5", {
  input: {
        "prompt": "your value here",
        "lyrics_prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax-music/v1.5", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax-music/v1.5", {
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

- API page: https://fal.ai/models/fal-ai/minimax-music/v1.5/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax-music/v1.5
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
