---
name: fal-ai-smoretalk-ai-rembg-enhance
description: >
  Use this skill for the fal.ai Rembg Enhance (Remove Background Enhance) model (smoretalk-ai/rembg-enhance). Rembg-enhance is optimized for 2D vector images, 3D graphics, and photos by leveraging matting technology.
---

# Rembg Enhance (Remove Background Enhance)

Rembg-enhance is optimized for 2D vector images, 3D graphics, and photos by leveraging matting technology.

**Endpoint:** `smoretalk-ai/rembg-enhance`
**Source:** https://fal.ai/models/smoretalk-ai/rembg-enhance/api

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

const result = await fal.subscribe("smoretalk-ai/rembg-enhance", {
  input: {
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
| `image_url` | string | **Yes** |  | URL of the input image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("smoretalk-ai/rembg-enhance", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("smoretalk-ai/rembg-enhance", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("smoretalk-ai/rembg-enhance", {
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

- API page: https://fal.ai/models/smoretalk-ai/rembg-enhance/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=smoretalk-ai/rembg-enhance
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
