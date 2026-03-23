---
name: fal-ai-kling-v1-5-kolors-virtual-try-on
description: >
  Use this skill for the fal.ai Kling Kolors Virtual TryOn v1.5 model (fal-ai/kling/v1-5/kolors-virtual-try-on). Kling Kolors Virtual TryOn v1.5 is a high quality image based Try-On endpoint which can be used for commercial try on.
---

# Kling Kolors Virtual TryOn v1.5

Kling Kolors Virtual TryOn v1.5 is a high quality image based Try-On endpoint which can be used for commercial try on.

**Endpoint:** `fal-ai/kling/v1-5/kolors-virtual-try-on`
**Source:** https://fal.ai/models/fal-ai/kling/v1-5/kolors-virtual-try-on/api

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

const result = await fal.subscribe("fal-ai/kling/v1-5/kolors-virtual-try-on", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png"
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
| `garment_image_url` | string | **Yes** |  | Url to the garment image. |
| `sync_mode` | boolean | No | `false` | If true, the function will return the image in the response. |
| `human_image_url` | string | **Yes** |  | Url for the human image. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The output image. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling/v1-5/kolors-virtual-try-on", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling/v1-5/kolors-virtual-try-on", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling/v1-5/kolors-virtual-try-on", {
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

- API page: https://fal.ai/models/fal-ai/kling/v1-5/kolors-virtual-try-on/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling/v1-5/kolors-virtual-try-on
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
