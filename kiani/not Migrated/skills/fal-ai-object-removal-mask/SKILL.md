---
name: fal-ai-object-removal-mask
description: >
  Use this skill for the fal.ai Object Removal model (fal-ai/object-removal/mask). Removes mask-selected objects and their visual effects, seamlessly reconstructing the scene with contextually appropriate content.
---

# Object Removal

Removes mask-selected objects and their visual effects, seamlessly reconstructing the scene with contextually appropriate content.

**Endpoint:** `fal-ai/object-removal/mask`
**Source:** https://fal.ai/models/fal-ai/object-removal/mask/api

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

const result = await fal.subscribe("fal-ai/object-removal/mask", {
  input: {
        "mask_url": "https://example.com/input.png",
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
| `model` | enum: `low_quality`, `medium_quality`, `high_quality`, `best_quality` | No | `"best_quality"` |  |
| `mask_expansion` | integer | No | `15` | Amount of pixels to expand the mask by. Range: 0-50 |
| `mask_url` | string | **Yes** |  | The URL of the mask image. White pixels (255) indicate areas to remove. |
| `image_url` | string | **Yes** |  | The URL of the image to remove objects from. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated images with objects removed. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/object-removal/mask", {
  input: {
        "mask_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/object-removal/mask", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/object-removal/mask", {
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

- API page: https://fal.ai/models/fal-ai/object-removal/mask/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/object-removal/mask
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
