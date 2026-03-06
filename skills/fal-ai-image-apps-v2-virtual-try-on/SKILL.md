---
name: fal-ai-image-apps-v2-virtual-try-on
description: >
  Use this skill for the fal.ai Virtual Try-on model (fal-ai/image-apps-v2/virtual-try-on). Try on clothes virtually by combining person and clothing images.
---

# Virtual Try-on

Try on clothes virtually by combining person and clothing images.

**Endpoint:** `fal-ai/image-apps-v2/virtual-try-on`
**Source:** https://fal.ai/models/fal-ai/image-apps-v2/virtual-try-on/api

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

const result = await fal.subscribe("fal-ai/image-apps-v2/virtual-try-on", {
  input: {
        "clothing_image_url": "https://example.com/input.png",
        "person_image_url": "https://example.com/input.png"
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
| `preserve_pose` | boolean | No | `true` |  |
| `aspect_ratio` | AspectRatio | No |  | Aspect ratio model that calculates 4K resolution dimensions |
| `clothing_image_url` | string | **Yes** |  | Clothing photo URL |
| `person_image_url` | string | **Yes** |  | Person photo URL |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Person wearing the virtual clothing |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/image-apps-v2/virtual-try-on", {
  input: {
        "clothing_image_url": "https://example.com/input.png",
        "person_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image-apps-v2/virtual-try-on", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image-apps-v2/virtual-try-on", {
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

- API page: https://fal.ai/models/fal-ai/image-apps-v2/virtual-try-on/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image-apps-v2/virtual-try-on
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
