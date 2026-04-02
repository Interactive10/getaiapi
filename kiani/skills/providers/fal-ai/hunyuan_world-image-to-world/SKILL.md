---
name: fal-ai-hunyuan_world-image-to-world
description: >
  Use this skill for the fal.ai Hunyuan World model (fal-ai/hunyuan_world/image-to-world). Hunyuan World 1.0 turns a single image into a panorama or a 3D world. It creates realistic scenes from the image, allowing you to explore and view it from different angles.
---

# Hunyuan World

Hunyuan World 1.0 turns a single image into a panorama or a 3D world. It creates realistic scenes from the image, allowing you to explore and view it from different angles.

**Endpoint:** `fal-ai/hunyuan_world/image-to-world`
**Source:** https://fal.ai/models/fal-ai/hunyuan_world/image-to-world/api

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

const result = await fal.subscribe("fal-ai/hunyuan_world/image-to-world", {
  input: {
        "classes": "your value here",
        "labels_fg1": "your value here",
        "labels_fg2": "your value here",
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
| `classes` | string | **Yes** |  | Classes to use for the world generation. |
| `export_drc` | boolean | No | `false` | Whether to export DRC (Dynamic Resource Configuration). |
| `labels_fg1` | string | **Yes** |  | Labels for the first foreground object. |
| `labels_fg2` | string | **Yes** |  | Labels for the second foreground object. |
| `image_url` | string | **Yes** |  | The URL of the image to convert to a world. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `world_file` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan_world/image-to-world", {
  input: {
        "classes": "your value here",
        "labels_fg1": "your value here",
        "labels_fg2": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan_world/image-to-world", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan_world/image-to-world", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan_world/image-to-world/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan_world/image-to-world
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
