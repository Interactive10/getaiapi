---
name: fal-ai-ideogram-v2-turbo
description: >
  Use this skill for the fal.ai Ideogram V2 Turbo model (fal-ai/ideogram/v2/turbo). Accelerated image generation with Ideogram V2 Turbo. Create high-quality visuals, posters, and logos with enhanced speed while maintaining Ideogram's signature quality.
---

# Ideogram V2 Turbo

Accelerated image generation with Ideogram V2 Turbo. Create high-quality visuals, posters, and logos with enhanced speed while maintaining Ideogram's signature quality.

**Endpoint:** `fal-ai/ideogram/v2/turbo`
**Source:** https://fal.ai/models/fal-ai/ideogram/v2/turbo/api

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

const result = await fal.subscribe("fal-ai/ideogram/v2/turbo", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  |  |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | The aspect ratio of the generated image |
| `style` | enum: `auto`, `general`, `realistic`, `design`, `render_3D`, `anime` | No | `"auto"` | The style of the generated image |
| `expand_prompt` | boolean | No | `true` | Whether to expand the prompt with MagicPrompt functionality. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `seed` | integer | null | No |  | Seed for the random number generator |
| `negative_prompt` | string | No | `""` | A negative prompt to avoid in the generated image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> |  |
| `seed` | integer | Seed used for the random number generator |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ideogram/v2/turbo", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ideogram/v2/turbo", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ideogram/v2/turbo", {
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

- API page: https://fal.ai/models/fal-ai/ideogram/v2/turbo/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ideogram/v2/turbo
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
