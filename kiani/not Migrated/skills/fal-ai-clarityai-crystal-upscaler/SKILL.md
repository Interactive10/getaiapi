---
name: fal-ai-clarityai-crystal-upscaler
description: >
  Use this skill for the fal.ai Crystal Upscaler model (clarityai/crystal-upscaler). An advanced image enhancement tool designed specifically for facial details and portrait photography, utilizing Clarity AI's upscaling technology.
---

# Crystal Upscaler

An advanced image enhancement tool designed specifically for facial details and portrait photography, utilizing Clarity AI's upscaling technology.

**Endpoint:** `clarityai/crystal-upscaler`
**Source:** https://fal.ai/models/clarityai/crystal-upscaler/api

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

const result = await fal.subscribe("clarityai/crystal-upscaler", {
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
| `creativity` | float | No | `0` | Creativity level for upscaling |
| `scale_factor` | float | No | `2` | Scale factor |
| `image_url` | string | **Yes** |  | URL to the input image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | List of upscaled images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("clarityai/crystal-upscaler", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("clarityai/crystal-upscaler", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("clarityai/crystal-upscaler", {
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

- API page: https://fal.ai/models/clarityai/crystal-upscaler/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=clarityai/crystal-upscaler
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
