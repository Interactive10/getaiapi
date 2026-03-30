---
name: fal-ai-openrouter-router-video-enterprise
description: >
  Use this skill for the fal.ai OpenRouter [Video][Enterprise] model (openrouter/router/video/enterprise). Run any VLM (Video Language Model) with fal, powered by OpenRouter.
---

# OpenRouter [Video][Enterprise]

Run any VLM (Video Language Model) with fal, powered by OpenRouter.

**Endpoint:** `openrouter/router/video/enterprise`
**Source:** https://fal.ai/models/openrouter/router/video/enterprise/api

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

const result = await fal.subscribe("openrouter/router/video/enterprise", {
  input: {
        "prompt": "your value here",
        "model": "your value here"
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
| `prompt` | string | **Yes** |  | Prompt to be used for the video processing |
| `video_urls` | list<string> | null | No |  | List of URLs or data URIs of video files to process. Supported formats: mp4, mpeg, mov, webm. For Google Gemini on AI... |
| `system_prompt` | string | null | No |  | System prompt to provide context or instructions to the model |
| `reasoning` | boolean | No | `false` | Should reasoning be the part of the final answer. |
| `model` | string | **Yes** |  | Name of the model to use. Charged based on actual token usage. |
| `max_tokens` | integer | null | No |  | This sets the upper limit for the number of tokens the model can generate in response. It won't produce more than thi... |
| `temperature` | float | No | `1` | This setting influences the variety in the model's responses. Lower values lead to more predictable and typical respo... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `usage` | UsageInfo | null | Token usage information |
| `output` | string | Generated output from video processing |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("openrouter/router/video/enterprise", {
  input: {
        "prompt": "your value here",
        "model": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("openrouter/router/video/enterprise", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("openrouter/router/video/enterprise", {
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

- API page: https://fal.ai/models/openrouter/router/video/enterprise/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=openrouter/router/video/enterprise
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
