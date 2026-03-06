---
name: fal-ai-openrouter-router-openai-v1-chat-completions
description: >
  Use this skill for the fal.ai OpenRouter Chat Completions [OpenAI Compatible] model (openrouter/router/openai/v1/chat/completions). Run any LLM (Large Language Model) with fal, powered by OpenRouter. This endpoint is compatible with the OpenAI API.
---

# OpenRouter Chat Completions [OpenAI Compatible]

Run any LLM (Large Language Model) with fal, powered by OpenRouter. This endpoint is compatible with the OpenAI API.

**Endpoint:** `openrouter/router/openai/v1/chat/completions`
**Source:** https://fal.ai/models/openrouter/router/openai/v1/chat/completions/api

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

const result = await fal.subscribe("openrouter/router/openai/v1/chat/completions", {
  input: {
        "prompt": "your prompt here"
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

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("openrouter/router/openai/v1/chat/completions", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("openrouter/router/openai/v1/chat/completions", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("openrouter/router/openai/v1/chat/completions", {
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

- API page: https://fal.ai/models/openrouter/router/openai/v1/chat/completions/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=openrouter/router/openai/v1/chat/completions
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
