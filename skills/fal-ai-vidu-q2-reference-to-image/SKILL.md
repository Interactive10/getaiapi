---
name: fal-ai-vidu-q2-reference-to-image
description: >
  Use this skill for the fal.ai Vidu model (fal-ai/vidu/q2/reference-to-image). Vidu Reference-to-Image creates images by using a reference images and combining them with a prompt.
---

# Vidu

Vidu Reference-to-Image creates images by using a reference images and combining them with a prompt.

**Endpoint:** `fal-ai/vidu/q2/reference-to-image`
**Source:** https://fal.ai/models/fal-ai/vidu/q2/reference-to-image/api

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

const result = await fal.subscribe("fal-ai/vidu/q2/reference-to-image", {
  input: {
        "prompt": "your value here",
        "reference_image_urls": []
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
| `prompt` | string | **Yes** |  | Text prompt for video generation, max 1500 characters |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | The aspect ratio of the output video |
| `reference_image_urls` | list<string> | **Yes** |  | URLs of the reference images to use for consistent subject appearance |
| `seed` | integer | null | No |  | Random seed for generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/vidu/q2/reference-to-image", {
  input: {
        "prompt": "your value here",
        "reference_image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/vidu/q2/reference-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/vidu/q2/reference-to-image", {
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

- API page: https://fal.ai/models/fal-ai/vidu/q2/reference-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/vidu/q2/reference-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
