---
name: fal-ai-decart-lucy-i2v
description: >
  Use this skill for the fal.ai Lucy Image to Video model (decart/lucy-i2v). Lucy delivers lightning fast performance that redefines what's possible with image to video AI
---

# Lucy Image to Video

Lucy delivers lightning fast performance that redefines what's possible with image to video AI

**Endpoint:** `decart/lucy-i2v`
**Source:** https://fal.ai/models/decart/lucy-i2v/api

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

const result = await fal.subscribe("decart/lucy-i2v", {
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
| `sync_mode` | boolean | No | `true` | If set to true, the function will wait for the image to be generated             and uploaded before returning the re... |
| `aspect_ratio` | enum: `9:16`, `16:9` | No | `"16:9"` | Aspect ratio of the generated video. |
| `prompt` | string | **Yes** |  | Text description of the desired video content |
| `image_url` | string | **Yes** |  | URL of the image to use as the first frame |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("decart/lucy-i2v", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("decart/lucy-i2v", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("decart/lucy-i2v", {
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

- API page: https://fal.ai/models/decart/lucy-i2v/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=decart/lucy-i2v
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
