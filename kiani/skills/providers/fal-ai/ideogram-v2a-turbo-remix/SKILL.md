---
name: fal-ai-ideogram-v2a-turbo-remix
description: >
  Use this skill for the fal.ai Ideogram V2A Turbo Remix model (fal-ai/ideogram/v2a/turbo/remix). Rapidly create image variations with Ideogram V2A Turbo Remix. Fast and efficient reimagining of existing images while maintaining creative control through prompt guidance.
---

# Ideogram V2A Turbo Remix

Rapidly create image variations with Ideogram V2A Turbo Remix. Fast and efficient reimagining of existing images while maintaining creative control through prompt guidance.

**Endpoint:** `fal-ai/ideogram/v2a/turbo/remix`
**Source:** https://fal.ai/models/fal-ai/ideogram/v2a/turbo/remix/api

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

const result = await fal.subscribe("fal-ai/ideogram/v2a/turbo/remix", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The prompt to remix the image with |
| `aspect_ratio` | enum (11 values) | No | `"1:1"` | The aspect ratio of the generated image |
| `style` | enum: `auto`, `general`, `realistic`, `design`, `render_3D`, `anime` | No | `"auto"` | The style of the generated image |
| `expand_prompt` | boolean | No | `true` | Whether to expand the prompt with MagicPrompt functionality. |
| `image_url` | string | **Yes** |  | The image URL to remix |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `strength` | float | No | `0.8` | Strength of the input image in the remix |
| `seed` | integer | null | No |  | Seed for the random number generator |

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
const { request_id } = await fal.queue.submit("fal-ai/ideogram/v2a/turbo/remix", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ideogram/v2a/turbo/remix", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ideogram/v2a/turbo/remix", {
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

- API page: https://fal.ai/models/fal-ai/ideogram/v2a/turbo/remix/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ideogram/v2a/turbo/remix
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
