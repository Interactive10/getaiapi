---
name: fal-ai-gemini-flash-edit-multi
description: >
  Use this skill for the fal.ai Gemini Flash Edit Multi Image model (fal-ai/gemini-flash-edit/multi). Gemini Flash Edit Multi Image is a model that can edit multiple images using a text prompt and a reference image.
---

# Gemini Flash Edit Multi Image

Gemini Flash Edit Multi Image is a model that can edit multiple images using a text prompt and a reference image.

**Endpoint:** `fal-ai/gemini-flash-edit/multi`
**Source:** https://fal.ai/models/fal-ai/gemini-flash-edit/multi/api

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

const result = await fal.subscribe("fal-ai/gemini-flash-edit/multi", {
  input: {
        "prompt": "your value here",
        "input_image_urls": []
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
| `prompt` | string | **Yes** |  | The prompt for image generation or editing |
| `input_image_urls` | list<string> | **Yes** |  | List of URLs of input images for editing |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `description` | string | Text description or response from Gemini |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/gemini-flash-edit/multi", {
  input: {
        "prompt": "your value here",
        "input_image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/gemini-flash-edit/multi", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/gemini-flash-edit/multi", {
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

- API page: https://fal.ai/models/fal-ai/gemini-flash-edit/multi/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/gemini-flash-edit/multi
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
