---
name: fal-ai-decart-lucy-edit-dev
description: >
  Use this skill for the fal.ai Lucy Edit [Dev] model (decart/lucy-edit/dev). Edit outfits, objects, faces, or restyle your video - all with maximum detail retention.
---

# Lucy Edit [Dev]

Edit outfits, objects, faces, or restyle your video - all with maximum detail retention.

**Endpoint:** `decart/lucy-edit/dev`
**Source:** https://fal.ai/models/decart/lucy-edit/dev/api

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

const result = await fal.subscribe("decart/lucy-edit/dev", {
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
| `sync_mode` | boolean | No | `true` | If set to true, the function will wait for the video to be generated             and uploaded before returning the re... |
| `video_url` | string | **Yes** |  | URL of the video to edit |
| `prompt` | string | **Yes** |  | Text description of the desired video content |
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
const { request_id } = await fal.queue.submit("decart/lucy-edit/dev", {
  input: {
        "video_url": "https://example.com/input.png",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("decart/lucy-edit/dev", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("decart/lucy-edit/dev", {
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

- API page: https://fal.ai/models/decart/lucy-edit/dev/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=decart/lucy-edit/dev
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
