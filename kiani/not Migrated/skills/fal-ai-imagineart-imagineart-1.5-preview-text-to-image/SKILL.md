---
name: fal-ai-imagineart-imagineart-1.5-preview-text-to-image
description: >
  Use this skill for the fal.ai Imagineart 1.5 Preview model (imagineart/imagineart-1.5-preview/text-to-image). ImagineArt 1.5 text-to-image model generates high-fidelity professional-grade visuals with lifelike realism, strong aesthetics, and text that actually reads correctly.
---

# Imagineart 1.5 Preview

ImagineArt 1.5 text-to-image model generates high-fidelity professional-grade visuals with lifelike realism, strong aesthetics, and text that actually reads correctly.

**Endpoint:** `imagineart/imagineart-1.5-preview/text-to-image`
**Source:** https://fal.ai/models/imagineart/imagineart-1.5-preview/text-to-image/api

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

const result = await fal.subscribe("imagineart/imagineart-1.5-preview/text-to-image", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Text prompt describing the desired image |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | Image aspect ratio: 1:1, 3:1, 1:3, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3 |
| `seed` | integer | No |  | Seed for the image generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Generated image |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("imagineart/imagineart-1.5-preview/text-to-image", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("imagineart/imagineart-1.5-preview/text-to-image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("imagineart/imagineart-1.5-preview/text-to-image", {
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

- API page: https://fal.ai/models/imagineart/imagineart-1.5-preview/text-to-image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=imagineart/imagineart-1.5-preview/text-to-image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
