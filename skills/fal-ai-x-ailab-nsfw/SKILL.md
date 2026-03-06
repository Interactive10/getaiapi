---
name: fal-ai-x-ailab-nsfw
description: >
  Use this skill for the fal.ai NSFW Checker model (fal-ai/x-ailab/nsfw). Predict whether an image is NSFW or SFW.
---

# NSFW Checker

Predict whether an image is NSFW or SFW.

**Endpoint:** `fal-ai/x-ailab/nsfw`
**Source:** https://fal.ai/models/fal-ai/x-ailab/nsfw/api

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

const result = await fal.subscribe("fal-ai/x-ailab/nsfw", {
  input: {
        "image_urls": []
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
| `image_urls` | list<string> | **Yes** |  | List of image URLs to check. If more than 10 images are provided, only the first 10 will be checked. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `has_nsfw_concepts` | list<boolean> | List of booleans indicating if the image has an NSFW concept |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/x-ailab/nsfw", {
  input: {
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/x-ailab/nsfw", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/x-ailab/nsfw", {
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

- API page: https://fal.ai/models/fal-ai/x-ailab/nsfw/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/x-ailab/nsfw
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
