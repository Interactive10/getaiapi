---
name: fal-ai-decart-lucy-restyle
description: >
  Use this skill for the fal.ai Lucy Restyle model (decart/lucy-restyle). Restyle videos up to 30 min long - maintaining maximum detail quality.
---

# Lucy Restyle

Restyle videos up to 30 min long - maintaining maximum detail quality.

**Endpoint:** `decart/lucy-restyle`
**Source:** https://fal.ai/models/decart/lucy-restyle/api

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

const result = await fal.subscribe("decart/lucy-restyle", {
  input: {
        "video_url": "https://example.com/input.png",
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
| `sync_mode` | boolean | No | `false` | If set to true, the function will wait for the video to be generated             and uploaded before returning the re... |
| `video_url` | string | **Yes** |  | URL of the video to edit |
| `resolution` | enum: `720p` | No | `"720p"` | Resolution of the generated video |
| `prompt` | string | **Yes** |  | Text description of the desired video content |
| `seed` | integer | No |  | Seed for video generation |
| `enhance_prompt` | boolean | No | `true` | Whether to enhance the prompt for better results. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | The generated video |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("decart/lucy-restyle", {
  input: {
        "video_url": "https://example.com/input.png",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("decart/lucy-restyle", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("decart/lucy-restyle", {
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

- API page: https://fal.ai/models/decart/lucy-restyle/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=decart/lucy-restyle
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
