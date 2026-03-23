---
name: fal-ai-decart-lucy-5b-image-to-video
description: >
  Use this skill for the fal.ai Decart model (fal-ai/decart/lucy-5b/image-to-video). Lucy-5B is a model that can create 5-second I2V videos in under 5 seconds, achieving >1x RTF end-to-end
---

# Decart

Lucy-5B is a model that can create 5-second I2V videos in under 5 seconds, achieving >1x RTF end-to-end

**Endpoint:** `fal-ai/decart/lucy-5b/image-to-video`
**Source:** https://fal.ai/models/fal-ai/decart/lucy-5b/image-to-video/api

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

const result = await fal.subscribe("fal-ai/decart/lucy-5b/image-to-video", {
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
| `prompt` | string | **Yes** |  | Text description of the desired video content |
| `aspect_ratio` | enum: `9:16`, `16:9` | No | `"16:9"` | Aspect ratio of the generated video. |
| `resolution` | string | No | `"720p"` | Resolution of the generated video |
| `sync_mode` | boolean | No | `true` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
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
const { request_id } = await fal.queue.submit("fal-ai/decart/lucy-5b/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/decart/lucy-5b/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/decart/lucy-5b/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/decart/lucy-5b/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/decart/lucy-5b/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
