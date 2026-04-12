---
name: fal-ai-recraft-v3-create-style
description: >
  Use this skill for the fal.ai Recraft V3 Create Style model (fal-ai/recraft/v3/create-style). Recraft V3 Create Style is capable of creating unique styles for Recraft V3 based on your images.
---

# Recraft V3 Create Style

Recraft V3 Create Style is capable of creating unique styles for Recraft V3 based on your images.

**Endpoint:** `fal-ai/recraft/v3/create-style`
**Source:** https://fal.ai/models/fal-ai/recraft/v3/create-style/api

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

const result = await fal.subscribe("fal-ai/recraft/v3/create-style", {
  input: {
        "images_data_url": "https://example.com/input.png"
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
| `images_data_url` | string | **Yes** |  | URL to zip archive with images, use PNG format. Maximum 5 images are allowed. |
| `base_style` | enum (85 values) | No | `"digital_illustration"` | The base style of the generated images, this topic is covered above. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `style_id` | string | The ID of the created style, this ID can be used to reference the style in the future. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/recraft/v3/create-style", {
  input: {
        "images_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/recraft/v3/create-style", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/recraft/v3/create-style", {
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

- API page: https://fal.ai/models/fal-ai/recraft/v3/create-style/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/recraft/v3/create-style
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
